/* ============================================================
   STEPZONE — ядро сайту
   • завантаження товарів через fetch()
   • кошик у LocalStorage (+ резервне збереження у Cookies)
   • динамічна генерація карток товарів
   • шапка, підвал, drawer кошика, сповіщення
   ============================================================ */

(function () {
  'use strict';

  const SZ = window.SZ = {};

  /* ---------- Константи ---------- */
  const CART_KEY = 'sz_cart_v1';
  const FAV_KEY  = 'sz_fav_v1';
  const FREE_SHIPPING_FROM = 5000;
  const SHIPPING_COST = 120;

  SZ.FREE_SHIPPING_FROM = FREE_SHIPPING_FROM;
  SZ.SHIPPING_COST = SHIPPING_COST;

  SZ.PROMOS = {
    'STEP10':   { discount: 0.10, label: '-10% на замовлення' },
    'ZONE15':   { discount: 0.15, label: '-15% на замовлення' },
    'FIRST300': { fixed: 300,     label: '-300 ₴ на перше замовлення' }
  };

  SZ.CATEGORY_NAMES = {
    lifestyle: 'Лайфстайл',
    running: 'Бігові',
    retro: 'Ретро',
    basketball: 'Баскетбольні',
    training: 'Тренувальні',
    trail: 'Трейл'
  };

  SZ.GENDER_NAMES = { men: 'Чоловічі', women: 'Жіночі', unisex: 'Унісекс' };

  /* ============================================================
     1. Сховище: LocalStorage з резервом на Cookies
     ============================================================ */
  const Cookies = {
    set(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + (days || 30) * 864e5);
      document.cookie = name + '=' + encodeURIComponent(value) +
        ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    },
    get(name) {
      const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? decodeURIComponent(m[2]) : null;
    }
  };
  SZ.Cookies = Cookies;

  const hasLS = (function () {
    try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); return true; }
    catch (e) { return false; }
  })();

  const Store = {
    read(key, fallback) {
      let raw = null;
      try { raw = hasLS ? localStorage.getItem(key) : Cookies.get(key); } catch (e) { raw = null; }
      if (!raw) raw = Cookies.get(key);
      if (!raw) return fallback;
      try { return JSON.parse(raw); } catch (e) { return fallback; }
    },
    write(key, value) {
      const raw = JSON.stringify(value);
      try { if (hasLS) localStorage.setItem(key, raw); } catch (e) {}
      // дубль у кукі — дані переживають очищення LocalStorage
      if (raw.length < 3500) Cookies.set(key, raw, 30);
    }
  };
  SZ.Store = Store;

  /* ============================================================
     2. Утиліти
     ============================================================ */
  SZ.money = function (n) {
    return new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' ₴';
  };

  SZ.qs  = (sel, root) => (root || document).querySelector(sel);
  SZ.qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  SZ.param = function (name) {
    return new URLSearchParams(location.search).get(name);
  };

  SZ.escape = function (str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  };

  SZ.debounce = function (fn, ms) {
    let t; return function () { clearTimeout(t); const a = arguments, c = this; t = setTimeout(() => fn.apply(c, a), ms || 250); };
  };

  /* Запасна картинка, якщо зовнішнє фото не завантажилось */
  SZ.placeholder = function (title) {
    const txt = SZ.escape((title || 'STEPZONE').slice(0, 22));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f2f1ee"/><stop offset="1" stop-color="#e3e1db"/></linearGradient></defs>
      <rect width="600" height="600" fill="url(#g)"/>
      <path d="M90 380c40-8 70-26 96-52 22-22 38-46 62-46 20 0 30 14 46 26 22 16 52 22 92 24 44 2 74 10 92 26 10 9 14 20 14 32H90z" fill="#cfcdc6"/>
      <path d="M90 390h402v20H90z" fill="#b9b7b0"/>
      <text x="300" y="470" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="#8b8b93" text-anchor="middle">${txt}</text>
      <text x="300" y="502" font-family="Inter, Arial, sans-serif" font-size="16" fill="#a9a8a2" text-anchor="middle">STEPZONE</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  /* Якщо фото не завантажилось — пробуємо наступні URL товару,
     і лише потім показуємо намальований запасний варіант */
  SZ.imgFallback = function (img, title, alternatives) {
    const rest = (alternatives || []).slice(1);
    let i = 0;
    img.addEventListener('error', function handler() {
      if (i < rest.length) { img.src = rest[i++]; return; }
      img.removeEventListener('error', handler);
      img.src = SZ.placeholder(title);
    });
  };

  /* Те саме для картинок, зібраних рядком HTML.
     У data-fallback перелічуємо запасні файли через | ,
     останній крок — намальована заглушка з назви товару. */
  document.addEventListener('error', function (e) {
    const img = e.target;
    if (!img || img.tagName !== 'IMG' || img.dataset.fbDone) return;
    const chain = (img.dataset.fallback || '').split('|').filter(Boolean);
    if (chain.length) {
      img.src = chain.shift();
      img.dataset.fallback = chain.join('|');
    } else {
      img.dataset.fbDone = '1';
      img.src = SZ.placeholder(img.dataset.fbTitle || img.alt || 'STEPZONE');
    }
  }, true);

  /* Готовий тег <img> із ланцюжком підміни */
  SZ.img = function (product, opts) {
    opts = opts || {};
    const list = product.images || [];
    return `<img src="${list[0] || ''}" alt="${SZ.escape(opts.alt || product.name || '')}"` +
      ` data-fallback="${SZ.escape(list.slice(1).join('|'))}"` +
      ` data-fb-title="${SZ.escape(product.name || '')}"` +
      (opts.attrs ? ' ' + opts.attrs : '') + '>';
  };

  /* ============================================================
     3. Дані: fetch з JSON + резерв на вбудований масив
     ============================================================ */
  let _cache = null;

  SZ.getData = function () {
    if (_cache) return Promise.resolve(_cache);

    const base = SZ.basePath();
    return fetch(base + 'data/products.json', { cache: 'no-cache' })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(json => {
        _cache = { products: json.products, categories: json.categories };
        return _cache;
      })
      .catch(() => {
        // file:// або немає сервера → беремо вбудовану базу
        _cache = {
          products: window.STEPZONE_PRODUCTS || [],
          categories: window.STEPZONE_CATEGORIES || []
        };
        return _cache;
      });
  };

  SZ.getProducts = () => SZ.getData().then(d => d.products);
  SZ.findProduct = id => SZ.getProducts().then(list => list.find(p => p.id === id) || null);

  SZ.basePath = function () { return ''; };

  /* ============================================================
     4. Кошик
     ============================================================ */
  const Cart = SZ.Cart = {
    items() { return Store.read(CART_KEY, []); },

    save(items) {
      Store.write(CART_KEY, items);
      document.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
    },

    count() { return this.items().reduce((s, i) => s + i.qty, 0); },

    add(product, size, qty) {
      qty = qty || 1;
      const items = this.items();
      const found = items.find(i => i.id === product.id && i.size === size);
      if (found) {
        found.qty = Math.min(found.qty + qty, 10);
      } else {
        items.push({
          id: product.id, size: size, qty: qty,
          name: product.name, brand: product.brand,
          price: product.price,
          image: product.images[0],
          fallback: product.images.slice(1).join('|')
        });
      }
      this.save(items);
      return items;
    },

    setQty(id, size, qty) {
      let items = this.items();
      const it = items.find(i => i.id === id && i.size === size);
      if (!it) return items;
      it.qty = qty;
      if (it.qty < 1) items = items.filter(i => !(i.id === id && i.size === size));
      if (it.qty > 10) it.qty = 10;
      this.save(items);
      return items;
    },

    remove(id, size) {
      this.save(this.items().filter(i => !(i.id === id && i.size === size)));
    },

    clear() { this.save([]); },

    subtotal() { return this.items().reduce((s, i) => s + i.price * i.qty, 0); },

    shipping(sub) {
      sub = sub == null ? this.subtotal() : sub;
      if (sub === 0) return 0;
      return sub >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
    },

    /* Промокод */
    promo() { return Store.read('sz_promo_v1', null); },
    applyPromo(code) {
      code = String(code || '').trim().toUpperCase();
      const rule = SZ.PROMOS[code];
      if (!rule) return null;
      Store.write('sz_promo_v1', { code, ...rule });
      document.dispatchEvent(new CustomEvent('cart:change'));
      return rule;
    },
    clearPromo() { Store.write('sz_promo_v1', null); document.dispatchEvent(new CustomEvent('cart:change')); },

    totals() {
      const sub = this.subtotal();
      const promo = this.promo();
      let discount = 0;
      if (promo && sub > 0) {
        discount = promo.discount ? Math.round(sub * promo.discount) : Math.min(promo.fixed, sub);
      }
      const ship = this.shipping(sub - discount);
      return { sub, discount, ship, total: Math.max(0, sub - discount + ship), promo };
    }
  };

  /* ============================================================
     5. Обране
     ============================================================ */
  const Fav = SZ.Fav = {
    items() { return Store.read(FAV_KEY, []); },
    has(id) { return this.items().indexOf(id) !== -1; },
    toggle(id) {
      let list = this.items();
      const on = list.indexOf(id) === -1;
      list = on ? list.concat(id) : list.filter(x => x !== id);
      Store.write(FAV_KEY, list);
      document.dispatchEvent(new CustomEvent('fav:change'));
      return on;
    }
  };

  /* ============================================================
     6. Сповіщення (toast)
     ============================================================ */
  SZ.toast = function (text, opts) {
    opts = opts || {};
    let box = SZ.qs('.toasts');
    if (!box) { box = document.createElement('div'); box.className = 'toasts'; document.body.appendChild(box); }
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>${SZ.escape(text)}</span>`;
    if (opts.action) {
      const a = document.createElement('a');
      a.href = opts.action.href; a.textContent = opts.action.text;
      a.style.cssText = 'margin-left:auto;color:#ff8a5c;font-weight:600;white-space:nowrap';
      el.appendChild(a);
    }
    box.appendChild(el);
    setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 260); }, opts.time || 2800);
  };

  /* ============================================================
     7. Картка товару (генерується в JS, не вшита в HTML)
     ============================================================ */
  SZ.productCard = function (p) {
    const el = document.createElement('article');
    el.className = 'card reveal';
    el.dataset.id = p.id;

    const badges = [];
    if (p.badge === 'new')  badges.push('<span class="tag tag--new">Новинка</span>');
    if (p.badge === 'hit')  badges.push('<span class="tag">Хіт</span>');
    if (p.oldPrice) {
      const off = Math.round((1 - p.price / p.oldPrice) * 100);
      badges.push(`<span class="tag tag--sale">-${off}%</span>`);
    }
    if (p.stock <= 5) badges.push('<span class="tag tag--soft">Залишилось ' + p.stock + '</span>');

    el.innerHTML = `
      <div class="card__media">
        <a href="product.html?id=${p.id}" aria-label="${SZ.escape(p.name)}">
          <img src="${p.images[0]}" alt="${SZ.escape(p.name)}" loading="lazy">
        </a>
        <div class="card__badges">${badges.join('')}</div>
        <button class="card__fav${Fav.has(p.id) ? ' is-active' : ''}" type="button" data-fav="${p.id}" aria-label="В обране">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        <div class="card__quick" data-quick></div>
      </div>
      <div class="card__brand">${SZ.escape(p.brand)}</div>
      <h3 class="card__title"><a href="product.html?id=${p.id}">${SZ.escape(p.name)}</a></h3>
      <div class="card__rating">
        <svg viewBox="0 0 24 24"><path d="M12 2l3 6.6 7 .9-5.2 4.8 1.4 7L12 17.9 5.8 21.3l1.4-7L2 9.5l7-.9z"/></svg>
        ${p.rating} <span style="color:var(--ink-3)">(${p.reviews})</span>
      </div>
      <div class="card__meta">
        <span class="price">${SZ.money(p.price)}</span>
        ${p.oldPrice ? `<span class="price--old">${SZ.money(p.oldPrice)}</span>` : ''}
      </div>`;

    const img = SZ.qs('img', el);
    SZ.imgFallback(img, p.name, p.images);

    /* Швидке додавання з вибором розміру — без перезавантаження сторінки */
    const quick = SZ.qs('[data-quick]', el);
    const renderQuickBtn = () => {
      quick.innerHTML = `<button class="btn btn--primary btn--block btn--sm" type="button" data-open-sizes>Швидке додавання</button>`;
    };
    renderQuickBtn();

    quick.addEventListener('click', function (e) {
      const open = e.target.closest('[data-open-sizes]');
      if (open) {
        quick.innerHTML =
          `<div style="background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border-radius:12px;padding:10px">
             <div style="font-size:12px;color:var(--ink-3);margin-bottom:7px">Оберіть розмір</div>
             <div class="sizes">${p.sizes.map(s => `<button class="size-chip" type="button" data-size="${s}">${s}</button>`).join('')}</div>
           </div>`;
        return;
      }
      const chip = e.target.closest('[data-size]');
      if (chip) {
        Cart.add(p, Number(chip.dataset.size), 1);
        SZ.toast(`${p.name} · розмір ${chip.dataset.size} — у кошику`, { action: { href: 'cart.html', text: 'Перейти' } });
        renderQuickBtn();
        SZ.openDrawer();
      }
    });

    return el;
  };

  SZ.renderProducts = function (container, list) {
    container.innerHTML = '';
    if (!list.length) return;
    const frag = document.createDocumentFragment();
    list.forEach(p => frag.appendChild(SZ.productCard(p)));
    container.appendChild(frag);
    SZ.observeReveal(container);
  };

  /* Додає картки в кінець списку, не чіпаючи вже показані.
     Використовується кнопкою «Показати ще»: нові картки з'являються
     одразу (з невеликою затримкою одна за одною), без прокрутки. */
  SZ.appendProducts = function (container, list) {
    if (!list.length) return [];
    const frag = document.createDocumentFragment();
    const added = list.map(p => {
      const card = SZ.productCard(p);
      frag.appendChild(card);
      return card;
    });
    container.appendChild(frag);
    requestAnimationFrame(function () {
      added.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 45));
    });
    return added;
  };

  SZ.skeletons = function (container, n) {
    container.innerHTML = Array.from({ length: n || 8 }, () =>
      `<div class="sk-card"><div class="skeleton sk-img"></div>
       <div class="skeleton sk-line w60"></div><div class="skeleton sk-line w40"></div></div>`).join('');
  };

  /* ============================================================
     8. Шапка та підвал (спільні для всіх сторінок)
     ============================================================ */
  const NAV = [
    { href: 'index.html',   text: 'Головна' },
    { href: 'catalog.html', text: 'Каталог' },
    { href: 'catalog.html?badge=new', text: 'Новинки' },
    { href: 'catalog.html?badge=sale', text: 'Знижки' },
    { href: 'about.html',   text: 'Про нас' },
    { href: 'contacts.html',text: 'Контакти' }
  ];

  function currentPage() {
    const f = location.pathname.split('/').pop();
    return f === '' ? 'index.html' : f;
  }

  /* Чи підсвічувати пункт меню.
     Пункт активний, коли збігається і сторінка, і всі його параметри.
     «Каталог» гасне, якщо зараз відкриті «Новинки» або «Знижки». */
  function isNavActive(href) {
    const [path, query] = href.split('?');
    if (path !== currentPage()) return false;

    const current = new URLSearchParams(location.search);
    const wanted = new URLSearchParams(query || '');

    for (const [key, value] of wanted) {
      if (current.get(key) !== value) return false;
    }
    if (!query && path === 'catalog.html' && current.get('badge')) return false;
    return true;
  }

  /* Перемальовує підсвітку меню — каталог викликає це після зміни фільтрів */
  SZ.refreshNav = function () {
    SZ.qsa('.nav a, .mobile-menu a').forEach(a => {
      a.classList.toggle('is-active', isNavActive(a.getAttribute('href')));
    });
  };

  SZ.mountHeader = function () {
    const host = SZ.qs('#header');
    if (!host) return;

    host.className = 'header';
    host.innerHTML = `
      <div class="container header__bar">
        <a class="logo" href="index.html">
          <span class="logo__mark"><span>S</span></span>STEP<em>ZONE</em>
        </a>
        <nav class="nav">
          ${NAV.map(n => `<a href="${n.href}" class="${isNavActive(n.href) ? 'is-active' : ''}">${n.text}</a>`).join('')}
        </nav>

        <div class="hsearch">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input type="search" placeholder="Пошук: Air Max, Samba…" aria-label="Пошук товарів" id="globalSearch" autocomplete="off">
          <div class="hsearch__results" id="searchResults" hidden></div>
        </div>

        <div class="header__actions">
          <a class="icon-btn" href="favorites.html" aria-label="Обране">
            <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            <span class="badge" id="favBadge" hidden></span>
          </a>
          <button class="icon-btn" type="button" id="cartBtn" aria-label="Кошик">
            <svg viewBox="0 0 24 24"><path d="M6 6h15l-1.6 9.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.7L5.6 3.6A1 1 0 0 0 4.6 3H3"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
            <span class="badge" id="cartBadge" hidden></span>
          </button>
          <button class="icon-btn burger" type="button" id="burger" aria-label="Меню">
            <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        <div class="hsearch" style="display:block;width:100%;margin:0 0 18px">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input type="search" placeholder="Пошук кросівок…" id="mobileSearch" autocomplete="off">
        </div>
        ${NAV.map(n => `<a href="${n.href}" class="${isNavActive(n.href) ? 'is-active' : ''}">${n.text}</a>`).join('')}
        <a href="favorites.html">Обране</a>
        <a href="cart.html">Кошик</a>
      </div>`;

    /* бургер */
    const menu = SZ.qs('#mobileMenu');
    SZ.qs('#burger').addEventListener('click', () => {
      menu.classList.toggle('is-open');
      document.body.classList.toggle('no-scroll', menu.classList.contains('is-open'));
    });

    /* кошик */
    SZ.qs('#cartBtn').addEventListener('click', SZ.openDrawer);

    /* пошук-підказки */
    setupSearch(SZ.qs('#globalSearch'), SZ.qs('#searchResults'));
    const ms = SZ.qs('#mobileSearch');
    if (ms) ms.addEventListener('keydown', e => {
      if (e.key === 'Enter' && ms.value.trim()) location.href = 'catalog.html?q=' + encodeURIComponent(ms.value.trim());
    });

    updateBadges();
  };

  function setupSearch(input, box) {
    if (!input) return;
    const run = SZ.debounce(function () {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { box.hidden = true; return; }
      SZ.getProducts().then(list => {
        const hits = list.filter(p =>
          (p.name + ' ' + p.brand + ' ' + (SZ.CATEGORY_NAMES[p.category] || '')).toLowerCase().includes(q)
        ).slice(0, 6);
        if (!hits.length) {
          box.innerHTML = '<div style="padding:14px;color:var(--ink-3);font-size:14px">Нічого не знайдено</div>';
        } else {
          box.innerHTML = hits.map(p => `
            <a class="sug" href="product.html?id=${p.id}">
              <img src="${p.images[0]}" alt="" data-fallback="${SZ.escape(p.images.slice(1).join('|'))}" data-fb-title="${SZ.escape(p.name)}">
              <span><b>${SZ.escape(p.name)}</b><span>${p.brand} · ${SZ.money(p.price)}</span></span>
            </a>`).join('') +
            `<a class="sug" href="catalog.html?q=${encodeURIComponent(q)}" style="justify-content:center;font-weight:600;font-size:14px">Показати всі результати →</a>`;
        }
        box.hidden = false;
      });
    }, 200);

    input.addEventListener('input', run);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) location.href = 'catalog.html?q=' + encodeURIComponent(input.value.trim());
      if (e.key === 'Escape') box.hidden = true;
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.hsearch')) box.hidden = true;
    });
  }

  SZ.mountFooter = function () {
    const host = SZ.qs('#footer');
    if (!host) return;
    host.className = 'footer';
    host.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div>
            <a class="logo" href="index.html"><span class="logo__mark"><span>S</span></span>STEP<em>ZONE</em></a>
            <p class="footer__about">Магазин оригінальних кросівок з 2019 року. Ми привозимо тільки те, що носимо самі — і перевіряємо кожну пару перед відправкою.</p>
            <div class="socials">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
              <a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24"><path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/></svg></a>
              <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M15 3v10a4 4 0 1 1-4-4"/><path d="M15 6a5 5 0 0 0 5 4"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Каталог</h4>
            <ul>
              <li><a href="catalog.html?cat=lifestyle">Лайфстайл</a></li>
              <li><a href="catalog.html?cat=running">Бігові</a></li>
              <li><a href="catalog.html?cat=retro">Ретро</a></li>
              <li><a href="catalog.html?cat=basketball">Баскетбольні</a></li>
              <li><a href="catalog.html?cat=trail">Трейл</a></li>
            </ul>
          </div>
          <div>
            <h4>Бренди</h4>
            <ul>
              <li><a href="catalog.html?brand=Nike">Nike</a></li>
              <li><a href="catalog.html?brand=Adidas">adidas</a></li>
              <li><a href="catalog.html?brand=Jordan">Jordan</a></li>
              <li><a href="catalog.html?brand=New%20Balance">New Balance</a></li>
              <li><a href="catalog.html?brand=ASICS">ASICS</a></li>
            </ul>
          </div>
          <div>
            <h4>Допомога</h4>
            <ul>
              <li><a href="about.html">Про магазин</a></li>
              <li><a href="contacts.html">Контакти</a></li>
              <li><a href="about.html#delivery">Доставка й оплата</a></li>
              <li><a href="about.html#returns">Обмін і повернення</a></li>
              <li><a href="about.html#sizes">Таблиця розмірів</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 STEPZONE. Усі права захищені.</span>
          <span>Навчальний проєкт · Київ, вул. Хрещатик 22</span>
        </div>
      </div>`;
  };

  /* ============================================================
     9. Drawer кошика
     ============================================================ */
  SZ.mountDrawer = function () {
    if (SZ.qs('#cartDrawer')) return;
    const overlay = document.createElement('div');
    overlay.className = 'overlay'; overlay.id = 'cartOverlay';

    const drawer = document.createElement('aside');
    drawer.className = 'drawer'; drawer.id = 'cartDrawer';
    drawer.innerHTML = `
      <div class="drawer__head">
        <h3>Кошик <span class="muted" id="drawerCount" style="font-weight:500"></span></h3>
        <button class="icon-btn" type="button" id="drawerClose" aria-label="Закрити">
          <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="drawer__body" id="drawerBody"></div>
      <div class="drawer__foot" id="drawerFoot"></div>`;

    document.body.append(overlay, drawer);
    overlay.addEventListener('click', SZ.closeDrawer);
    SZ.qs('#drawerClose').addEventListener('click', SZ.closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') SZ.closeDrawer(); });

    SZ.qs('#drawerBody').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const { id, size, act } = btn.dataset;
      const item = Cart.items().find(i => i.id === id && String(i.size) === String(size));
      if (!item) return;
      if (act === 'inc') Cart.setQty(id, item.size, item.qty + 1);
      if (act === 'dec') Cart.setQty(id, item.size, item.qty - 1);
      if (act === 'del') { Cart.remove(id, item.size); SZ.toast('Товар видалено з кошика'); }
    });

    renderDrawer();
  };

  SZ.openDrawer = function () {
    SZ.mountDrawer();
    renderDrawer();
    SZ.qs('#cartOverlay').classList.add('is-open');
    SZ.qs('#cartDrawer').classList.add('is-open');
    document.body.classList.add('no-scroll');
  };

  SZ.closeDrawer = function () {
    const o = SZ.qs('#cartOverlay'), d = SZ.qs('#cartDrawer');
    if (o) o.classList.remove('is-open');
    if (d) d.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };

  function renderDrawer() {
    const body = SZ.qs('#drawerBody'), foot = SZ.qs('#drawerFoot'), cnt = SZ.qs('#drawerCount');
    if (!body) return;
    const items = Cart.items();
    cnt.textContent = items.length ? '· ' + Cart.count() + ' шт.' : '';

    if (!items.length) {
      body.innerHTML = `<div class="empty"><div class="empty__ic">👟</div>
        <h3>Кошик порожній</h3>
        <p class="muted small">Саме час це виправити.</p>
        <a class="btn btn--primary" href="catalog.html">До каталогу</a></div>`;
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="cart-item__img"><img src="${i.image}" alt="" data-fallback="${SZ.escape(i.fallback || '')}" data-fb-title="${SZ.escape(i.name)}"></div>
        <div>
          <div class="cart-item__name"><a href="product.html?id=${i.id}">${SZ.escape(i.name)}</a></div>
          <div class="cart-item__opts">${i.brand} · розмір ${i.size}</div>
        </div>
        <div class="cart-item__right">
          <div class="qty">
            <button type="button" data-act="dec" data-id="${i.id}" data-size="${i.size}" aria-label="Менше">−</button>
            <span>${i.qty}</span>
            <button type="button" data-act="inc" data-id="${i.id}" data-size="${i.size}" aria-label="Більше">+</button>
          </div>
          <b>${SZ.money(i.price * i.qty)}</b>
          <button class="link-del" type="button" data-act="del" data-id="${i.id}" data-size="${i.size}">Видалити</button>
        </div>
      </div>`).join('');

    const t = Cart.totals();
    foot.innerHTML = `
      <div class="srow"><span>Товари</span><b>${SZ.money(t.sub)}</b></div>
      ${t.discount ? `<div class="srow"><span>Знижка ${t.promo.code}</span><b style="color:var(--accent)">−${SZ.money(t.discount)}</b></div>` : ''}
      <div class="srow"><span>Доставка</span><b>${t.ship ? SZ.money(t.ship) : 'Безкоштовно'}</b></div>
      <div class="srow srow--total"><span>Разом</span><b>${SZ.money(t.total)}</b></div>
      <a class="btn btn--accent btn--block btn--lg" href="checkout.html" style="margin-top:14px">Оформити замовлення</a>
      <a class="btn btn--ghost btn--block" href="cart.html" style="margin-top:8px">Перейти в кошик</a>`;
  }

  /* ============================================================
     10. Лічильники в шапці
     ============================================================ */
  function updateBadges() {
    const c = SZ.qs('#cartBadge'), f = SZ.qs('#favBadge');
    if (c) { const n = Cart.count(); c.textContent = n; c.hidden = !n; }
    if (f) { const n = Fav.items().length; f.textContent = n; f.hidden = !n; }
  }

  document.addEventListener('cart:change', () => { updateBadges(); renderDrawer(); });
  document.addEventListener('fav:change', updateBadges);

  /* синхронізація між вкладками */
  window.addEventListener('storage', e => {
    if (e.key === CART_KEY || e.key === FAV_KEY) { _flushCache(); updateBadges(); renderDrawer(); }
  });
  function _flushCache() {}

  /* ============================================================
     11. Обране: делегування кліків по всіх картках
     ============================================================ */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-fav]');
    if (!btn) return;
    e.preventDefault();
    const on = Fav.toggle(btn.dataset.fav);
    btn.classList.toggle('is-active', on);
    SZ.toast(on ? 'Додано в обране' : 'Видалено з обраного');
    SZ.qsa(`[data-fav="${btn.dataset.fav}"]`).forEach(b => b.classList.toggle('is-active', on));
  });

  /* ============================================================
     12. Анімація появи блоків
     ============================================================ */
  let io = null;
  SZ.observeReveal = function (root) {
    if (!('IntersectionObserver' in window)) {
      SZ.qsa('.reveal', root).forEach(el => el.classList.add('is-in')); return;
    }
    if (!io) {
      io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -60px 0px' });
    }
    SZ.qsa('.reveal:not(.is-in)', root).forEach(el => io.observe(el));
  };

  /* ============================================================
     13. Ініціалізація
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    SZ.mountHeader();
    SZ.mountFooter();
    SZ.mountDrawer();
    SZ.observeReveal(document);

    /* акордеони (сторінка товару, FAQ) */
    document.addEventListener('click', function (e) {
      const head = e.target.closest('.acc__head');
      if (head) head.parentElement.classList.toggle('is-open');
      const ftitle = e.target.closest('.fgroup__title');
      if (ftitle) ftitle.parentElement.classList.toggle('is-closed');
    });

    /* підписка у підвалі/на головній */
    document.addEventListener('submit', function (e) {
      const form = e.target.closest('[data-newsletter]');
      if (!form) return;
      e.preventDefault();
      SZ.toast('Дякуємо! Промокод STEP10 надіслано на пошту');
      form.reset();
    });
  });

})();
