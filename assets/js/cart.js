/* STEPZONE — сторінка кошика */
(function () {
  'use strict';

  let root;

  document.addEventListener('DOMContentLoaded', function () {
    root = SZ.qs('#cartRoot');
    render();
    document.addEventListener('cart:change', render);

    /* усі кліки — через делегування, бо вміст перемальовується */
    root.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-act]');
      if (btn) {
        const { id, size, act } = btn.dataset;
        const item = SZ.Cart.items().find(i => i.id === id && String(i.size) === String(size));
        if (!item) return;
        if (act === 'inc') SZ.Cart.setQty(id, item.size, item.qty + 1);
        if (act === 'dec') SZ.Cart.setQty(id, item.size, item.qty - 1);
        if (act === 'del') { SZ.Cart.remove(id, item.size); SZ.toast('Товар видалено з кошика'); }
        return;
      }
      if (e.target.closest('#promoDrop')) { SZ.Cart.clearPromo(); SZ.toast('Промокод скасовано'); return; }
      if (e.target.closest('#clearCart')) {
        if (!SZ.Cart.items().length) return;
        SZ.Cart.clear(); SZ.Cart.clearPromo(); SZ.toast('Кошик очищено');
      }
    });

    root.addEventListener('submit', function (e) {
      if (!e.target.closest('#promoForm')) return;
      e.preventDefault();
      const input = SZ.qs('#promoInput');
      const rule = SZ.Cart.applyPromo(input.value);
      if (rule) { SZ.toast('Промокод застосовано: ' + rule.label); input.value = ''; }
      else { SZ.toast('Такого промокоду не існує'); }
    });
  });

  function render() {
    const items = SZ.Cart.items();

    if (!items.length) {
      root.innerHTML = `
        <div class="empty">
          <div class="empty__ic">🛒</div>
          <h2>У кошику поки порожньо</h2>
          <p class="muted">Оберіть пару з каталогу — гарні розміри розбирають швидко.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">
            <a class="btn btn--primary btn--lg" href="catalog.html">Перейти до каталогу</a>
            <a class="btn btn--ghost btn--lg" href="catalog.html?badge=sale">Дивитись знижки</a>
          </div>
        </div>
        <section class="section section--tight">
          <div class="shead"><h2>Може зацікавити</h2></div>
          <div class="grid-products" id="recoGrid"></div>
        </section>`;
      SZ.getProducts().then(list => {
        const g = SZ.qs('#recoGrid');
        if (g) SZ.renderProducts(g, list.filter(p => p.popular).slice(0, 4));
      });
      return;
    }

    const t = SZ.Cart.totals();
    const left = Math.max(0, SZ.FREE_SHIPPING_FROM - (t.sub - t.discount));
    const pct = Math.min(100, ((t.sub - t.discount) / SZ.FREE_SHIPPING_FROM) * 100);

    root.innerHTML = `
      <div class="cart-layout">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px">
            <span class="muted">${SZ.Cart.count()} шт. у кошику</span>
            <button class="link-del" type="button" id="clearCart">✕ Очистити кошик</button>
          </div>

          ${items.map(i => `
            <div class="cart-item">
              <div class="cart-item__img">
                <img src="${i.image}" alt="" data-fallback="${SZ.escape(i.fallback || '')}" data-fb-title="${SZ.escape(i.name)}">
              </div>
              <div>
                <div class="cart-item__name"><a href="product.html?id=${i.id}">${SZ.escape(i.name)}</a></div>
                <div class="cart-item__opts">${SZ.escape(i.brand)} · розмір ${i.size} (EU)</div>
                <div class="cart-item__bottom">
                  <div class="qty">
                    <button type="button" data-act="dec" data-id="${i.id}" data-size="${i.size}" aria-label="Менше">−</button>
                    <span>${i.qty}</span>
                    <button type="button" data-act="inc" data-id="${i.id}" data-size="${i.size}" aria-label="Більше">+</button>
                  </div>
                  <span class="muted small">${SZ.money(i.price)} / шт.</span>
                  <button class="link-del" type="button" data-act="del" data-id="${i.id}" data-size="${i.size}">✕ Видалити</button>
                </div>
              </div>
              <div class="cart-item__right"><b style="font-size:18px">${SZ.money(i.price * i.qty)}</b></div>
            </div>`).join('')}
        </div>

        <aside class="summary">
          <h3>Разом</h3>
          <div class="progress-ship">
            ${left > 0
              ? `Додайте ще <b>${SZ.money(left)}</b> — і доставка стане безкоштовною`
              : `<b style="color:var(--green)">Доставка безкоштовна ✓</b>`}
            <div class="bar"><i style="width:${pct}%"></i></div>
          </div>

          <div class="srow"><span>Товари (${SZ.Cart.count()} шт.)</span><b>${SZ.money(t.sub)}</b></div>
          ${t.discount ? `<div class="srow"><span>Знижка · ${t.promo.code}
              <button id="promoDrop" type="button" style="color:var(--ink-3);text-decoration:underline;font-size:12px">скасувати</button></span>
            <b style="color:var(--accent)">−${SZ.money(t.discount)}</b></div>` : ''}
          <div class="srow"><span>Доставка</span><b>${t.ship ? SZ.money(t.ship) : 'Безкоштовно'}</b></div>
          <div class="srow srow--total"><span>До сплати</span><b>${SZ.money(t.total)}</b></div>

          ${!t.promo ? `
          <form class="promo" id="promoForm">
            <input type="text" id="promoInput" placeholder="Промокод" aria-label="Промокод">
            <button class="btn btn--ghost" type="submit">OK</button>
          </form>
          <div class="note">Спробуйте: <b>STEP10</b> · <b>ZONE15</b> · <b>FIRST300</b></div>` : ''}

          <a class="btn btn--accent btn--block btn--lg" href="checkout.html" style="margin-top:16px">Оформити замовлення</a>
          <a class="btn btn--ghost btn--block" href="catalog.html" style="margin-top:10px">Продовжити покупки</a>
          <div class="note">Оплата карткою, Apple Pay, Google Pay або при отриманні</div>
        </aside>
      </div>`;
  }
})();
