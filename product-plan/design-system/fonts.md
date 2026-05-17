# Typography

## Font

**DM Sans** — used for all text across the platform (headings, body, UI labels).

DM Sans is a geometric sans-serif with clean lines and excellent legibility at small sizes. It supports weight range 100–900 with optical sizing.

## Google Fonts Setup

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap" rel="stylesheet">
```

Or via CSS `@import`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
```

## Font Weights Used

| Weight | Usage |
|--------|-------|
| 400    | Body copy, secondary labels |
| 500    | UI labels, navigation |
| 600    | Subheadings, emphasized text |
| 700    | Section headings |
| 800    | Card titles, modal headlines |
| 900 (Black) | Page titles, hero text, CTA buttons |

## Apply Globally

```css
body {
  font-family: 'DM Sans', system-ui, sans-serif;
}
```

Or in Tailwind `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

## Note on lucide-react

The AppShell `UserMenu` component uses `lucide-react` for icons (`LogOut`, `ShieldCheck`, `ChevronDown`). Install it:

```bash
npm install lucide-react
```
