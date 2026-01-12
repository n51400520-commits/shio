// Планеталар массиві
const planets = [
  { id: 'mercury', name: 'Меркурий', img: 'assets/mercury.png', projectId: 'p1' },
  { id: 'venus',   name: 'Шолпан',   img: 'assets/venus.png',   projectId: 'p2' },
  { id: 'earth',   name: 'Жер',      img: 'assets/earth.png',   projectId: 'p3' },
  { id: 'mars',    name: 'Марс',     img: 'assets/mars.png',    projectId: 'p4' },
];

// Жобалар массиві
const projects = [
  { id: 'p1', title: 'Фронтенд — UI Kit', category: 'frontend', desc: 'Компоненттер кітапханасы, адаптивті дизайн.' },
  { id: 'p2', title: 'Дизайн — Брендинг', category: 'design',   desc: 'Логотип, түстер палитрасы, гайдлайн.' },
  { id: 'p3', title: 'Фронтенд — SPA',    category: 'frontend', desc: 'Маршрутизация, күйді басқару, API.' },
  { id: 'p4', title: 'Ойындар — Mini Game', category: 'games',  desc: 'Canvas, анимациялар, физика.' },
];

// Карусель рендер
const track = document.getElementById('carouselTrack');
function renderPlanets() {
  track.innerHTML = '';
  planets.forEach(p => {
    const item = document.createElement('button');
    item.className = 'planet';
    item.setAttribute('data-project', p.projectId);
    item.innerHTML = `<img src="${p.img}" alt="${p.name}" /><span>${p.name}</span>`;
    item.addEventListener('click', () => openProjectModal(p.projectId));
    track.appendChild(item);
  });
  // Клонируем для бесконечности
  planets.forEach(p => {
    const clone = track.querySelector(`.planet[data-project="${p.projectId}"]`).cloneNode(true);
    track.appendChild(clone);
  });
  // Автопрокрутка
  let offset = 0;
  function tick() {
    offset += 0.3;
    track.scrollLeft = offset;
    if (offset >= track.scrollWidth / 2) offset = 0;
    requestAnimationFrame(tick);
  }
  tick();
}
renderPlanets();

// Карточкалар рендер
const cards = document.getElementById('projectCards');
function renderCards(list) {
  cards.innerHTML = '';
  list.forEach(pr => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-category', pr.category);
    card.innerHTML = `
      <h3>${pr.title}</h3>
      <div class="meta">${pr.category}</div>
      <p>${pr.desc}</p>
      <button data-open="${pr.id}">Толығырақ</button>
    `;
    card.querySelector(`[data-open="${pr.id}"]`).addEventListener('click', () => openProjectModal(pr.id));
    cards.appendChild(card);
  });
}
renderCards(projects);

// Фильтр батырмалары
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
    renderCards(filtered);
  });
});

// Модалка
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
document.getElementById('modalClose').addEventListener('click', () => modal.close());

function openProjectModal(projectId) {
  const pr = projects.find(p => p.id === projectId);
  if (!pr) return;
  modalTitle.textContent = pr.title;
  modalDesc.textContent = pr.desc;
  if (document.startViewTransition) {
    document.startViewTransition(() => modal.showModal());
  } else {
    modal.showModal();
  }
}

// Параллакс эффект жұлдыздарға
const layers = document.querySelectorAll('.layer');
document.addEventListener('mousemove', (e) => {
  const { innerWidth: w, innerHeight: h } = window;
  const x = (e.clientX / w - 0.5) * 2;
  const y = (e.clientY / h - 0.5) * 2;
  layers.forEach((layer, i) => {
    const depth = (i + 1) * 4;
    layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
