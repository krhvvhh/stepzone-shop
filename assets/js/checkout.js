/* STEPZONE — оформлення замовлення */
(function () {
  'use strict';

  let root;

  document.addEventListener('DOMContentLoaded', function () {
    root = SZ.qs('#checkoutRoot');

    if (!SZ.Cart.items().length) { renderEmpty(); return; }

    renderForm();
    renderSummary();
    document.addEventListener('cart:change', function () {
      if (SZ.Cart.items().length) renderSummary();
    });
  });

  /* ---------- Порожній кошик ---------- */
  function renderEmpty() {
    root.innerHTML = `<div class="empty">
      <div class="empty__ic">🧾</div>
      <h2>Немає що оформлювати</h2>
      <p class="muted">Спочатку додайте кросівки в кошик.</p>
      <a class="btn btn--primary btn--lg" href="catalog.html" style="margin-top:14px">До каталогу</a>
    </div>`;
  }

  /* ---------- Форма ---------- */
  function renderForm() {
    const saved = SZ.Store.read('sz_customer_v1', {});

    root.innerHTML = `
      <div class="checkout">
        <form id="orderForm" novalidate>

          <div class="fieldset">
            <h3>1. Контактні дані</h3>
            <p>Щоб ми могли підтвердити замовлення</p>
            <div class="form-grid">
              <div class="field">
                <label for="firstName">Ім'я *</label>
                <input id="firstName" name="firstName" type="text" value="${esc(saved.firstName)}" placeholder="Олеся" required>
                <span class="err">Вкажіть ім'я</span>
              </div>
              <div class="field">
                <label for="lastName">Прізвище *</label>
                <input id="lastName" name="lastName" type="text" value="${esc(saved.lastName)}" placeholder="Рудик" required>
                <span class="err">Вкажіть прізвище</span>
              </div>
              <div class="field">
                <label for="phone">Телефон *</label>
                <input id="phone" name="phone" type="tel" value="${esc(saved.phone)}" placeholder="+380 (__) ___-__-__" required>
                <span class="err">Формат: +380XXXXXXXXX</span>
              </div>
              <div class="field">
                <label for="email">Email *</label>
                <input id="email" name="email" type="email" value="${esc(saved.email)}" placeholder="you@mail.com" required>
                <span class="err">Некоректна пошта</span>
              </div>
            </div>
          </div>

          <div class="fieldset">
            <h3>2. Доставка</h3>
            <p>По Україні відправляємо щодня до 17:00</p>
            <div class="radio-cards">
              <label class="radio-card">
                <input type="radio" name="delivery" value="np-branch" checked>
                <span><b>Нова Пошта — відділення</b><span>1–2 дні · за тарифами перевізника</span></span>
                <em>${SZ.money(SZ.SHIPPING_COST)}</em>
              </label>
              <label class="radio-card">
                <input type="radio" name="delivery" value="np-courier">
                <span><b>Нова Пошта — кур'єр до дверей</b><span>1–2 дні · по всій Україні</span></span>
                <em>${SZ.money(SZ.SHIPPING_COST + 60)}</em>
              </label>
              <label class="radio-card">
                <input type="radio" name="delivery" value="kyiv-courier">
                <span><b>Кур'єр по Києву</b><span>Сьогодні або завтра, у зручний час</span></span>
                <em>${SZ.money(150)}</em>
              </label>
              <label class="radio-card">
                <input type="radio" name="delivery" value="pickup">
                <span><b>Самовивіз</b><span>Київ, вул. Хрещатик 22 · щодня 10:00–20:00</span></span>
                <em>0 ₴</em>
              </label>
            </div>

            <div class="form-grid" id="addressBlock">
              <div class="field">
                <label for="city">Місто *</label>
                <input id="city" name="city" type="text" value="${esc(saved.city)}" placeholder="Київ" required>
                <span class="err">Вкажіть місто</span>
              </div>
              <div class="field">
                <label for="address" id="addressLabel">Відділення / адреса *</label>
                <input id="address" name="address" type="text" value="${esc(saved.address)}" placeholder="Відділення №15" required>
                <span class="err">Вкажіть відділення або адресу</span>
              </div>
            </div>
          </div>

          <div class="fieldset">
            <h3>3. Оплата</h3>
            <p>Всі способи безпечні, дані картки ми не зберігаємо</p>
            <div class="radio-cards">
              <label class="radio-card">
                <input type="radio" name="payment" value="card" checked>
                <span><b>Карткою онлайн</b><span>Visa / Mastercard · Apple Pay · Google Pay</span></span>
              </label>
              <label class="radio-card">
                <input type="radio" name="payment" value="cod">
                <span><b>Накладений платіж</b><span>Оплата при отриманні + комісія перевізника</span></span>
              </label>
              <label class="radio-card">
                <input type="radio" name="payment" value="parts">
                <span><b>Оплата частинами</b><span>monobank / ПриватБанк — до 6 платежів</span></span>
              </label>
            </div>
          </div>

          <div class="fieldset">
            <h3>4. Коментар до замовлення</h3>
            <div class="form-grid">
              <div class="field field--full">
                <label for="comment">Побажання (не обов'язково)</label>
                <textarea id="comment" name="comment" placeholder="Наприклад: подзвоніть після 18:00"></textarea>
              </div>
              <div class="field field--full">
                <label class="check" style="font-size:14.5px">
                  <input type="checkbox" id="agree" checked>
                  Погоджуюсь з умовами обміну та обробкою персональних даних
                </label>
              </div>
            </div>
          </div>
        </form>

        <aside class="summary" id="checkoutSummary"></aside>
      </div>`;

    /* адресні поля залежать від способу доставки */
    root.addEventListener('change', function (e) {
      if (e.target.name === 'delivery') {
        const v = e.target.value;
        const block = SZ.qs('#addressBlock');
        const label = SZ.qs('#addressLabel');
        const addr = SZ.qs('#address');
        block.style.display = v === 'pickup' ? 'none' : '';
        if (v === 'np-branch') { label.textContent = 'Відділення Нової Пошти *'; addr.placeholder = 'Відділення №15'; }
        if (v === 'np-courier' || v === 'kyiv-courier') { label.textContent = 'Адреса доставки *'; addr.placeholder = 'вул. Хрещатик, 22, кв. 5'; }
        renderSummary();
      }
      if (e.target.name === 'payment') renderSummary();
    });

    /* прибираємо помилку під час вводу */
    root.addEventListener('input', function (e) {
      const f = e.target.closest('.field');
      if (f) f.classList.remove('has-error');
    });

    SZ.qs('#orderForm').addEventListener('submit', submit);
  }

  function esc(v) { return v ? SZ.escape(v) : ''; }

  /* ---------- Підсумок ---------- */
  function deliveryPrice() {
    const v = (SZ.qs('input[name="delivery"]:checked') || {}).value || 'np-branch';
    const t = SZ.Cart.totals();
    if (v === 'pickup') return 0;
    if (v === 'kyiv-courier') return 150;
    const base = v === 'np-courier' ? SZ.SHIPPING_COST + 60 : SZ.SHIPPING_COST;
    return (t.sub - t.discount) >= SZ.FREE_SHIPPING_FROM ? 0 : base;
  }

  function renderSummary() {
    const box = SZ.qs('#checkoutSummary');
    if (!box) return;
    const items = SZ.Cart.items();
    const t = SZ.Cart.totals();
    const ship = deliveryPrice();
    const total = Math.max(0, t.sub - t.discount + ship);

    box.innerHTML = `
      <h3>Ваше замовлення</h3>
      <div style="max-height:280px;overflow:auto;margin-bottom:8px">
        ${items.map(i => `
          <div class="mini-item">
            <img src="${i.image}" alt="" data-fallback="${SZ.escape(i.fallback || '')}" data-fb-title="${SZ.escape(i.name)}">
            <span><b>${SZ.escape(i.name)}</b><span>розмір ${i.size} · ${i.qty} шт.</span></span>
            <strong>${SZ.money(i.price * i.qty)}</strong>
          </div>`).join('')}
      </div>
      <div class="srow"><span>Товари</span><b>${SZ.money(t.sub)}</b></div>
      ${t.discount ? `<div class="srow"><span>Знижка ${t.promo.code}</span><b style="color:var(--accent)">−${SZ.money(t.discount)}</b></div>` : ''}
      <div class="srow"><span>Доставка</span><b>${ship ? SZ.money(ship) : 'Безкоштовно'}</b></div>
      <div class="srow srow--total"><span>До сплати</span><b>${SZ.money(total)}</b></div>
      <button class="btn btn--accent btn--block btn--lg" type="submit" form="orderForm" style="margin-top:16px">
        Підтвердити замовлення
      </button>
      <a class="btn btn--ghost btn--block" href="cart.html" style="margin-top:10px">Повернутись у кошик</a>
      <div class="note">Натискаючи кнопку, ви погоджуєтесь з умовами магазину</div>`;
  }

  /* ---------- Валідація і відправка ---------- */
  function submit(e) {
    e.preventDefault();
    const form = e.target;
    const delivery = form.delivery.value;
    let ok = true;

    const rules = [
      { id: 'firstName', test: v => v.trim().length >= 2 },
      { id: 'lastName',  test: v => v.trim().length >= 2 },
      { id: 'phone',     test: v => /^\+?3?8?0\d{9}$/.test(v.replace(/[\s()\-]/g, '')) },
      { id: 'email',     test: v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) }
    ];
    if (delivery !== 'pickup') {
      rules.push({ id: 'city', test: v => v.trim().length >= 2 });
      rules.push({ id: 'address', test: v => v.trim().length >= 3 });
    }

    let firstBad = null;
    rules.forEach(function (r) {
      const input = SZ.qs('#' + r.id);
      const field = input.closest('.field');
      const valid = r.test(input.value);
      field.classList.toggle('has-error', !valid);
      if (!valid) { ok = false; if (!firstBad) firstBad = input; }
    });

    if (!SZ.qs('#agree').checked) {
      ok = false;
      SZ.toast('Потрібно погодитись з умовами магазину');
    }

    if (!ok) {
      if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }

    /* Формуємо замовлення */
    const t = SZ.Cart.totals();
    const ship = deliveryPrice();
    const order = {
      number: 'SZ-' + Math.floor(100000 + Math.random() * 899999),
      date: new Date().toISOString(),
      customer: {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        city: form.city.value.trim(),
        address: form.address.value.trim()
      },
      delivery: delivery,
      payment: form.payment.value,
      comment: form.comment.value.trim(),
      items: SZ.Cart.items(),
      subtotal: t.sub,
      discount: t.discount,
      shipping: ship,
      total: Math.max(0, t.sub - t.discount + ship)
    };

    /* Зберігаємо дані покупця й історію замовлень */
    SZ.Store.write('sz_customer_v1', order.customer);
    const history = SZ.Store.read('sz_orders_v1', []);
    history.unshift({ number: order.number, date: order.date, total: order.total, count: order.items.length });
    SZ.Store.write('sz_orders_v1', history.slice(0, 10));

    /* Очищаємо кошик і промокод */
    SZ.Cart.clear();
    SZ.Cart.clearPromo();

    renderSuccess(order);
  }

  /* ---------- Успіх ---------- */
  function renderSuccess(order) {
    const DELIVERY_NAMES = {
      'np-branch': 'Нова Пошта, відділення',
      'np-courier': "Нова Пошта, кур'єр",
      'kyiv-courier': "Кур'єр по Києву",
      'pickup': 'Самовивіз, Київ, Хрещатик 22'
    };
    const PAYMENT_NAMES = { card: 'Карткою онлайн', cod: 'Накладений платіж', parts: 'Оплата частинами' };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    root.innerHTML = `
      <div class="success">
        <div class="success__ic"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></div>
        <h1 style="font-size:clamp(28px,4vw,42px)">Замовлення прийнято!</h1>
        <p class="muted">Номер замовлення <b style="color:var(--ink)">${order.number}</b>.
        Ми зателефонуємо на ${SZ.escape(order.customer.phone)} протягом 15 хвилин, щоб підтвердити деталі.</p>

        <div class="fieldset" style="text-align:left;margin-top:26px">
          <div class="srow"><span>Отримувач</span><b>${SZ.escape(order.customer.firstName + ' ' + order.customer.lastName)}</b></div>
          <div class="srow"><span>Доставка</span><b>${DELIVERY_NAMES[order.delivery]}</b></div>
          ${order.delivery !== 'pickup' ? `<div class="srow"><span>Адреса</span><b>${SZ.escape(order.customer.city + ', ' + order.customer.address)}</b></div>` : ''}
          <div class="srow"><span>Оплата</span><b>${PAYMENT_NAMES[order.payment]}</b></div>
          <div class="srow"><span>Товарів</span><b>${order.items.reduce((s, i) => s + i.qty, 0)} шт.</b></div>
          ${order.discount ? `<div class="srow"><span>Знижка</span><b style="color:var(--accent)">−${SZ.money(order.discount)}</b></div>` : ''}
          <div class="srow srow--total"><span>Сума</span><b>${SZ.money(order.total)}</b></div>
        </div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:22px">
          <a class="btn btn--primary btn--lg" href="catalog.html">Продовжити покупки</a>
          <a class="btn btn--ghost btn--lg" href="index.html">На головну</a>
        </div>
        <p class="note" style="margin-top:20px">Копію замовлення надіслано на ${SZ.escape(order.customer.email)}</p>
      </div>`;

    SZ.toast('Кошик очищено, замовлення ' + order.number + ' створено', { time: 4000 });
  }
})();
