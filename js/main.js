/* ============================================================
   HERO — ФОНОВЫЙ СЛАЙДЕР
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const heroSlider = document.getElementById('heroSlider');
  const heroDots = document.getElementById('heroDots');

  // Количество фото в папке img/production/
  // ⚠️ ИЗМЕНИТЕ НА СВОЁ КОЛИЧЕСТВО ФАЙЛОВ
  const productionCount = 10;

  let currentHero = 0;
  let heroInterval;

  // Генерируем слайды
  for (let i = 1; i <= productionCount; i++) {
    const num = String(i).padStart(3, '0');
    const slide = document.createElement('div');
    slide.className = 'hero__slide' + (i === 1 ? ' active' : '');
    slide.style.backgroundImage = `url('img/production/${num}.jpg')`;
    heroSlider.appendChild(slide);

    // Точка
    const dot = document.createElement('span');
    dot.dataset.index = i - 1;
    if (i === 1) dot.classList.add('active');
    dot.addEventListener('click', function () {
      goToHero(parseInt(this.dataset.index));
    });
    heroDots.appendChild(dot);
  }

  function goToHero(index) {
    const slides = heroSlider.querySelectorAll('.hero__slide');
    const dots = heroDots.querySelectorAll('span');
    slides.forEach((el, i) => el.classList.toggle('active', i === index));
    dots.forEach((el, i) => el.classList.toggle('active', i === index));
    currentHero = index;
  }

  function nextHero() {
    const total = heroSlider.querySelectorAll('.hero__slide').length;
    goToHero((currentHero + 1) % total);
  }

  // Автопрокрутка
  function startHeroAuto() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(nextHero, 4500);
  }

  // Пауза при наведении (для десктопа)
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mouseenter', function () {
      if (heroInterval) clearInterval(heroInterval);
    });
    hero.addEventListener('mouseleave', startHeroAuto);
  }

  startHeroAuto();

  /* ============================================================
       ПОРТФОЛИО — КАРУСЕЛЬ С ТОВАРАМИ
       ============================================================ */
  const track = document.getElementById('productTrack');
  const prevBtn = document.getElementById('productPrev');
  const nextBtn = document.getElementById('productNext');
  const dotsContainer = document.getElementById('productDots');

  // Проверка, что элементы существуют
  if (!track || !prevBtn || !nextBtn || !dotsContainer) {
    console.error('Элементы карусели не найдены! Проверьте id в HTML.');
    return;
  }

  // ⚠️ ЗАПОЛНИТЕ РЕАЛЬНЫМИ ДАННЫМИ
  const products = [
    {
      name: 'Стол "Альфа"',
      image: '001.jpg',
      specs: [
        'Каркас: сталь 3 мм, порошковая покраска',
        'Сиденье: лиственница (сорт АВ)',
        'Размеры: 1800 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    {
      name: 'Клумба "Цветочник"',
      image: '002.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска RAL 7016',
        'Ёмкость: оцинкованное съёмное ведро 44 л',
        'Размеры: 395 × 395 × 785 мм',
      ],
      note: 'Возможен выбор цвета из палитры RAL',
    },
    {
      name: 'Скамейка "Бета"',
      image: '003.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска',
        'Сиденье: ДПК (композит)',
        'Размеры: 2000 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    {
      name: 'Комплект "Ультра"',
      image: '004.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска',
        'Сиденье: ДПК (композит)',
        'Размеры: 2000 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    {
      name: 'Комплект "Париж"',
      image: '005.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска',
        'Сиденье: ДПК (композит)',
        'Размеры: 2000 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    {
      name: 'Урна "Ветер"',
      image: '006.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска',
        'Сиденье: ДПК (композит)',
        'Размеры: 2000 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    {
      name: 'Клумба "Кустик"',
      image: '007.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска',
        'Сиденье: ДПК (композит)',
        'Размеры: 2000 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    {
      name: 'Шезлонг "Ярило"',
      image: '008.jpg',
      specs: [
        'Каркас: сталь, порошковая покраска',
        'Сиденье: ДПК (композит)',
        'Размеры: 2000 × 600 × 800 мм',
      ],
      note: 'Конечный цвет и материал согласуются с заказчиком',
    },
    // Добавьте остальные товары до 10 штук
  ];

  let currentProduct = 0;

  function renderProducts() {
    track.innerHTML = '';
    products.forEach((p, index) => {
      const slide = document.createElement('div');
      slide.className = 'portfolio__slide';

      const img = document.createElement('img');
      img.className = 'portfolio__slide-image';
      img.src = `img/products/${p.image}`;
      img.alt = p.name;
      img.loading = 'lazy';

      const info = document.createElement('div');
      info.className = 'portfolio__slide-info';

      const title = document.createElement('h3');
      title.className = 'portfolio__slide-title';
      title.textContent = p.name;

      const desc = document.createElement('div');
      desc.className = 'portfolio__slide-desc';
      p.specs.forEach((s) => {
        const pEl = document.createElement('p');
        pEl.innerHTML = `<span class="label">•</span> ${s}`;
        desc.appendChild(pEl);
      });
      if (p.note) {
        const note = document.createElement('p');
        note.style.marginTop = '8px';
        note.style.fontStyle = 'italic';
        note.style.color = '#5f6368';
        note.textContent = p.note;
        desc.appendChild(note);
      }

      info.appendChild(title);
      info.appendChild(desc);

      slide.appendChild(img);
      slide.appendChild(info);
      track.appendChild(slide);
    });

    dotsContainer.innerHTML = '';
    products.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.dataset.index = i;
      dot.addEventListener('click', function () {
        goToProduct(parseInt(this.dataset.index));
      });
      dotsContainer.appendChild(dot);
    });

    updateProductSlider();
  }

  function updateProductSlider() {
    const slides = track.querySelectorAll('.portfolio__slide');
    const dots = dotsContainer.querySelectorAll('span');
    if (slides.length === 0) return;
    const offset = -currentProduct * 100;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((el, i) => el.classList.toggle('active', i === currentProduct));
  }

  function goToProduct(index) {
    if (index < 0) index = products.length - 1;
    if (index >= products.length) index = 0;
    currentProduct = index;
    updateProductSlider();
  }

  prevBtn.addEventListener('click', () => goToProduct(currentProduct - 1));
  nextBtn.addEventListener('click', () => goToProduct(currentProduct + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToProduct(currentProduct - 1);
    if (e.key === 'ArrowRight') goToProduct(currentProduct + 1);
  });

  renderProducts();
});
