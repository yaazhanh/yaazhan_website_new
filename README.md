# 🍼 Yaazhan's World — Baby Growth Website

> *"Born to be Wild · Professional Milk Consumer · Part-time Philosopher"*

A funky, naughty, maximalist baby growth website built for **Yaazhan** — documenting the journey of the world's newest tiny legend.

---

## 📁 File Structure

```
yaazhan/
├── index.html      → Home page (live age counter + hero)
├── about.html      → About Me (baby resume, skills, fun facts)
├── moments.html    → Gallery + milestone timeline
├── family.html     → Family profiles
├── style.css       → All styles (shared across pages)
├── script.js       → All interactivity (shared across pages)
└── README.md       → This file
```

---

## 🚀 Deploy to GitHub Pages

1. **Create a new GitHub repository** (e.g. `yaazhan` or `yaazhan-world`)
2. **Upload all files** to the repository root
3. Go to **Settings → Pages**
4. Set source to **"Deploy from a branch"** → **main** → **/ (root)**
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/yaazhan/` in ~2 minutes!

---

## ✏️ How To Customise

### Update birth date (age counter)
Open `script.js` and change line 5:
```js
const BIRTH_DATE = new Date('2026-05-28T08:00:00'); // ← your actual birth date & time
```

### Update birth stats (About page)
Open `about.html` and find the stats grid — update the `s-val` values:
- `— kg` → actual birth weight (e.g. `3.2 kg`)
- `— cm` → actual birth height (e.g. `51 cm`)
- `—` → actual blood group (e.g. `B+`)
- `Taurus` → actual zodiac sign

### Add real photos (Moments page)
Open `moments.html` and find the `.polaroid-img` divs. Replace the emoji and gradient with an `<img>` tag:
```html
<!-- Before: -->
<div class="polaroid-img pb-1">🐣</div>

<!-- After: -->
<div class="polaroid-img" style="padding:0; overflow:hidden;">
  <img src="photos/day-0.jpg" alt="Day 0" style="width:100%; height:100%; object-fit:cover;" />
</div>
```
Create a `photos/` folder in your repo and upload your images there.

### Update family cards (Family page)
Open `family.html` and edit each `.fam-card` with real names, roles, and descriptions.

### Add more milestones
In `moments.html`, copy a `.timeline-item` block and update the date, title, and description.

---

## 🎨 Colour Reference

| Variable | Hex | Used for |
|----------|-----|---------|
| `--yellow` | `#FFE94E` | Primary accent, headings |
| `--pink` | `#FF4ECD` | Secondary accent, CTA |
| `--mint` | `#4EFFB4` | Tertiary accent |
| `--blue` | `#4E9EFF` | Cool accent |
| `--orange` | `#FF8C4E` | Warm accent |
| `--purple` | `#C44EFF` | Extra accent |
| `--bg` | `#07070f` | Background |
| `--card-bg` | `#111120` | Card backgrounds |

---

## 🛠️ Built With

- Pure HTML5, CSS3, and vanilla JavaScript
- [Google Fonts](https://fonts.google.com): Boogaloo, Nunito, Permanent Marker
- No frameworks. No dependencies. No nonsense.
- 100% GitHub Pages compatible

---

## 💕 Made with love for Yaazhan

*Est. 2026 · Tamil Nadu, India*  
*No diapers were harmed in the making of this website. (A few were. We don't talk about it.)*
