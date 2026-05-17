# Tailwind Color Configuration

The components use raw `oklch()` values via inline styles rather than Tailwind color classes, because the design system uses a custom Ukrainian-soul palette not available in Tailwind defaults.

## Approach

All color values are defined as constants at the top of each component file:

```tsx
const BLUE      = 'oklch(0.42 0.175 260)'  // Ukrainian blue
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const CORAL     = 'oklch(0.68 0.20 24)'    // Warm coral
const GOLD      = 'oklch(0.83 0.18 88)'    // Sunflower gold
const NAVY      = 'oklch(0.18 0.055 261)'  // Deep navy text
const CREAM     = 'oklch(0.985 0.012 75)'  // Warm cream background
const BORDER    = 'oklch(0.91 0.025 258)'  // Border/divider
const MUTED     = 'oklch(0.55 0.07 258)'   // Secondary text
```

Applied via `style={{ color: BLUE }}` or `style={{ backgroundColor: CORAL }}`.

## Optional: Add to Tailwind Config

If you prefer Tailwind utility classes, add to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue:       'oklch(0.42 0.175 260)',
          'blue-deep':'oklch(0.30 0.14 260)',
          coral:      'oklch(0.68 0.20 24)',
          gold:       'oklch(0.83 0.18 88)',
          navy:       'oklch(0.18 0.055 261)',
          cream:      'oklch(0.985 0.012 75)',
          border:     'oklch(0.91 0.025 258)',
          muted:      'oklch(0.55 0.07 258)',
        }
      }
    }
  }
}
```

Then use: `bg-brand-blue`, `text-brand-navy`, `border-brand-border`, etc.

## Per-Category Palette

Each family situation category has its own color:

| Category   | Solid                          | Faint                          |
|------------|--------------------------------|--------------------------------|
| disability | `oklch(0.42 0.175 260)` (blue) | `oklch(0.96 0.022 258)`        |
| died       | `oklch(0.68 0.20 24)` (coral)  | `oklch(0.97 0.018 28)`         |
| missing    | `oklch(0.50 0.13 205)` (teal)  | `oklch(0.95 0.022 200)`        |
| active     | `oklch(0.83 0.18 88)` (gold)   | `oklch(0.97 0.025 85)`         |
