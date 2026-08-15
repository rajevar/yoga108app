(function () {
  var screenGrid = document.querySelector('.screen-grid');
  if (screenGrid) {
    screenGrid.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      screenGrid.scrollLeft += e.deltaY;
    }, { passive: false });
  }

  var figures = Array.prototype.slice.call(document.querySelectorAll('.screen-grid figure'));
  var lightbox = document.getElementById('lightbox');
  var img = document.getElementById('lightboxImg');
  var counter = document.getElementById('lightboxCounter');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  if (!figures.length || !lightbox) return;

  var current = 0;
  var wheelLocked = false;
  var lastFocused = null;

  function render() {
    var source = figures[current].querySelector('img');
    img.src = source.src;
    img.alt = source.alt;
    counter.textContent = (current + 1) + ' / ' + figures.length;
  }

  function open(index) {
    current = index;
    lastFocused = document.activeElement;
    render();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function next() {
    current = (current + 1) % figures.length;
    render();
  }

  function prev() {
    current = (current - 1 + figures.length) % figures.length;
    render();
  }

  figures.forEach(function (figure, index) {
    figure.addEventListener('click', function () { open(index); });
    figure.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  lightbox.addEventListener('wheel', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    e.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;
    if (e.deltaY > 0) next(); else prev();
    setTimeout(function () { wheelLocked = false; }, 320);
  }, { passive: false });
})();
