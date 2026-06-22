/* projects.js — renders the full project list with filter + sort.
   Filter: All / Personal / Academic   Sort: by year (newest|oldest)   */

let ALL = [];                       // all projects from JSON
const state = { filter: 'all', sort: 'newest' };

const grid     = document.getElementById('projects-grid');
const countEl  = document.getElementById('count');

function cardEl(p) {
  // link target relative to projects/index.html: <category>/<slug>/index.html
  const href = `${p.category}/${p.slug}/index.html`;
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

function render() {
  let list = state.filter === 'all'
    ? [...ALL]
    : ALL.filter(p => p.category === state.filter);

  list.sort((a, b) => state.sort === 'newest' ? b.year - a.year : a.year - b.year);

  countEl.textContent = `${list.length} project${list.length === 1 ? '' : 's'}`;

  if (!list.length) {
    grid.innerHTML = `<div class="state-msg">Nothing here yet in this category.</div>`;
    return;
  }
  grid.replaceChildren(...list.map(cardEl));
}

function wireControls() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      state.filter = btn.dataset.filter;
      render();
    });
  });

  document.getElementById('sort').addEventListener('change', e => {
    state.sort = e.target.value;
    render();
  });
}

async function init() {
  try {
    const res = await fetch('../data/projects.json');
    if (!res.ok) throw new Error(res.status);
    ALL = await res.json();
    wireControls();
    render();
  } catch (err) {
    grid.innerHTML = `<div class="state-msg">Couldn't load projects. If you opened this file directly, run a local server (see <code>README.md</code>).</div>`;
    console.error('projects.js:', err);
  }
}

init();
