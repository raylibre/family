import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import mammoth from 'mammoth'
import { randomUUID } from 'crypto'

// ── env ─────────────────────────────────────────────────────────────────────
function loadEnv(envPath) {
  const raw = fs.readFileSync(envPath, 'utf8')
  const env = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    env[key] = val
  }
  return env
}

const envPath = new URL('../.env.local', import.meta.url).pathname
if (!fs.existsSync(envPath)) {
  console.error('ERROR: .env.local not found at', envPath)
  process.exit(1)
}
const env = loadEnv(envPath)
const SUPABASE_URL = env['VITE_SUPABASE_URL']
const SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('ERROR: Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.error('  Add SUPABASE_SERVICE_ROLE_KEY from Supabase dashboard → Settings → API')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── config ───────────────────────────────────────────────────────────────────
const FAM_DIR = '/mnt/c/FamToFam'
const BUCKET = 'family-photos'
const DEFAULT_CATEGORY = 'active'
// 'active' monthly target from product data
const MONTHLY_TARGET = 220

// ── helpers ──────────────────────────────────────────────────────────────────
function extractLastName(folderName) {
  // "Родина. Прізвище - Артикульна" → "Артикульна"
  const match = folderName.match(/Родина\.\s*Прізвище\s*-\s*(.+)/)
  return match ? match[1].trim() : folderName
}

async function extractStoryText(folderPath) {
  const files = fs.readdirSync(folderPath)
  const docx = files.find(f => f.toLowerCase().endsWith('.docx'))
  if (!docx) return ''
  const result = await mammoth.extractRawText({ path: path.join(folderPath, docx) })
  return result.value.trim()
}

async function uploadPhoto(folderPath, profileId) {
  const files = fs.readdirSync(folderPath)
  const photo = files.find(f => /^fam1\.(jpg|jpeg|png|webp)$/i.test(f))
  if (!photo) throw new Error('fam1.jpg not found in ' + folderPath)

  const filePath = path.join(folderPath, photo)
  const fileBuffer = fs.readFileSync(filePath)
  const ext = path.extname(photo).toLowerCase().replace('.', '')
  const storagePath = `${profileId}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
      upsert: true,
    })

  if (error) throw error

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  return urlData.publicUrl
}

// ── main ─────────────────────────────────────────────────────────────────────
async function importFamilies() {
  if (!fs.existsSync(FAM_DIR)) {
    console.error('ERROR: Directory not found:', FAM_DIR)
    process.exit(1)
  }

  const entries = fs.readdirSync(FAM_DIR, { withFileTypes: true })
  const familyDirs = entries.filter(
    e => e.isDirectory() && e.name.startsWith('Родина. Прізвище - ')
  )

  console.log(`Found ${familyDirs.length} family directories\n`)

  const results = []

  for (const entry of familyDirs) {
    const folderPath = path.join(FAM_DIR, entry.name)
    const lastName = extractLastName(entry.name)
    const familyName = `Родина ${lastName}`

    process.stdout.write(`Importing ${familyName}... `)

    try {
      const profileId = randomUUID()

      const story = await extractStoryText(folderPath)
      const photoUrl = await uploadPhoto(folderPath, profileId)

      const { error } = await supabase.from('family_profiles').upsert(
        {
          id: profileId,
          family_name: familyName,
          category_id: DEFAULT_CATEGORY,
          registration_status: 'approved',
          cv_submitted: true,
          photo_url: photoUrl,
          story,
          email: `import.${lastName.toLowerCase().replace(/\s+/g, '-')}@famtofam.local`,
          uvr_code: `IMPORT-${lastName.toUpperCase()}`,
          member_name: null,
          member_rank: null,
          front_line_confirmed: false,
          children: [],
          selected_needs: [],
          custom_need: null,
        },
        { onConflict: 'id' }
      )

      if (error) throw error

      console.log('✓')
      results.push({ name: familyName, status: 'ok' })
    } catch (err) {
      console.log('✗')
      console.error('  Error:', err.message)
      results.push({ name: familyName, status: 'error', error: err.message })
    }
  }

  console.log('\n── Summary ─────────────────────────────────────────')
  for (const r of results) {
    const icon = r.status === 'ok' ? '✓' : '✗'
    console.log(`  ${icon} ${r.name}${r.error ? ' — ' + r.error : ''}`)
  }

  const ok = results.filter(r => r.status === 'ok').length
  console.log(`\n${ok}/${results.length} families imported successfully`)
}

importFamilies().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
