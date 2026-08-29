/* STEPZONE — каталог: фільтрація, пошук, сортування, пагінація */
(function () {
  'use strict';

  const PER_PAGE = 8;

  const state = {
    q: '',
    brands: [],
    cats: [],
    genders: [],
    sizes: [],
    badges: [],
    min: null,
    max: null,
    sort: 'popular',
    shown: PER_PAGE
  };

  let ALL = [];

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    readUrl();

    const grid = SZ.qs('#catalogGrid');
    SZ.skeletons(grid, 8);

    SZ.getData().then(function (data) {
      ALL = data.products;
      buildFilters(data);
      bind();
      apply();
    });
  }

  /* ---------- URL → state ---------- */
  function readUrl() {
    const p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    if (p.get('brand')) state.brands = [p.get('brand')];
    if (p.get('cat')) state.cats = [p.get('cat')];
    if (p.get('gender')) state.genders = [p.get('gender')];
    if (p.get('badge')) state.badges = [p.get('badge')];
    if (p.get('sort')) state.sort = p.get('sort');
  }

  function writeUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.brands.length === 1) p.set('brand', state.brands[0]);
    if (state.cats.length === 1) p.set('cat', state.cats[0]);
    if (state.genders.length === 1) p.set('gender', state.genders[0]);
    if (state.badges.length === 1) p.set('badge', state.badges[0]);
    if (state.sort !== 'popular') p.set('sort', state.sort);
    const qs = p.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  }

  /* ---------- Побудова панелі фільтрів ---------- */
  function buildFilters(data) {
    const brands = [...new Set(ALL.map(p => p.brand))].sort();
    const sizes  = [...new Set(ALL.flatMap(p => p.sizes))].sort((a, b) => a - b);

    const count = (fn) => ALL.filter(fn).length;

    SZ.qs('#fBrands').innerHTML = brands.map(b => `
      <label class="check">
        <input type="checkbox" value="${b}" data-f="brands" ${state.brands.includes(b) ? 'checked' : ''}>
        ${b}<em>${count(p => p.brand === b)}</em>
      </label>`).join('');

    SZ.qs('#fCats').innerHTML = data.categories.map(c => `
      <label class="check">
        <input type="checkbox" value="${c.id}" data-f="cats" ${state.cats.includes(c.id) ? 'checked' : ''}>
        ${c.name}<em>${count(p => p.category === c.id)}</em>
      </label>`).join('');

    SZ.qs('#fGender').innerHTML = ['men', 'women', 'unisex'].map(g => `
      <label class="check">
        <input type="checkbox" value="${g}" data-f="genders" ${state.genders.includes(g) ? 'checked' : ''}>
        ${SZ.GENDER_NAMES[g]}<em>${count(p => p.gender === g)}</em>
      </label>`).join('');

    SZ.qs('#fBadges').innerHTML = [
      { v: 'new', t: 'Новинки' }, { v: 'hit', t: 'Хіти' }, { v: 'sale', t: 'Зі знижкою' }
    ].map(b => `
      <label class="check">
        <input type="checkbox" value="${b.v}" data-f="badges" ${state.badges.includes(b.v) ? 'checked' : ''}>
        ${b.t}<em>${b.v === 'sale' ? count(p => p.oldPrice) : count(p => p.badge === b.v)}</em>
      </label>`).join('');

    SZ.qs('#fSizes').innerHTML = sizes.map(s =>
      `<button class="size-chip${state.sizes.includes(s) ? ' is-active' : ''}" type="button" data-size="${s}">${s}</button>`
    ).join('');

    SZ.qs('#searchInput').value = state.q;
    SZ.qs('#sortSelect').value = state.sort;
  }

  /* ---------- Події ---------- */
  function bind() {
    SZ.qs('.filters').addEventListener('change', function (e) {
      const cb = e.target.closest('input[data-f]');
      if (!cb) return;
      const key = cb.dataset.f;
      state[key] = cb.checked
        ? state[key].concat(cb.value)
        : state[key].filter(v => v !== cb.value);
      state.shown = PER_PAGE;
      apply();
    });

    SZ.qs('#fSizes').addEventListener('click', function (e) {
      const chip = e.target.closest('[data-size]');
      if (!chip) return;
      const s = Number(chip.dataset.size);
      const on = !state.sizes.includes(s);
      state.sizes = on ? state.sizes.concat(s) : state.sizes.filter(x => x !== s);
      chip.classList.toggle('is-active', on);
      state.shown = PER_PAGE;
      apply();
    });

    const priceApply = SZ.debounce(function () {
      state.min = numOrNull(SZ.qs('#priceMin').value);
      state.max = numOrNull(SZ.qs('#priceMax').value);
      state.shown = PER_PAGE;
      apply();
    }, 400);
    SZ.qs('#priceMin').addEventListener('input', priceApply);
    SZ.qs('#priceMax').addEventListener('input', priceApply);

    SZ.qs('#searchInput').addEventListener('input', SZ.debounce(function (e) {
      state.q = e.target.value.trim();
      state.shown = PER_PAGE;
      apply();
    }, 250));

    SZ.qs('#sortSelect').addEventListener('change', function (e) {
      state.sort = e.target.value;
      apply();
    });

    SZ.qs('#resetBtn').addEventListener('click', resetAll);

    SZ.qs('#loadMore').addEventListener('click', loadMore);

    /* мобільна панель фільтрів */
    const panel = SZ.qs('.filters');
    SZ.qs('#filtersOpen').addEventListener('click', () => {
      panel.classList.add('is-open'); document.body.classList.add('no-scroll');
    });
    SZ.qs('#filtersClose').addEventListener('click', () => {
      panel.classList.remove('is-open'); document.body.classList.remove('no-scroll');
    });

    /* активні чипси */
    SZ.qs('#activeChips').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-drop]');
      if (!btn) return;
      const [key, val] = btn.dataset.drop.split('|');
      if (key === 'q') { state.q = ''; SZ.qs('#searchInput').value = ''; }
      else if (key === 'price') { state.min = state.max = null; SZ.qs('#priceMin').value = ''; SZ.qs('#priceMax').value = ''; }
      else if (key === 'sizes') { state.sizes = state.sizes.filter(x => String(x) !== val); }
      else { state[key] = state[key].filter(v => v !== val); }
      syncInputs();
      state.shown = PER_PAGE;
      apply();
    });
  }

  function numOrNull(v) { v = parseInt(v, 10); return isNaN(v) ? null : v; }

  function resetAll() {
    state.q = ''; state.brands = []; state.cats = []; state.genders = [];
    state.sizes = []; state.badges = []; state.min = null; state.max = null;
    state.sort = 'popular'; state.shown = PER_PAGE;
    SZ.qs('#searchInput').value = '';
    SZ.qs('#priceMin').value = ''; SZ.qs('#priceMax').value = '';
    SZ.qs('#sortSelect').value = 'popular';
    syncInputs();
    apply();
  }

  function syncInputs() {
    SZ.qsa('.filters input[data-f]').forEach(cb => {
      cb.checked = state[cb.dataset.f].includes(cb.value);
    });
    SZ.qsa('#fSizes .size-chip').forEach(chip => {
      chip.classList.toggle('is-active', state.sizes.includes(Number(chip.dataset.size)));
    });
  }

  /* ---------- Фільтрація ---------- */
  function filtered() {
    const q = state.q.toLowerCase();
    return ALL.filter(function (p) {
      if (q) {
        const hay = (p.name + ' ' + p.brand + ' ' + (SZ.CATEGORY_NAMES[p.category] || '') + ' ' + p.colors.join(' ')).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (state.brands.length && !state.brands.includes(p.brand)) return false;
      if (state.cats.length && !state.cats.includes(p.category)) return false;
      if (state.genders.length && !state.genders.includes(p.gender)) return false;
      if (state.sizes.length && !state.sizes.some(s => p.sizes.includes(s))) return false;
      if (state.badges.length) {
        const ok = state.badges.some(b => b === 'sale' ? !!p.oldPrice : p.badge === b);
        if (!ok) return false;
      }
      if (state.min != null && p.price < state.min) return false;
      if (state.max != null && p.price > state.max) return false;
      return true;
    });
  }

  function sorted(list) {
    const l = list.slice();
    switch (state.sort) {
      case 'price-asc':  return l.sort((a, b) => a.price - b.price);
      case 'price-desc': return l.sort((a, b) => b.price - a.price);
      case 'new':        return l.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'rating':     return l.sort((a, b) => b.rating - a.rating);
      case 'name':       return l.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
      default:           return l.sort((a, b) => (b.popular - a.popular) || (b.rating - a.rating));
    }
  }

  /* ---------- «Показати ще»: дозавантаження без перемальовування ---------- */
  function loadMore() {
    const list = sorted(filtered());
    const from = state.shown;
    state.shown = Math.min(state.shown + PER_PAGE, list.length);

    const added = SZ.appendProducts(SZ.qs('#catalogGrid'), list.slice(from, state.shown));
    updateLoadMore(list);

    /* трохи прокручуємо до першої нової картки, щоб було видно результат */
    if (added.length) {
      const top = added[0].getBoundingClientRect().top + window.scrollY;
      if (top > window.scrollY + window.innerHeight - 120) {
        window.scrollTo({ top: top - window.innerHeight / 2, behavior: 'smooth' });
      }
    }
  }

  function updateLoadMore(list) {
    const btn = SZ.qs('#loadMore');
    const rest = Math.max(0, list.length - state.shown);
    btn.hidden = rest === 0;
    btn.textContent = `Показати ще (${Math.min(PER_PAGE, rest)})`;
  }

  /* ---------- Рендер ---------- */
  function apply() {
    const list = sorted(filtered());
    const grid = SZ.qs('#catalogGrid');
    const visible = list.slice(0, state.shown);

    SZ.qs('#resultCount').textContent = declension(list.length);
    renderChips();
    writeUrl();

    if (!list.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
        <div class="empty__ic">🔍</div>
        <h3>Нічого не знайдено</h3>
        <p class="muted">Спробуйте прибрати частину фільтрів або змінити запит.</p>
        <button class="btn btn--primary" type="button" onclick="document.getElementById('resetBtn').click()">Скинути фільтри</button>
      </div>`;
      SZ.qs('#loadMore').hidden = true;
      return;
    }

    SZ.renderProducts(grid, visible);
    updateLoadMore(list);
  }

  function declension(n) {
    const forms = ['товар', 'товари', 'товарів'];
    const cases = [2, 0, 1, 1, 1, 2];
    const f = forms[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[Math.min(n % 10, 5)]];
    return `Знайдено ${n} ${f}`;
  }

  function renderChips() {
    const box = SZ.qs('#activeChips');
    const chips = [];
    if (state.q) chips.push(chip('q', state.q, '«' + state.q + '»'));
    state.brands.forEach(b => chips.push(chip('brands', b, b)));
    state.cats.forEach(c => chips.push(chip('cats', c, SZ.CATEGORY_NAMES[c] || c)));
    state.genders.forEach(g => chips.push(chip('genders', g, SZ.GENDER_NAMES[g])));
    state.sizes.forEach(s => chips.push(chip('sizes', s, 'Розмір ' + s)));
    state.badges.forEach(b => chips.push(chip('badges', b, { new: 'Новинки', hit: 'Хіти', sale: 'Зі знижкою' }[b])));
    if (state.min != null || state.max != null) {
      chips.push(chip('price', '', `${state.min != null ? state.min : 0}–${state.max != null ? state.max : '∞'} ₴`));
    }
    box.innerHTML = chips.join('');
    box.hidden = !chips.length;
  }

  function chip(key, val, text) {
    return `<span class="chip">${SZ.escape(text)}<button type="button" data-drop="${key}|${SZ.escape(String(val))}" aria-label="Прибрати">×</button></span>`;
  }
})();
