/* featured.js — renders up to 4 featured projects on the home page.
   Data source: data/projects.json   (field: "featured": true)        */

const FEATURED_MAX = 4;

function cardEl(p) {
  // link target relative to the home page: projects/<category>/<slug>/index.html
  const href = `projects/${p.category}/${p.slug}/index.html`;
  const a = document.createElement('a');
  a.className = 'card';
  a.href = href;
  a.innerHTML = `
    <div class="card-top">
      <span class="badge ${p.category}">${p.category}</span>
      <span class="year">${p.year}</span>
    </div>
    <h3>${p.title}</h3>
    <span class="open">Open &rarr;</span>`;
  return a;
}

async function loadFeatured() {
  const grid = document.getElementById('featured-grid');
  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error(res.status);
    const projects = await res.json();

    const featured = projects
      .filter(p => p.featured)
      .sort((a, b) => b.year - a.year)
      .slice(0, FEATURED_MAX);

    if (!featured.length) {
      grid.innerHTML = `<div class="state-msg">No featured projects yet — set <code>"featured": true</code> in <code>data/projects.json</code>.</div>`;
      return;
    }
    grid.replaceChildren(...featured.map(cardEl));
  } catch (err) {
    grid.innerHTML = `<div class="state-msg">Couldn't load projects. If you opened this file directly, run a local server (see <code>README.md</code>).</div>`;
    console.error('featured.js:', err);
  }
}

loadFeatured();
