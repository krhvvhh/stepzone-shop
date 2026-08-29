/* STEPZONE — головна сторінка */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const hits = SZ.qs('#hitsGrid');
    const news = SZ.qs('#newGrid');
    const sale = SZ.qs('#saleGrid');
    const cats = SZ.qs('#catsGrid');

    if (hits) SZ.skeletons(hits, 4);
    if (news) SZ.skeletons(news, 4);
    if (sale) SZ.skeletons(sale, 4);

    SZ.getData().then(function (data) {
      const list = data.products;

      /* Хіти продажів */
      if (hits) {
        SZ.renderProducts(hits, list.filter(p => p.popular).slice(0, 8));
      }

      /* Новинки — за датою надходження */
      if (news) {
        const sorted = list.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        SZ.renderProducts(news, sorted.slice(0, 4));
      }

      /* Знижки */
      if (sale) {
        const discounted = list.filter(p => p.oldPrice)
          .sort((a, b) => (1 - a.price / a.oldPrice) < (1 - b.price / b.oldPrice) ? 1 : -1);
        SZ.renderProducts(sale, discounted.slice(0, 4));
      }

      /* Категорії */
      if (cats) {
        const covers = {
          lifestyle: list.find(p => p.category === 'lifestyle'),
          running: list.find(p => p.category === 'running'),
          retro: list.find(p => p.category === 'retro'),
          basketball: list.find(p => p.category === 'basketball'),
          training: list.find(p => p.category === 'training'),
          trail: list.find(p => p.category === 'trail')
        };
        cats.innerHTML = data.categories.map(function (c) {
          const cover = covers[c.id];
          const count = list.filter(p => p.category === c.id).length;
          return `<a class="cat reveal" href="catalog.html?cat=${c.id}">
              <img src="${cover ? cover.images[0] : ''}" alt="${c.name}" loading="lazy"
                   data-fallback="${cover ? SZ.escape(cover.images.slice(1).join('|')) : ''}"
                   data-fb-title="${SZ.escape(c.name)}">
              <div class="cat__body"><b>${c.name}</b><span>${c.desc} · ${count} моделей</span></div>
            </a>`;
        }).join('');
        SZ.observeReveal(cats);
      }

      /* Лічильник у герої */
      const cnt = SZ.qs('#heroCount');
      if (cnt) cnt.textContent = list.length * 4;

      /* Фото в герої — беремо перший хіт */
      const heroImg = SZ.qs('#heroImg');
      if (heroImg) {
        const star = list.find(p => p.id === 'nike-dunk-low-panda') || list[0];
        heroImg.src = star.images[0];
        SZ.imgFallback(heroImg, star.name, star.images);
        const tag = SZ.qs('#heroTag');
        if (tag) tag.innerHTML = `<b>${SZ.escape(star.name)}</b><span>${SZ.money(star.price)}</span>`;
        const link = SZ.qs('#heroLink');
        if (link) link.href = 'product.html?id=' + star.id;
      }
    });
  });
})();
