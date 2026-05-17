# Design Approach — Family to Family

## Spirit
This site is about real people: Ukrainian children, mothers, families waiting for fathers to come home. The design must feel alive, warm, and human — not a charity poster, not a tech dashboard. Every screen should feel like a warm hug that also says "we've got this."

Reject: cold neutrals, excessive whitespace, corporate minimalism, generic card layouts.
Embrace: bold color, layered elements, photos that breathe, Ukrainian identity, visual energy.

---

## Color System

### Palette anchor — Ukrainian soul
- **Ukrainian blue** `oklch(0.42 0.175 260)` — primary. Use for headers, hero backgrounds, primary buttons, strong sections. This is the trust color.
- **Sunflower gold** `oklch(0.83 0.18 88)` — secondary. Use for highlights, category accents, celebration moments. Joyful, Ukrainian.
- **Warm coral** `oklch(0.68 0.20 24)` — accent. Use for CTAs, donation actions, emotional emphasis. Human warmth.
- **Warm cream** `oklch(0.985 0.012 75)` — base background. Not white. Sunlit paper.
- **Deep navy** `oklch(0.18 0.055 261)` — body text. Not black. Ink-blue.

### How to use color
- Use **color blocks** (full-width sections with solid Ukrainian blue or sunflower gold backgrounds) to create rhythm and visual drama — not just borders.
- Don't be afraid of a blue hero, a gold highlight band, a coral CTA section.
- Layering: a white card on a blue background on a cream page feels rich.
- Text on blue backgrounds: always white. Text on gold: deep navy.

---

## Photography — Photos Are Design Elements

Family and child photos are the emotional heart of this site. Treat them as first-class design elements, not content boxes.

### Photo treatment rules
- **Break the grid** — let photos overlap adjacent sections, stick out of cards, bleed to edges.
- **Organic shapes** — use arch crops (`border-radius: 999px 999px 0.75rem 0.75rem`), circles, or asymmetric ellipses instead of plain rectangles.
- **Large and prominent** — hero photos should be full-height columns or full-bleed, not small thumbnails.
- **Warm overlays** — when putting text over photos, use a warm navy gradient overlay (not flat black), bottom-to-top, opacity 60–80%.
- **On cards** — photo bleeds to the top edge of the card, no padding. Card content sits below the photo.
- **Children's photos** specifically — surround with color pops: a sunflower gold ring, a coral background blob, or a decorative SVG element overlapping the frame.

---

## Decorative Elements — Make It Alive

The site should feel filled with detail and care. Add decorative elements that feel Ukrainian and warm.

### Element library
- **Sunflower motifs** — simplified SVG sunflower petals used as background texture or section dividers. Opacity 10–20% as background.
- **Dot grid patterns** — small dot arrays in Ukrainian blue or gold, used in section corners or behind photos.
- **Folk art curves** — organic wavy lines inspired by vyshyvanka embroidery, used as section separators.
- **Abstract blobs** — soft, rounded shapes in muted primary/secondary colors behind photo frames or statistics.
- **Floating badges** — small colored pill badges overlapping card corners (e.g., "3 children", "$120/month needed").
- **Hand-drawn arrows or underlines** — on key CTA text for emphasis.

### Placement rules
- Every "hero" or "above-the-fold" area should have at least 2–3 layered decorative elements behind or around the main content.
- Section headers should have a decorative element (color line, dot cluster, icon with glow).
- Empty states should be warm and illustrated, not just gray text.

---

## Typography

DM Sans is the project font — keep it. Style it boldly.

### Scale
- **Hero headlines** — very large (5xl–7xl on desktop), bold (font-weight 700–800), tight tracking. Can be in white on blue, or deep navy on cream.
- **Section titles** — 3xl–4xl, bold, with a color accent on one word (underline in gold, or the word itself in coral).
- **Card titles** — xl–2xl, semibold.
- **Body** — base–lg, normal weight, generous line-height (1.7).
- **Labels/tags** — xs–sm, semibold, uppercase tracking, often on colored pill backgrounds.

### Expressive touches
- Mix headline colors: first line in navy, second line in Ukrainian blue, or use a golden underline.
- Use a large oversized number or stat as a design element within sections.
- Pull quotes from family stories should be large (2xl), italic, left-bordered in coral.

---

## Cards

Family profile cards are the core repeating element. Make them rich.

- Photo at top, bleeding to card edge (no padding on photo)
- Card background: white with a subtle shadow (`shadow-lg`)
- Rounded corners: `rounded-2xl` (matches the 0.75rem base radius scaled up)
- A color accent element: top-left badge with category color, or a thin color bar along the left edge
- The donation jar is a visual — not a table row. Large, colorful, fills space.
- Hover state: lift (`-translate-y-1`), shadow deepens, slight scale (`scale-[1.01]`)

---

## Sections & Layout

### Hero sections
- Full viewport height on desktop
- Large photo + color background side by side (not photo-only)
- Decorative SVG elements floating in the background
- Bold display text, large CTA buttons with rounded pill shape

### Category pillars (used in both donor and family flows)
- Each pillar is its own color (rotate through blue, gold, coral, teal)
- Large icon or illustration at top
- Money label in bold
- Hover: full color fill, white text

### CTAs
- Primary buttons: Ukrainian blue, white text, `rounded-full` pill shape, generous padding
- Secondary buttons: sunflower gold outline or fill
- Danger/emotional actions (donate): coral fill, white text
- All buttons: slight shadow, hover lift effect

---

## Shell (header)

- Header background: white with a thin Ukrainian blue bottom border (2px, full blue not gray)
- Logo mark: the heart/family icon in Ukrainian blue (not teal)
- Language toggle: small pill button, blue border, blue text
- User avatar: Ukrainian blue background, white initials

---

## Emotional Direction by Screen

| Screen | Mood | Dominant Color |
|---|---|---|
| Landing page | Welcoming, hopeful | Ukrainian blue hero + sunflower accents |
| Family registration | Supportive, trustworthy | Warm cream, blue accents |
| Family CV dashboard | Personal, human | Coral accents, large photo areas |
| Donor browse | Energizing, action-oriented | Blue pillars, coral donate buttons |
| Family cards | Warm, real | White cards, photos prominent |
| Admin panel | Clear, efficient | Blue sidebar, clean whites |
