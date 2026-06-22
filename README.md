# Rafayrehman — portfolio

Static site built with plain HTML, CSS, and JavaScript. No build step.

## Run it locally

The projects load from `data/projects.json` using `fetch()`, which browsers
block when you open a file directly (the `file://` protocol). So **don't
double-click `index.html`** — serve the folder over HTTP instead:

```bash
cd portfolio
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Any static server works — `npx serve`, the
VS Code "Live Server" extension, etc.)

## Deploy (GitHub Pages)

Push this folder to a repo and enable Pages (Settings → Pages → deploy from
branch). All links are relative, so it works whether the site is served from
`Rafay-Rehman-1.github.io` or a project subpath like
`Rafay-Rehman-1.github.io/portfolio/`. On Pages, `fetch()` works automatically.

## Add a project

1. Copy the matching `_template` folder and rename it to your slug
   (lowercase, dashes):
   - personal → `projects/personal/<slug>/`
   - academic → `projects/academic/<slug>/`
2. Open the new `index.html` and edit the parts marked `EDIT`
   (title, year, category badge, text).
3. Add one line to `data/projects.json`:

   ```json
   { "slug": "<slug>", "title": "My Project", "year": 2025, "category": "personal", "featured": false }
   ```

   - `slug` **must** match the folder name.
   - `category` **must** match the parent folder (`personal` or `academic`).
   - `featured: true` shows it on the home page (up to **4** featured, newest first).

That's it — the projects page and home page update from the JSON automatically.

## Swap the placeholders

Keep the same filenames and the site picks them up:

| Replace | With |
|---|---|
| `assets/img/profile.png` | your profile photo |
| `assets/img/hero.png` | the hero/banner image |
| `assets/docs/resume.pdf` | your real résumé |
| `assets/docs/cv.pdf` | your real CV |

## Layout / theme notes

- Theme tokens (the black / purple / gold palette and the raised/recessed
  shadow recipes) live at the top of `css/styles.css` as CSS variables —
  change them in one place.
- Depth model: the outer **frame** is raised, the **canvas** between items is
  recessed (the negative space), and each **item** is raised to the frame's level.
