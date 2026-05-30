/**
 * Import family data from /mnt/c/FamToFam into the project.
 * - Copies fam1.jpg → public/families/{slug}.jpg
 * - Copies gallery photos → public/families/{slug}/
 * - Extracts DOCX story text via mammoth
 * - Updates product/sections/donor-browse-and-connect/data.json in-place
 */
import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT          = path.resolve(__dirname, '..')
const FAM_DIR       = '/mnt/c/FamToFam'
const PUBLIC_FAM    = path.join(ROOT, 'public', 'families')
const DATA_JSON     = path.join(ROOT, 'product', 'sections', 'donor-browse-and-connect', 'data.json')
const IMAGE_RE      = /\.(jpg|jpeg|png|webp)$/i

// Explicit mapping: folder suffix → transliterated slug → current Cyrillic id in data.json
const FAMILIES = [
  { suffix: 'Артикульна', slug: 'artikulna', currentId: 'family-артикульна' },
  { suffix: 'Дудник',    slug: 'dudnyk',    currentId: 'family-дудник'    },
  { suffix: 'Молнар',    slug: 'molnar',    currentId: 'family-молнар'    },
  { suffix: 'Турчина',   slug: 'turchyna',  currentId: 'family-турчина'   },
  { suffix: 'Штанько',   slug: 'shtanko',   currentId: 'family-штанько'   },
  { suffix: 'Яресько',   slug: 'yaresko',   currentId: 'family-яресько'   },
]

async function processFamily({ suffix, slug, currentId }) {
  const folderPath = path.join(FAM_DIR, `Родина. Прізвище - ${suffix}`)

  if (!fs.existsSync(folderPath)) {
    console.warn(`  ⚠  folder not found: ${folderPath}`)
    return null
  }

  const files = fs.readdirSync(folderPath)

  // ── Extract DOCX story ──────────────────────────────────────────────────────
  const docxFile = files.find(f => f.toLowerCase().endsWith('.docx'))
  let story = ''
  if (docxFile) {
    const { value } = await mammoth.extractRawText({ path: path.join(folderPath, docxFile) })
    // Convert single newlines (paragraph breaks in mammoth) to double newlines for rendering
    story = value.trim().split('\n').filter(l => l.trim()).join('\n\n')
  } else {
    console.warn(`  ⚠  no .docx found for ${suffix}`)
  }

  // ── Copy main photo ─────────────────────────────────────────────────────────
  const mainFile = files.find(f => /^fam1\.(jpg|jpeg|png|webp)$/i.test(f))
  if (!mainFile) {
    console.warn(`  ⚠  fam1.jpg not found for ${suffix}`)
    return null
  }
  const mainDest = path.join(PUBLIC_FAM, `${slug}.jpg`)
  fs.copyFileSync(path.join(folderPath, mainFile), mainDest)

  // ── Copy gallery photos ─────────────────────────────────────────────────────
  const galleryFiles = files.filter(f => IMAGE_RE.test(f) && !/^fam1\./i.test(f))
  const galleryDir   = path.join(PUBLIC_FAM, slug)
  fs.mkdirSync(galleryDir, { recursive: true })

  const photoPaths = []
  for (const f of galleryFiles) {
    fs.copyFileSync(path.join(folderPath, f), path.join(galleryDir, f))
    photoPaths.push(`/families/${slug}/${f}`)
  }

  return { slug, currentId, story, mainPhoto: `/families/${slug}.jpg`, photos: photoPaths }
}

async function main() {
  if (!fs.existsSync(FAM_DIR)) {
    console.error(`ERROR: Source directory not found: ${FAM_DIR}`)
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(DATA_JSON, 'utf8'))

  for (const family of FAMILIES) {
    process.stdout.write(`${family.suffix} (${family.slug})... `)

    const result = await processFamily(family)
    if (!result) { console.log('skipped'); continue }

    const idx = data.families.findIndex(f => f.id === result.currentId || f.id === `family-${result.slug}`)
    if (idx === -1) {
      console.log(`⚠  not found in data.json (id: ${result.currentId})`)
      continue
    }

    data.families[idx].id     = `family-${result.slug}`
    data.families[idx].photo  = result.mainPhoto
    data.families[idx].photos = result.photos
    if (result.story) {
      data.families[idx].story.uk = result.story
      data.families[idx].story.en = result.story
    }

    console.log(`✓  main + ${result.photos.length} gallery photos`)
  }

  fs.writeFileSync(DATA_JSON, JSON.stringify(data, null, 2), 'utf8')
  console.log('\n✓ data.json updated')
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
