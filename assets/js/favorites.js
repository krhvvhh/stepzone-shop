/* STEPZONE — сторінка «Обране» */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const grid = SZ.qs('#favGrid');
    SZ.skeletons(grid, 4);

    SZ.getProducts().then(function (all) {
      function draw() {
        const ids = SZ.Fav.items();
        const list = ids.map(id => all.find(p => p.id === id)).filter(Boolean);
        SZ.qs('#favCount').textContent = list.length ? list.length + ' моделей у списку' : '';

        if (!list.length) {
          grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
            <div class="empty__ic">♡</div>
            <h3>Тут поки порожньо</h3>
            <p class="muted">Тисніть на сердечко на картці товару — і пара збережеться сюди.</p>
            <a class="btn btn--primary" href="catalog.html" style="margin-top:14px">До каталогу</a>
          </div>`;
          return;
        }
        SZ.renderProducts(grid, list);
      }

      draw();
      document.addEventListener('fav:change', draw);
    });
  });
})();
