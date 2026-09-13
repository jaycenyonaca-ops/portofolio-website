/* ============ CUSTOM CURSOR ============ */
const cursor = document.getElementById('cursor');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cx += (mx - cx) * 0.2;
  cy += (my - cy) * 0.2;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project, .skill').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ============ NAV SCROLL ============ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeMobileMenu() {
  nav.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Buka navigasi');
}

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============ LIVE TIME ============ */
const navTime = document.getElementById('navTime');
function updateTime() {
  const now = new Date();
  const opts = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta'
  };
  navTime.textContent = 'WIB ' + now.toLocaleTimeString('en-GB', opts);
}
updateTime();
setInterval(updateTime, 1000);

/* ============ REVEAL ON SCROLL ============ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ============ COUNTER ANIMATION ============ */
const stats = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text);
      if (!isNaN(num) && num > 0) {
        let current = 0;
        const step = Math.max(1, Math.ceil(num / 40));
        const suffix = text.replace(/[0-9]/g, '');
        const timer = setInterval(() => {
          current += step;
          if (current >= num) {
            current = num;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

stats.forEach(s => statObserver.observe(s));