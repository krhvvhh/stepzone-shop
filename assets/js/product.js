/* STEPZONE — сторінка товару */
(function () {
  'use strict';

  let product = null;
  let selectedSize = null;
  let qty = 1;

  document.addEventListener('DOMContentLoaded', function () {
    const id = SZ.param('id');
    if (!id) return notFound();

    SZ.getData().then(function (data) {
      product = data.products.find(p => p.id === id);
      if (!product) return notFound();
      render(data.products);
    });
  });

  function notFound() {
    SZ.qs('#pdpRoot').innerHTML = `<div class="empty">
      <div class="empty__ic">🤷</div><h2>Товар не знайдено</h2>
      <p class="muted">Можливо, його вже розкупили. Подивіться каталог.</p>
      <a class="btn btn--primary" href="catalog.html">До каталогу</a></div>`;
  }

  function render(all) {
    document.title = product.name + ' — купити в STEPZONE';
    SZ.qs('#crumbName').textContent = product.name;

    const off = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

    SZ.qs('#pdpRoot').innerHTML = `
      <div class="pdp">
        <div class="gallery">
          <div class="gallery__main"><img id="mainImg" src="${product.images[0]}" alt="${SZ.escape(product.name)}"></div>
          <div class="gallery__thumbs" id="thumbs">
            ${product.images.map((src, i) => `
              <button type="button" class="${i === 0 ? 'is-active' : ''}" data-i="${i}">
                <img src="${src}" alt="Фото ${i + 1}">
              </button>`).join('')}
          </div>
        </div>

        <div>
          <div class="pdp__brand">${SZ.escape(product.brand)}</div>
          <h1>${SZ.escape(product.name)}</h1>

          <div class="card__rating" style="margin-top:10px">
            <svg viewBox="0 0 24 24"><path d="M12 2l3 6.6 7 .9-5.2 4.8 1.4 7L12 17.9 5.8 21.3l1.4-7L2 9.5l7-.9z"/></svg>
            <b>${product.rating}</b> <span class="muted">· ${product.reviews} відгуків</span>
            <span class="muted">· ${SZ.CATEGORY_NAMES[product.category]}</span>
            <span class="muted">· ${SZ.GENDER_NAMES[product.gender]}</span>
          </div>

          <div class="pdp__price">
            <span class="price">${SZ.money(product.price)}</span>
            ${product.oldPrice ? `<span class="price--old">${SZ.money(product.oldPrice)}</span>
              <span class="tag tag--sale">-${off}%</span>` : ''}
          </div>

          <p class="muted">${SZ.escape(product.description)}</p>

          <div class="pdp__row">
            <b>Розмір (EU)</b>
            <a href="about.html#sizes">Таблиця розмірів</a>
          </div>
          <div class="sizes" id="sizeList">
            ${product.sizes.map(s => `<button class="size-chip" type="button" data-size="${s}">${s}</button>`).join('')}
          </div>
          <div class="small" id="sizeHint" style="color:var(--ink-3);margin-top:8px">Оберіть розмір, щоб додати в кошик</div>

          <div class="pdp__row"><b>Кількість</b></div>
          <div class="qty" id="qtyBox">
            <button type="button" data-q="-1" aria-label="Менше">−</button>
            <span id="qtyVal">1</span>
            <button type="button" data-q="1" aria-label="Більше">+</button>
          </div>

          <div class="pdp__actions">
            <button class="btn btn--accent btn--lg" type="button" id="addBtn">Додати в кошик</button>
            <button class="btn btn--ghost btn--lg" type="button" data-fav="${product.id}" id="favBtn" style="flex:0 0 auto;padding-inline:18px">
              ${SZ.Fav.has(product.id) ? '♥ В обраному' : '♡ В обране'}
            </button>
          </div>

          <ul class="pdp__list">
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span><b>100% оригінал.</b> Перевіряємо кожну пару, даємо чек і гарантію.</span></li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>Безкоштовна доставка від ${SZ.money(SZ.FREE_SHIPPING_FROM)} по Україні.</span></li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>Обмін розміру протягом 14 днів — за наш рахунок.</span></li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>На складі: ${product.stock} пар · відправка сьогодні до 17:00.</span></li>
          </ul>

          <div class="acc" style="margin-top:28px">
            <div class="acc__item is-open">
              <button class="acc__head" type="button">Характеристики <span>+</span></button>
              <div class="acc__body">
                <div class="spec">
                  ${Object.entries(product.specs).map(([k, v]) =>
                    `<div><span class="muted">${SZ.escape(k)}</span><span>${SZ.escape(v)}</span></div>`).join('')}
                  <div><span class="muted">Кольори</span><span>${SZ.escape(product.colors.join(', '))}</span></div>
                  <div><span class="muted">Артикул</span><span>${product.id.toUpperCase()}</span></div>
                </div>
              </div>
            </div>
            <div class="acc__item">
              <button class="acc__head" type="button">Доставка та оплата <span>+</span></button>
              <div class="acc__body">
                <p>Нова Пошта — 1–2 дні, ${SZ.money(SZ.SHIPPING_COST)} (безкоштовно від ${SZ.money(SZ.FREE_SHIPPING_FROM)}).<br>
                Кур'єр по Києву — день у день.<br>
                Оплата: карткою онлайн, Google/Apple Pay, накладений платіж або оплата частинами.</p>
              </div>
            </div>
            <div class="acc__item">
              <button class="acc__head" type="button">Обмін і повернення <span>+</span></button>
              <div class="acc__body">
                <p>14 днів на повернення без пояснень, якщо пара не була в носінні й збережено коробку. Обмін розміру — безкоштовний, доставку в обидва боки оплачуємо ми.</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    SZ.imgFallback(SZ.qs('#mainImg'), product.name, product.images);
    /* для кожної мініатюри запасними служать наступні файли того ж товару */
    SZ.qsa('#thumbs img').forEach((img, i) =>
      SZ.imgFallback(img, product.name, product.images.slice(i)));

    /* галерея */
    SZ.qs('#thumbs').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-i]');
      if (!btn) return;
      SZ.qsa('#thumbs button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      SZ.qs('#mainImg').src = product.images[btn.dataset.i];
    });

    /* розміри */
    SZ.qs('#sizeList').addEventListener('click', function (e) {
      const chip = e.target.closest('[data-size]');
      if (!chip) return;
      SZ.qsa('#sizeList .size-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      selectedSize = Number(chip.dataset.size);
      SZ.qs('#sizeHint').textContent = 'Обрано розмір ' + selectedSize + ' (EU)';
      SZ.qs('#sizeHint').style.color = 'var(--green)';
    });

    /* кількість */
    SZ.qs('#qtyBox').addEventListener('click', function (e) {
      const b = e.target.closest('[data-q]');
      if (!b) return;
      qty = Math.max(1, Math.min(10, qty + Number(b.dataset.q)));
      SZ.qs('#qtyVal').textContent = qty;
    });

    /* додавання в кошик — без перезавантаження */
    SZ.qs('#addBtn').addEventListener('click', function () {
      if (!selectedSize) {
        SZ.qs('#sizeHint').textContent = 'Спочатку оберіть розмір';
        SZ.qs('#sizeHint').style.color = 'var(--red)';
        SZ.qs('#sizeList').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      SZ.Cart.add(product, selectedSize, qty);
      SZ.toast(`Додано: ${product.name}, розмір ${selectedSize} × ${qty}`);
      SZ.openDrawer();
    });

    /* кнопка обраного (текст) */
    document.addEventListener('fav:change', function () {
      const b = SZ.qs('#favBtn');
      if (b) b.textContent = SZ.Fav.has(product.id) ? '♥ В обраному' : '♡ В обране';
    });

    /* схожі товари */
    const similar = all.filter(p =>
      p.id !== product.id && (p.category === product.category || p.brand === product.brand)
    ).sort((a, b) => (b.brand === product.brand) - (a.brand === product.brand)).slice(0, 4);
    SZ.renderProducts(SZ.qs('#similarGrid'), similar);

    /* нещодавно переглянуті */
    trackRecent(all);
  }

  function trackRecent(all) {
    let recent = SZ.Store.read('sz_recent_v1', []);
    recent = [product.id].concat(recent.filter(id => id !== product.id)).slice(0, 8);
    SZ.Store.write('sz_recent_v1', recent);

    const list = recent.filter(id => id !== product.id).map(id => all.find(p => p.id === id)).filter(Boolean).slice(0, 4);
    const box = SZ.qs('#recentBlock');
    if (!box) return;
    if (!list.length) { box.hidden = true; return; }
    box.hidden = false;
    SZ.renderProducts(SZ.qs('#recentGrid'), list);
  }
})();
