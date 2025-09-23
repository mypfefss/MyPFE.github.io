// Smooth scrolling and mobile nav
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navList = nav.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  const expanded = navList.style.display === 'block';
  navList.style.display = expanded ? '' : 'block';
  navToggle.setAttribute('aria-expanded', String(!expanded));
});

// Smooth scroll with offset for sticky header
const header = document.getElementById('header');
const headerHeight = () => header.getBoundingClientRect().height || 72;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 12;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile
      if (window.innerWidth <= 900) navList.style.display = '';
    }
  });
});

// Active link on scroll
const sections = Array.from(document.querySelectorAll('main section[id]'));
const links = Array.from(document.querySelectorAll('.nav-list a'));

function onScroll(){
  const scrollPos = window.pageYOffset + headerHeight() + 20;
  let current = sections[0];
  for (const sec of sections){
    if (sec.offsetTop <= scrollPos) current = sec;
  }
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current.id}`));
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
onScroll();

// Simple contact form handler (no backend)
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  if (!name || !email) return;
  form.querySelector('button').textContent = 'Submitted';
  form.reset();
  setTimeout(() => form.querySelector('button').textContent = 'Submit', 2000);
});
