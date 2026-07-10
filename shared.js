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
      <div class="header-left">
        <a href="/" class="logo"><img src="logo.png" alt="Tara Consulting Co" class="logo-img"/></a>
        <div class="nav-social">
          <a href="https://www.instagram.com/taraconsultingco/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76a4.9 4.9 0 0 1 1.76-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.72.36-1.03.67-.31.31-.51.61-.67 1.03-.12.31-.26.78-.3 1.65C4.26 9.01 4.25 9.33 4.25 12s.01 2.99.06 4.04c.04.87.18 1.34.3 1.65.16.42.36.72.67 1.03.31.31.61.51 1.03.67.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.72-.36 1.03-.67.31-.31.51-.61.67-1.03.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.3-1.65a2.8 2.8 0 0 0-.67-1.03 2.8 2.8 0 0 0-1.03-.67c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7zm5.35-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
          </a>
          <a href="https://www.facebook.com/taraconsultingco" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>
          </a>
        </div>
      </div>
      <nav>
        <a class="nav-link"${activeIf(['index.html',''])} href="/">Home</a>
        <a class="nav-link"${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
        <a class="nav-link"${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
        <a class="nav-link"${activeIf(['packages.html'])} href="packages.html">Packages</a>
        <a class="nav-link"${activeIf(['blog.html'])} href="blog.html">Blog</a>
        <a class="nav-link"${activeIf(['about.html'])} href="about.html">Meet Tara</a>
        <a class="nav-portal" href="https://tara-client-portal.netlify.app">Client Portal →</a>
        <a class="nav-cta" href="/#contact">Book a Call</a>
      </nav>
      <div class="header-actions">
        <button class="search-toggle" id="search-toggle" aria-label="Search the site">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button class="menu-toggle" id="menu-toggle" aria-expanded="false">Menu</button>
      </div>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
      <a${activeIf(['index.html',''])} href="/">Home</a>
      <a${activeIf(['start-here.html'])} href="start-here.html">Start Here</a>
      <a${activeIf(['work-examples.html'])} href="work-examples.html">Work Examples</a>
      <a${activeIf(['packages.html'])} href="packages.html">Packages</a>
      <a${activeIf(['blog.html'])} href="blog.html">Blog</a>
      <a${activeIf(['about.html'])} href="about.html">Meet Tara</a>
      <a class="mob-portal" href="https://tara-client-portal.netlify.app">Client Portal →</a>
      <a class="mob-cta" href="/#contact">Book a Free Call</a>
    </nav>
  </header>`;

  const footerHTML = `
  <footer>
    <div id="footer-tagline">© ${new Date().getFullYear()} Tara Consulting Co · Social media, AI and marketing made practical.</div>
    <div class="meta"><span id="footer-meta">Made in Australia</span> · <a href="mailto:hello@taraconsultingco.com" id="footer-email">hello@taraconsultingco.com</a> · <a href="privacy.html">Privacy</a></div>
  </footer>`;

  const searchHTML = `
  <div class="search-overlay" id="search-overlay" aria-hidden="true">
    <div class="search-overlay-inner">
      <button class="search-close" id="search-close" aria-label="Close search">✕</button>
      <input type="text" id="search-input" class="search-input" placeholder="Search the site…" autocomplete="off"/>
      <div class="search-results" id="search-results"></div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  document.body.insertAdjacentHTML('beforeend', searchHTML);
 
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

// ── SITE SEARCH ──────────────────────────────────────────────
(function() {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var PAGES_INDEX = [
    { title: 'Home', url: '/', excerpt: 'Social media, AI and marketing support for small business owners.' },
    { title: 'Start Here', url: 'start-here.html', excerpt: "The marketing and systems you know you need, built for your business and taught to your team." },
    { title: 'Work Examples', url: 'work-examples.html', excerpt: 'Businesses and community projects supported across social media, AI and marketing.' },
    { title: 'Packages', url: 'packages.html', excerpt: 'Weekly social media support or a one-off starter package, with clear pricing.' },
    { title: 'Blog', url: 'blog.html', excerpt: 'Practical articles on social media, SEO, AI and marketing for small business.' },
    { title: 'Meet Tara', url: 'about.html', excerpt: 'Practical support for real businesses, from someone who has worked in them.' },
    { title: 'Referral Partner', url: 'referral-partner.html', excerpt: 'Find out what it looks like to partner with Tara Consulting Co.' }
  ];
  var searchIndex = PAGES_INDEX.slice();
  var blogIndexed = false;

  function addBlogPosts() {
    var source = (typeof window.POSTS !== 'undefined' && window.POSTS.length) ? window.POSTS
      : (typeof FALLBACK_POSTS !== 'undefined' ? FALLBACK_POSTS : []);
    source.forEach(function(p) {
      searchIndex.push({ title: p.title, url: 'blog.html', excerpt: p.excerpt });
    });
    blogIndexed = true;
  }

  function ensureBlogPosts(cb) {
    if (blogIndexed) { cb(); return; }
    if (typeof FALLBACK_POSTS !== 'undefined') { addBlogPosts(); cb(); return; }
    var s = document.createElement('script');
    s.src = 'posts-data.js';
    s.onload = function() { addBlogPosts(); cb(); };
    s.onerror = function() { blogIndexed = true; cb(); };
    document.head.appendChild(s);
  }

  var overlay = document.getElementById('search-overlay');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var openBtn = document.getElementById('search-toggle');
  var closeBtn = document.getElementById('search-close');
  if (!overlay || !input || !results || !openBtn) return;

  function render(query) {
    var q = query.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    var matches = searchIndex.filter(function(item) {
      return item.title.toLowerCase().indexOf(q) > -1 || item.excerpt.toLowerCase().indexOf(q) > -1;
    }).slice(0, 8);
    if (!matches.length) {
      results.innerHTML = '<div class="search-empty">No results for "' + esc(query) + '".</div>';
      return;
    }
    results.innerHTML = matches.map(function(m) {
      return '<a class="search-result" href="' + esc(m.url) + '">' +
        '<div class="search-result-title">' + esc(m.title) + '</div>' +
        '<div class="search-result-excerpt">' + esc(m.excerpt) + '</div></a>';
    }).join('');
  }

  function openSearch() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    ensureBlogPosts(function() { render(input.value); });
    setTimeout(function() { input.focus(); }, 50);
  }
  function closeSearch() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    input.value = '';
    results.innerHTML = '';
  }

  openBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeSearch(); });
  input.addEventListener('input', function() { render(input.value); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeSearch();
  });
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
 