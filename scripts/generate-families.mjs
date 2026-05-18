import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mammoth from 'mammoth'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const FAM_DIR = '/mnt/c/FamToFam'
const PUBLIC_FAMILIES = path.join(ROOT, 'public', 'families')
const DATA_JSON = path.join(ROOT, 'product', 'sections', 'donor-browse-and-connect', 'data.json')

function extractLastName(folderName) {
  const match = folderName.match(/Родина\.\s*Прізвище\s*-\s*(.+)/)
  return match ? match[1].trim() : folderName
}

function normalizeStory(rawText) {
  return rawText
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .join('\n\n')
}

async function run() {
  fs.mkdirSync(PUBLIC_FAMILIES, { recursive: true })

  const entries = fs.readdirSync(FAM_DIR, { withFileTypes: true })
  const familyDirs = entries.filter(
    e => e.isDirectory() && e.name.startsWith('Родина. Прізвище - ')
  )

  console.log(`Processing ${familyDirs.length} families...\n`)

  const families = []

  for (const entry of familyDirs) {
    const folderPath = path.join(FAM_DIR, entry.name)
    const lastName = extractLastName(entry.name)
    const lastNameLower = lastName.toLowerCase()
    const familyName = `Родина ${lastName}`

    process.stdout.write(`  ${familyName}... `)

    // 1. Copy fam1.jpg
    const files = fs.readdirSync(folderPath)
    const photoFile = files.find(f => /^fam1\.(jpg|jpeg|png|webp)$/i.test(f))
    if (!photoFile) {
      console.log('✗ fam1.jpg not found')
      continue
    }
    const photoSrc = path.join(folderPath, photoFile)
    const photoExt = path.extname(photoFile).toLowerCase()
    const photoDest = path.join(PUBLIC_FAMILIES, `${lastNameLower}${photoExt}`)
    fs.copyFileSync(photoSrc, photoDest)
    const photoUrl = `/families/${lastNameLower}${photoExt}`

    // 2. Extract and normalize story from docx
    const docxFile = files.find(f => f.toLowerCase().endsWith('.docx'))
    let story = ''
    if (docxFile) {
      const result = await mammoth.extractRawText({ path: path.join(folderPath, docxFile) })
      story = normalizeStory(result.value)
    }

    families.push({
      id: `family-${lastNameLower}`,
      name: familyName,
      photo: photoUrl,
      categoryId: 'active',
      monthlyTarget: 220,
      currentlyFunded: 0,
      story: { uk: story, en: story },
      needs: [],
    })

    console.log('✓')
  }

  // 3. Update data.json — replace only the families array
  const dataJson = JSON.parse(fs.readFileSync(DATA_JSON, 'utf8'))
  dataJson.families = families
  fs.writeFileSync(DATA_JSON, JSON.stringify(dataJson, null, 2) + '\n', 'utf8')

  console.log(`\nDone — ${families.length} families written to data.json`)
  console.log(`Photos saved to public/families/`)
}

run().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
