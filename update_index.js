const fs = require('fs');

const indexPath = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Replace leading slashes for relative portability
html = html.replace(/href="\/assets\//g, 'href="assets/');
html = html.replace(/src="\/assets\//g, 'src="assets/');
html = html.replace(/href="\/css\//g, 'href="css/');
html = html.replace(/src="\/js\//g, 'src="js/');
html = html.replace(/href="\/pages\//g, 'href="pages/');
html = html.replace(/href="\/index.html"/g, 'href="index.html"');

// Ensure mobile drawer exists
if (!html.includes('id="mobileDrawer"')) {
  const drawerHtml = `
  <!-- Responsive Mobile Navigation Drawer -->
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="mobile-drawer-header">
      <img src="assets/images/logo.jpg" alt="MyTravel.pk" class="mobile-drawer-logo">
      <button class="mobile-drawer-close" onclick="toggleMobileMenu()"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="mobile-drawer-body">
      <ul class="mobile-nav-list">
        <li><a href="index.html" class="mobile-nav-link active"><i class="bi bi-house-door-fill"></i> Home</a></li>
        <li><a href="pages/about.html" class="mobile-nav-link"><i class="bi bi-info-circle-fill"></i> About Us</a></li>
        <li><a href="pages/flights.html" class="mobile-nav-link"><i class="bi bi-airplane-fill"></i> Flights & Booking</a></li>
        <li><a href="pages/flights-results.html" class="mobile-nav-link"><i class="bi bi-filter-square"></i> Flight Search Results</a></li>
        <li><a href="pages/airline-offices.html" class="mobile-nav-link"><i class="bi bi-buildings"></i> Airline Offices (30+ Carriers)</a></li>
        <li><a href="pages/visas.html" class="mobile-nav-link"><i class="bi bi-passport-fill"></i> Tourist Visas</a></li>
        <li><a href="pages/insurance.html" class="mobile-nav-link"><i class="bi bi-shield-check"></i> Travel Insurance (Adamjee & UIC)</a></li>
        <li><a href="pages/excursions.html" class="mobile-nav-link"><i class="bi bi-compass-fill"></i> Excursions & Tours</a></li>
        <li><a href="pages/destinations.html" class="mobile-nav-link"><i class="bi bi-geo-alt-fill"></i> Destinations</a></li>
        <li><a href="pages/travel-news.html" class="mobile-nav-link"><i class="bi bi-newspaper"></i> Travel News</a></li>
        <li><a href="pages/contact.html" class="mobile-nav-link"><i class="bi bi-envelope-fill"></i> Contact Us</a></li>
        <li><a href="pages/mybooking.html" class="mobile-nav-link"><i class="bi bi-ticket-perforated"></i> My Booking / PNR</a></li>
        <li><a href="pages/receipt-verify.html" class="mobile-nav-link"><i class="bi bi-receipt"></i> Verify Payment Receipt</a></li>
      </ul>
      <div class="mobile-drawer-cta">
        <a href="pages/login.html" class="btn btn-outline btn-block"><i class="bi bi-person-circle"></i> Customer Login</a>
        <a href="tel:03111101365" class="btn btn-primary btn-block"><i class="bi bi-telephone-fill"></i> Call UAN: 03111-101-365</a>
      </div>
    </div>
  </div>
  <div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop" onclick="toggleMobileMenu()"></div>
  `;
  html = html.replace('</header>', '</header>' + drawerHtml);
}

// Ensure toggle button in header actions
if (!html.includes('mobileMenuBtn')) {
  const toggleBtn = `
        <button class="mobile-toggle-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" onclick="toggleMobileMenu()">
          <i class="bi bi-list"></i>
        </button>
  `;
  html = html.replace('<div class="header-actions">', '<div class="header-actions">' + toggleBtn);
}

// Ensure toggle function script exists
if (!html.includes('toggleMobileMenu')) {
  const toggleScript = `
  <script>
    function toggleMobileMenu() {
      const drawer = document.getElementById('mobileDrawer');
      const backdrop = document.getElementById('mobileDrawerBackdrop');
      if (drawer && backdrop) {
        drawer.classList.toggle('active');
        backdrop.classList.toggle('active');
      }
    }
  </script>
  `;
  html = html.replace('</body>', toggleScript + '</body>');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Fixed index.html relative paths and mobile drawer successfully.');
