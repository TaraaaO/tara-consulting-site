// shared.js — injects nav and footer, handles mobile menu, marks active page

(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  function activeIf(names) {
    return names.includes(page) ? ' class="active-page"' : '';
  }

  const headerHTML = `
  <header>
    <div class="container header-inner">
      <a href="index.html" class="logo"><span class="dot"></span>Tara Consulting Co</a>
      <nav>
        <a class="nav-link"${activeIf(['index.html',''])} href="index.html">Home</a>
        <a class="nav-link"${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
        <a class="nav-link"${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
        <a class="nav-link"${activeIf(['blog.html'])} href="blog.html">Blog</a>
        <a class="nav-link"${activeIf(['about.html'])} href="about.html">About</a>
        <a class="nav-portal" href="https://zippy-biscotti-636466.netlify.app">Client Portal →</a>
        <a class="nav-cta" href="index.html#contact">Book a Call</a>
      </nav>
      <button class="menu-toggle" id="menu-toggle" aria-expanded="false">Menu</button>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
      <a${activeIf(['index.html',''])} href="index.html">Home</a>
      <a${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
      <a${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
      <a${activeIf(['blog.html'])} href="blog.html">Blog</a>
      <a${activeIf(['about.html'])} href="about.html">About</a>
      <a class="mob-portal" href="https://zippy-biscotti-636466.netlify.app">Client Portal →</a>
      <a class="mob-cta" href="index.html#contact">Book a Free Call</a>
    </nav>
  </header>`;

  const footerHTML = `
  <footer>
    <div>© ${new Date().getFullYear()} Tara Consulting Co · Social media, AI and marketing made practical.</div>
    <div class="meta">Made in Australia · <a href="mailto:hello@taraconsultingco.com">hello@taraconsultingco.com</a></div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
        toggle.textContent = 'Menu';
      });
    });
  }
})();
