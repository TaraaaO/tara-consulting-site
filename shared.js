// shared.js — injects nav and footer, handles mobile menu, marks active page

// ── CACHE-FIRST CONTENT LOADER ──────────────────────────────
// Every page fetches its editable copy from Supabase after the static
// HTML (which always contains the *last hand-edited* fallback text) has
// already painted. If that fallback has drifted from what's actually
// configured in Supabase, the fetch silently overwrites it a moment
// later - a real, visible flash of old text swapping to new text on
// every single load. loadSiteContent() applies the last-known values
// from localStorage immediately (so repeat visits, i.e. almost all
// browsing on this site, never show a swap), then fetches fresh values
// in the background and only touches the DOM again if something
// actually changed.
(function() {
  var CACHE_KEY = 'tara-content-cache-v1';
  function readCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; } catch(e) { return {}; }
  }
  function writeCache(cache) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch(e) {}
  }
  window.loadSiteContent = function(keys, applyFn) {
    var cache = readCache();
    keys.forEach(function(key) {
      if (cache[key] !== undefined) applyFn(key, cache[key]);
    });
    var ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXh4bHd2d3h4b2NqYmZrc2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDkwMzIsImV4cCI6MjA5NTg4NTAzMn0.ZhFO4L_9AYG_Bp0VzzUeemZy4WwgALGR0OHRB2SN46g';
    fetch('https://zmexxlwvwxxocjbfkslw.supabase.co/rest/v1/site_content?select=key,value&key=in.(' + keys.join(',') + ')', {
      headers: { 'apikey': ANON, 'Authorization': 'Bearer ' + ANON }
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (!Array.isArray(data)) return;
      data.forEach(function(row) {
        if (cache[row.key] !== row.value) applyFn(row.key, row.value);
        cache[row.key] = row.value;
      });
      writeCache(cache);
    }).catch(function() {});
  };
})();

(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
 
  function activeIf(names) {
    return names.includes(page) ? ' class="active-page"' : '';
  }
 
  const headerHTML = `
  <header>
    <div class="container header-inner">
      <a href="/" class="logo"><img src="logo.png" alt="Tara Consulting Co" class="logo-img"/></a>
      <nav>
        <a class="nav-link"${activeIf(['index.html',''])} href="/">Home</a>
        <a class="nav-link"${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
        <a class="nav-link"${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
        <a class="nav-link"${activeIf(['blog.html'])} href="blog.html">Blog</a>
        <a class="nav-link"${activeIf(['about.html'])} href="about.html">About</a>
        <a class="nav-portal" href="https://tara-client-portal.netlify.app">Client Portal →</a>
        <a class="nav-cta" href="/#contact">Book a Call</a>
      </nav>
      <button class="menu-toggle" id="menu-toggle" aria-expanded="false">Menu</button>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
      <a${activeIf(['index.html',''])} href="/">Home</a>
      <a${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
      <a${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
      <a${activeIf(['blog.html'])} href="blog.html">Blog</a>
      <a${activeIf(['about.html'])} href="about.html">About</a>
      <a class="mob-portal" href="https://tara-client-portal.netlify.app">Client Portal →</a>
      <a class="mob-cta" href="/#contact">Book a Free Call</a>
    </nav>
  </header>`;
 
  const footerHTML = `
  <footer>
    <div id="footer-tagline">© ${new Date().getFullYear()} Tara Consulting Co · Social media, AI and marketing made practical.</div>
    <div class="meta"><span id="footer-meta">Made in Australia</span> · <a href="mailto:hello@taraconsultingco.com" id="footer-email">hello@taraconsultingco.com</a> · <a href="privacy.html">Privacy</a></div>
  </footer>`;
 
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
 
  // Load editable footer content from Supabase (cache-first, see above)
  window.loadSiteContent(['footer-tagline', 'footer-meta', 'footer-email'], function(key, value) {
    const el = document.getElementById(key);
    if (!el) return;
    if (key === 'footer-email') {
      el.textContent = value;
      el.href = 'mailto:' + value;
    } else {
      el.textContent = value;
    }
  });
 
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
 
 
// ── SAME-PAGE NAV INTERCEPT ─────────────────────────────────
// Prevents flash when clicking a nav link for the page you're already on
document.addEventListener('DOMContentLoaded', function() {
  var currentPage = window.location.pathname;
  document.querySelectorAll('a[href]').forEach(function(link) {
    var href = link.getAttribute('href');
    // Normalise both to compare
    var linkPath = href.replace('index.html','').replace(/\/+$/,'/') || '/';
    var curPath = currentPage.replace('index.html','').replace(/\/+$/,'/') || '/';
    if (linkPath === curPath) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
});
 