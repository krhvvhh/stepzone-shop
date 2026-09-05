/* ============================================================
   STEPZONE — каталог
   • фільтрація за брендом, категорією, розміром, ціною, статтю, позначкою
   • лічильники біля кожного варіанта рахуються з урахуванням інших
     активних фільтрів; варіанти без результатів блокуються
   • пошук, сортування, пагінація «Показати ще»
   • стан фільтрів зберігається в адресі — посиланням можна поділитись
   ============================================================ */
(function () {
  'use strict';

  const PER_PAGE = 9;

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

  const BADGE_NAMES = { new: 'Новинки', hit: 'Хіти', sale: 'Зі знижкою' };

  let ALL = [];
  let CATEGORIES = [];

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    readUrl();
    SZ.skeletons(SZ.qs('#catalogGrid'), 9);

    SZ.getData().then(function (data) {
      ALL = data.products;
      CATEGORIES = data.categories;
      SZ.qs('#searchInput').value = state.q;
      SZ.qs('#sortSelect').value = state.sort;
      if (state.min != null) SZ.qs('#priceMin').value = state.min;
      if (state.max != null) SZ.qs('#priceMax').value = state.max;
      bind();
      apply();
    });
  }

  /* ============================================================
     Адреса ↔ стан. Кілька значень пишемо через кому.
     ============================================================ */
  function readUrl() {
    const p = new URLSearchParams(location.search);
    const list = key => (p.get(key) || '').split(',').filter(Boolean);

    state.q = p.get('q') || '';
    state.brands = list('brand');
    state.cats = list('cat');
    state.genders = list('gender');
    state.badges = list('badge');
    state.sizes = list('size').map(Number).filter(n => !isNaN(n));
    state.min = intOrNull(p.get('min'));
    state.max = intOrNull(p.get('max'));
    if (p.get('sort')) state.sort = p.get('sort');
  }

  function writeUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.brands.length) p.set('brand', state.brands.join(','));
    if (state.cats.length) p.set('cat', state.cats.join(','));
    if (state.genders.length) p.set('gender', state.genders.join(','));
    if (state.badges.length) p.set('badge', state.badges.join(','));
    if (state.sizes.length) p.set('size', state.sizes.join(','));
    if (state.min != null) p.set('min', state.min);
    if (state.max != null) p.set('max', state.max);
    if (state.sort !== 'popular') p.set('sort', state.sort);

    const qs = p.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    if (SZ.refreshNav) SZ.refreshNav();
  }

  function intOrNull(v) {
    const n = parseInt(v, 10);
    return isNaN(n) || n < 0 ? null : n;
  }

  /* ============================================================
     Перевірка товару. skip — вимір, який тимчасово ігноруємо,
     щоб порахувати, скільки товарів дасть кожен його варіант.
     ============================================================ */
  function matches(p, skip) {
    if (skip !== 'q' && state.q) {
      const hay = (p.name + ' ' + p.brand + ' ' +
        (SZ.CATEGORY_NAMES[p.category] || '') + ' ' + p.colors.join(' ')).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    if (skip !== 'brands' && state.brands.length && !state.brands.includes(p.brand)) return false;
    if (skip !== 'cats' && state.cats.length && !state.cats.includes(p.category)) return false;
    if (skip !== 'genders' && state.genders.length && !state.genders.includes(p.gender)) return false;
    if (skip !== 'sizes' && state.sizes.length && !state.sizes.some(s => p.sizes.includes(s))) return false;
    if (skip !== 'badges' && state.badges.length) {
      const ok = state.badges.some(b => b === 'sale' ? !!p.oldPrice : p.badge === b);
      if (!ok) return false;
    }
    if (skip !== 'price') {
      if (state.min != null && p.price < state.min) return false;
      if (state.max != null && p.price > state.max) return false;
    }
    return true;
  }

  const filtered = () => ALL.filter(p => matches(p, null));

  /* Скільки товарів дасть окремий варіант з урахуванням інших фільтрів */
  function countFor(dimension, test) {
    return ALL.filter(p => matches(p, dimension) && test(p)).length;
  }

  /* ============================================================
     Панель фільтрів. Перемальовуємо при кожній зміні,
     щоб лічильники залишались правдивими.
     ============================================================ */
  function renderFilters() {
    const brands = [...new Set(ALL.map(p => p.brand))].sort((a, b) => a.localeCompare(b, 'uk'));
    const sizes = [...new Set(ALL.flatMap(p => p.sizes))].sort((a, b) => a - b);

    SZ.qs('#fBrands').innerHTML = brands.map(b =>
      checkbox('brands', b, b, countFor('brands', p => p.brand === b))).join('');

    SZ.qs('#fCats').innerHTML = CATEGORIES.map(c =>
      checkbox('cats', c.id, c.name, countFor('cats', p => p.category === c.id))).join('');

    SZ.qs('#fGender').innerHTML = ['men', 'women', 'unisex'].map(g =>
      checkbox('genders', g, SZ.GENDER_NAMES[g], countFor('genders', p => p.gender === g))).join('');

    SZ.qs('#fBadges').innerHTML = ['new', 'hit', 'sale'].map(b =>
      checkbox('badges', b, BADGE_NAMES[b],
        countFor('badges', p => b === 'sale' ? !!p.oldPrice : p.badge === b))).join('');

    SZ.qs('#fSizes').innerHTML = sizes.map(function (s) {
      const active = state.sizes.includes(s);
      const n = countFor('sizes', p => p.sizes.includes(s));
      const cls = 'size-chip' + (active ? ' is-active' : '') + (!n && !active ? ' is-disabled' : '');
      return `<button class="${cls}" type="button" data-size="${s}" title="${n} товарів">${s}</button>`;
    }).join('');
  }

  function checkbox(dim, value, label, count) {
    const checked = state[dim].includes(value);
    const off = count === 0 && !checked;
    return `<label class="check${off ? ' is-off' : ''}">
      <input type="checkbox" value="${SZ.escape(value)}" data-f="${dim}"
        ${checked ? 'checked' : ''} ${off ? 'disabled' : ''}>
      ${SZ.escape(label)}<em>${count}</em>
    </label>`;
  }

  /* ============================================================
     Події
     ============================================================ */
  function bind() {
    const panel = SZ.qs('.filters');

    panel.addEventListener('change', function (e) {
      const cb = e.target.closest('input[data-f]');
      if (!cb) return;
      const dim = cb.dataset.f;
      state[dim] = cb.checked
        ? state[dim].concat(cb.value)
        : state[dim].filter(v => v !== cb.value);
      resetPaging();
      apply();
    });

    SZ.qs('#fSizes').addEventListener('click', function (e) {
      const chip = e.target.closest('[data-size]');
      if (!chip || chip.classList.contains('is-disabled')) return;
      const s = Number(chip.dataset.size);
      state.sizes = state.sizes.includes(s)
        ? state.sizes.filter(x => x !== s)
        : state.sizes.concat(s);
      resetPaging();
      apply();
    });

    /* Ціна: порожнє поле = без обмеження, переплутані межі міняємо місцями */
    const onPrice = SZ.debounce(function () {
      const a = intOrNull(SZ.qs('#priceMin').value);
      const b = intOrNull(SZ.qs('#priceMax').value);
      if (a != null && b != null && a > b) {
        state.min = b; state.max = a;
        SZ.qs('#priceMin').value = b;
        SZ.qs('#priceMax').value = a;
        SZ.toast('Межі ціни поміняно місцями');
      } else {
        state.min = a; state.max = b;
      }
      resetPaging();
      apply();
    }, 450);
    SZ.qs('#priceMin').addEventListener('input', onPrice);
    SZ.qs('#priceMax').addEventListener('input', onPrice);

    SZ.qs('#searchInput').addEventListener('input', SZ.debounce(function (e) {
      state.q = e.target.value.trim();
      resetPaging();
      apply();
    }, 250));

    SZ.qs('#sortSelect').addEventListener('change', function (e) {
      state.sort = e.target.value;
      resetPaging();
      apply();
    });

    SZ.qs('#resetBtn').addEventListener('click', resetAll);
    SZ.qs('#loadMore').addEventListener('click', loadMore);

    /* мобільна панель */
    SZ.qs('#filtersOpen').addEventListener('click', () => {
      panel.classList.add('is-open');
      document.body.classList.add('no-scroll');
    });
    const closePanel = () => {
      panel.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    };
    SZ.qs('#filtersClose').addEventListener('click', closePanel);
    SZ.qs('#filtersApply').addEventListener('click', closePanel);

    /* зняття окремого фільтра «чипсом» */
    SZ.qs('#activeChips').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-drop]');
      if (!btn) return;
      const key = btn.dataset.dropKey;
      const val = btn.dataset.dropVal;

      if (key === 'q') { state.q = ''; SZ.qs('#searchInput').value = ''; }
      else if (key === 'price') {
        state.min = state.max = null;
        SZ.qs('#priceMin').value = ''; SZ.qs('#priceMax').value = '';
      }
      else if (key === 'sizes') state.sizes = state.sizes.filter(x => String(x) !== val);
      else state[key] = state[key].filter(v => v !== val);

      resetPaging();
      apply();
    });

    SZ.qs('#clearAllChips').addEventListener('click', resetAll);
  }

  function resetPaging() { state.shown = PER_PAGE; }

  function resetAll() {
    state.q = ''; state.brands = []; state.cats = []; state.genders = [];
    state.sizes = []; state.badges = []; state.min = null; state.max = null;
    state.sort = 'popular';
    resetPaging();
    SZ.qs('#searchInput').value = '';
    SZ.qs('#priceMin').value = '';
    SZ.qs('#priceMax').value = '';
    SZ.qs('#sortSelect').value = 'popular';
    apply();
  }

  /* ============================================================
     Сортування
     ============================================================ */
  function sorted(list) {
    const l = list.slice();
    switch (state.sort) {
      case 'price-asc':  return l.sort((a, b) => a.price - b.price);
      case 'price-desc': return l.sort((a, b) => b.price - a.price);
      case 'new':        return l.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'rating':     return l.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case 'discount':   return l.sort((a, b) => discount(b) - discount(a));
      case 'name':       return l.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
      default:           return l.sort((a, b) =>
                           (b.popular - a.popular) || (b.rating - a.rating) || (b.reviews - a.reviews));
    }
  }

  const discount = p => p.oldPrice ? 1 - p.price / p.oldPrice : 0;

  /* ============================================================
     Показ результатів
     ============================================================ */
  function apply() {
    const list = sorted(filtered());
    const grid = SZ.qs('#catalogGrid');

    renderFilters();
    renderChips();
    writeUrl();
    SZ.qs('#resultCount').textContent = declension(list.length);

    if (!list.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
        <div class="empty__ic">🔍</div>
        <h3>Нічого не знайдено</h3>
        <p class="muted">Спробуйте прибрати частину фільтрів або змінити запит.</p>
        <button class="btn btn--primary" type="button" id="emptyReset" style="margin-top:14px">
          Скинути всі фільтри
        </button>
      </div>`;
      SZ.qs('#emptyReset').addEventListener('click', resetAll);
      updateLoadMore(list);
      return;
    }

    SZ.renderProducts(grid, list.slice(0, state.shown));
    updateLoadMore(list);
  }

  function loadMore() {
    const list = sorted(filtered());
    const from = state.shown;
    state.shown = Math.min(state.shown + PER_PAGE, list.length);

    const added = SZ.appendProducts(SZ.qs('#catalogGrid'), list.slice(from, state.shown));
    updateLoadMore(list);

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

    const info = SZ.qs('#shownInfo');
    if (info) {
      const visible = Math.min(state.shown, list.length);
      info.textContent = list.length ? `Показано ${visible} з ${list.length}` : '';
    }
  }

  function declension(n) {
    const forms = ['товар', 'товари', 'товарів'];
    const cases = [2, 0, 1, 1, 1, 2];
    const f = forms[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[Math.min(n % 10, 5)]];
    return `Знайдено ${n} ${f}`;
  }

  /* ============================================================
     Активні фільтри «чипсами»
     ============================================================ */
  function renderChips() {
    const chips = [];
    if (state.q) chips.push(chip('q', state.q, '«' + state.q + '»'));
    state.brands.forEach(b => chips.push(chip('brands', b, b)));
    state.cats.forEach(c => chips.push(chip('cats', c, SZ.CATEGORY_NAMES[c] || c)));
    state.genders.forEach(g => chips.push(chip('genders', g, SZ.GENDER_NAMES[g])));
    state.sizes.slice().sort((a, b) => a - b).forEach(s => chips.push(chip('sizes', s, 'Розмір ' + s)));
    state.badges.forEach(b => chips.push(chip('badges', b, BADGE_NAMES[b])));

    if (state.min != null || state.max != null) {
      const from = state.min != null ? SZ.money(state.min) : '0 ₴';
      const to = state.max != null ? SZ.money(state.max) : 'без обмежень';
      chips.push(chip('price', '', from + ' — ' + to));
    }

    const box = SZ.qs('#activeChips');
    const clear = SZ.qs('#clearAllChips');
    box.innerHTML = chips.join('');
    box.hidden = !chips.length;
    clear.hidden = chips.length < 2;
  }

  function chip(key, val, text) {
    return `<span class="chip">${SZ.escape(text)}
      <button type="button" data-drop data-drop-key="${key}" data-drop-val="${SZ.escape(String(val))}"
        aria-label="Прибрати фільтр">×</button></span>`;
  }
})();
