// shared.js — injects nav and footer, handles mobile menu, marks active page

(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  function activeIf(names) {
    return names.includes(page) ? ' class="active-page"' : '';
  }

  const headerHTML = `
  <header>
    <div class="container header-inner">
      <a href="index.html" class="logo"><img src="logo.png" alt="Tara Consulting Co" class="logo-img"/></a>
      <nav>
        <a class="nav-link"${activeIf(['index.html',''])} href="index.html">Home</a>
        <a class="nav-link"${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
        <a class="nav-link"${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
        <a class="nav-link"${activeIf(['blog.html'])} href="blog.html">Blog</a>
        <a class="nav-link"${activeIf(['about.html'])} href="about.html">About</a>
        <a class="nav-portal" href="https://tara-client-portal.netlify.app">Client Portal →</a>
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
      <a class="mob-portal" href="https://tara-client-portal.netlify.app">Client Portal →</a>
      <a class="mob-cta" href="index.html#contact">Book a Free Call</a>
    </nav>
  </header>`;

  const footerHTML = `
  <footer>
    <div id="footer-tagline">© ${new Date().getFullYear()} Tara Consulting Co · Social media, AI and marketing made practical.</div>
    <div class="meta"><span id="footer-meta">Made in Australia</span> · <a href="mailto:hello@taraconsultingco.com" id="footer-email">hello@taraconsultingco.com</a></div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Load editable footer content from Supabase
  (async function() {
    try {
      const r = await fetch('https://zmexxlwvwxxocjbfkslw.supabase.co/rest/v1/site_content?select=key,value&key=in.(footer-tagline,footer-meta,footer-email)', {
        headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXh4bHd2d3h4b2NqYmZrc2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDkwMzIsImV4cCI6MjA5NTg4NTAzMn0.ZhFO4L_9AYG_Bp0VzzUeemZy4WwgALGR0OHRB2SN46g', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXh4bHd2d3h4b2NqYmZrc2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDkwMzIsImV4cCI6MjA5NTg4NTAzMn0.ZhFO4L_9AYG_Bp0VzzUeemZy4WwgALGR0OHRB2SN46g' }
      });
      const data = await r.json();
      if (!Array.isArray(data)) return;
      data.forEach(row => {
        const el = document.getElementById(row.key);
        if (el) {
          if (row.key === 'footer-email') {
            el.textContent = row.value;
            el.href = 'mailto:' + row.value;
          } else {
            el.textContent = row.value;
          }
        }
      });
    } catch(e) {}
  })();

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
