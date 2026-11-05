const fs = require('fs');

function getHeader(title, activeNav = '', depth = 1) {
  const root = depth === 2 ? '../..' : (depth === 1 ? '..' : '.');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | MyTravel.pk - Premium Travel & Flights</title>
  <link rel="icon" type="image/png" href="${root}/assets/images/favicon.png">
  <!-- Google Fonts: DM Sans & Fraunces -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="${root}/css/main.css">
  <!-- Three.js 3D Engine -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <!-- Top Credential Notification Bar -->
  <div class="top-bar">
    <div class="container top-bar-content">
      <div class="top-bar-left">
        <span class="top-credential-badge"><i class="bi bi-patch-check-fill"></i> <strong>DTS Licensed</strong> Agency</span>
        <span class="top-credential-badge"><i class="bi bi-award-fill"></i> <strong>IATA TIDS</strong> Member</span>
        <span class="top-credential-badge"><i class="bi bi-shield-check"></i> Authorized Agent: <strong>Adamjee & UIC</strong></span>
      </div>
      <div class="top-bar-right">
        <a href="${root}/pages/mybooking.html"><i class="bi bi-search"></i> Track Booking</a>
        <a href="${root}/pages/receipt-verify.html"><i class="bi bi-receipt"></i> Verify Receipt</a>
        <a href="tel:03111101365" class="uan-link"><i class="bi bi-telephone-fill"></i> UAN: 03111-101-365</a>
      </div>
    </div>
  </div>

  <!-- Main Header Navigation -->
  <header class="main-header">
    <div class="container header-container">
      <a href="${root}/index.html" class="brand-logo-wrap" title="MyTravel.pk Home">
        <img src="${root}/assets/images/logo.jpg" alt="MyTravel.pk" class="brand-logo">
      </a>

      <!-- Desktop Nav Menu with Icons & Country Flags -->
      <nav>
        <ul class="nav-menu">
          <li class="nav-item ${activeNav === 'home' ? 'active' : ''}">
            <a href="${root}/index.html" class="nav-link"><i class="bi bi-house-door-fill"></i> <span>Home</span></a>
          </li>
          <li class="nav-item ${activeNav === 'about' ? 'active' : ''}">
            <a href="${root}/pages/about.html" class="nav-link"><i class="bi bi-info-circle-fill"></i> <span>About Us</span></a>
          </li>
          <li class="nav-item ${activeNav === 'flights' ? 'active' : ''}">
            <a href="${root}/pages/flights.html" class="nav-link">
              <i class="bi bi-airplane-fill"></i> <span>Flights</span> <i class="bi bi-chevron-down chevron"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="${root}/pages/flights.html" class="dropdown-link"><i class="bi bi-airplane"></i> Flight Search Engine</a></li>
              <li><a href="${root}/pages/flights-results.html" class="dropdown-link"><i class="bi bi-filter-square"></i> Available Flight Deals</a></li>
              <li><a href="${root}/pages/airline-offices.html" class="dropdown-link"><i class="bi bi-buildings"></i> Airline Offices Directory</a></li>
              <li><a href="${root}/pages/mybooking.html" class="dropdown-link"><i class="bi bi-ticket-perforated"></i> Retrieve Booking</a></li>
            </ul>
          </li>
          <li class="nav-item ${activeNav === 'visas' ? 'active' : ''}">
            <a href="${root}/pages/visas.html" class="nav-link">
              <i class="bi bi-passport-fill"></i> <span>Visas</span> <i class="bi bi-chevron-down chevron"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="${root}/pages/visas.html" class="dropdown-link"><i class="bi bi-passport"></i> All Tourist Visas</a></li>
              <li><a href="${root}/pages/visa-details.html?country=azerbaijan" class="dropdown-link"><img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="Azerbaijan"> Azerbaijan e-Visa</a></li>
              <li><a href="${root}/pages/visa-details.html?country=thailand" class="dropdown-link"><img src="https://flagcdn.com/w24/th.png" class="flag-icon" alt="Thailand"> Thailand Tourist Visa</a></li>
              <li><a href="${root}/pages/visa-details.html?country=malaysia" class="dropdown-link"><img src="https://flagcdn.com/w24/my.png" class="flag-icon" alt="Malaysia"> Malaysia e-Visa</a></li>
              <li><a href="${root}/pages/visa-details.html?country=singapore" class="dropdown-link"><img src="https://flagcdn.com/w24/sg.png" class="flag-icon" alt="Singapore"> Singapore Visa</a></li>
              <li><a href="${root}/pages/visa-details.html?country=dubai" class="dropdown-link"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai 30/60 Days Visa</a></li>
              <li><a href="${root}/pages/visa-details.html?country=turkey" class="dropdown-link"><img src="https://flagcdn.com/w24/tr.png" class="flag-icon" alt="Turkey"> Turkey Tourist Visa</a></li>
              <li><a href="${root}/pages/visa-details.html?country=saudi" class="dropdown-link"><img src="https://flagcdn.com/w24/sa.png" class="flag-icon" alt="Saudi Arabia"> Saudi Tourist / Umrah Visa</a></li>
            </ul>
          </li>
          <li class="nav-item ${activeNav === 'insurance' ? 'active' : ''}">
            <a href="${root}/pages/insurance.html" class="nav-link">
              <i class="bi bi-shield-check"></i> <span>Insurance</span> <i class="bi bi-chevron-down chevron"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="${root}/pages/insurance.html" class="dropdown-link"><i class="bi bi-shield-check"></i> Instant Online Insurance</a></li>
              <li><a href="${root}/pages/insurance-compare.html" class="dropdown-link"><i class="bi bi-sliders"></i> Compare Adamjee vs UIC</a></li>
            </ul>
          </li>
          <li class="nav-item ${activeNav === 'excursions' ? 'active' : ''}">
            <a href="${root}/pages/excursions.html" class="nav-link"><i class="bi bi-compass-fill"></i> <span>Excursions</span></a>
          </li>
          <li class="nav-item ${activeNav === 'destinations' ? 'active' : ''}">
            <a href="${root}/pages/destinations.html" class="nav-link"><i class="bi bi-geo-alt-fill"></i> <span>Destinations</span></a>
          </li>
          <li class="nav-item ${activeNav === 'news' ? 'active' : ''}">
            <a href="${root}/pages/travel-news.html" class="nav-link"><i class="bi bi-newspaper"></i> <span>Travel News</span></a>
          </li>
          <li class="nav-item ${activeNav === 'contact' ? 'active' : ''}">
            <a href="${root}/pages/contact.html" class="nav-link"><i class="bi bi-envelope-fill"></i> <span>Contact</span></a>
          </li>
        </ul>
      </nav>

      <!-- Header Action Buttons -->
      <div class="header-actions">
        <a href="${root}/pages/login.html" class="btn btn-outline btn-sm"><i class="bi bi-person-circle"></i> <span>Login</span></a>
        <a href="${root}/pages/flights.html" class="btn btn-primary btn-sm"><i class="bi bi-send-fill"></i> <span>Book Now</span></a>
        <!-- Hamburger Menu Toggle Button for Mobile / Tablet -->
        <button class="mobile-toggle-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" onclick="toggleMobileMenu()">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Responsive Mobile Navigation Drawer -->
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="mobile-drawer-header">
      <img src="${root}/assets/images/logo.jpg" alt="MyTravel.pk" class="mobile-drawer-logo">
      <button class="mobile-drawer-close" onclick="toggleMobileMenu()"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="mobile-drawer-body">
      <ul class="mobile-nav-list">
        <li><a href="${root}/index.html"><i class="bi bi-house-door-fill"></i> Home</a></li>
        <li><a href="${root}/pages/about.html"><i class="bi bi-info-circle-fill"></i> About Us</a></li>
        <li><a href="${root}/pages/flights.html"><i class="bi bi-airplane-fill"></i> Flights Search</a></li>
        <li><a href="${root}/pages/flights-results.html"><i class="bi bi-filter-square"></i> Flight Results</a></li>
        <li><a href="${root}/pages/visas.html"><i class="bi bi-passport-fill"></i> Tourist Visas</a></li>
        <li><a href="${root}/pages/insurance.html"><i class="bi bi-shield-check"></i> Travel Insurance</a></li>
        <li><a href="${root}/pages/excursions.html"><i class="bi bi-compass-fill"></i> Excursions & Tours</a></li>
        <li><a href="${root}/pages/destinations.html"><i class="bi bi-geo-alt-fill"></i> Destinations</a></li>
        <li><a href="${root}/pages/travel-news.html"><i class="bi bi-newspaper"></i> Travel News</a></li>
        <li><a href="${root}/pages/airline-offices.html"><i class="bi bi-buildings"></i> Airline Offices</a></li>
        <li><a href="${root}/pages/testimonials.html"><i class="bi bi-chat-quote-fill"></i> Testimonials</a></li>
        <li><a href="${root}/pages/faqs.html"><i class="bi bi-question-circle-fill"></i> FAQs</a></li>
        <li><a href="${root}/pages/contact.html"><i class="bi bi-envelope-fill"></i> Contact Us</a></li>
        <li><a href="${root}/pages/mybooking.html"><i class="bi bi-search"></i> Retrieve Booking</a></li>
        <li><a href="${root}/pages/receipt-verify.html"><i class="bi bi-receipt"></i> Verify Payment Receipt</a></li>
      </ul>
      <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.75rem;">
        <a href="${root}/pages/login.html" class="btn btn-outline" style="width:100%; justify-content:center;"><i class="bi bi-person-circle"></i> Login / Register</a>
        <a href="${root}/pages/flights.html" class="btn btn-primary" style="width:100%; justify-content:center;"><i class="bi bi-send-fill"></i> Book Flight Now</a>
      </div>
    </div>
  </div>
`;
}

function getFooter(depth = 1) {
  const root = depth === 2 ? '../..' : (depth === 1 ? '..' : '.');
  return `
  <!-- Official Accreditation & Trust Strip (IATA TIDS, DTS, Visa, Mastercard) -->
  <div class="accreditation-trust-strip">
    <div class="container accreditation-flex">
      <!-- Left: Logo & Tagline -->
      <div class="acc-brand">
        <a href="${root}/index.html" style="display:inline-block;">
          <img src="${root}/assets/images/logo.jpg" alt="MyTravel.pk" class="acc-logo-img">
        </a>
        <div class="acc-tagline">Your journey &mdash; our expertise</div>
      </div>

      <!-- Center: Official Accreditation Seals -->
      <div class="acc-seals">
        <div class="acc-seal-item" title="IATA TIDS Accredited Member (Travel Industry Designator Service)">
          <img src="${root}/assets/images/iata-tids-logo.png" alt="IATA TIDS" class="acc-seal-img">
        </div>
        <div class="acc-seal-item" title="Department of Tourist Services (DTS) Licensed Agency">
          <img src="${root}/assets/images/dts-logo.png" alt="DTS Tourism Department" class="acc-seal-img">
        </div>
      </div>

      <!-- Right: We Accept Cards -->
      <div class="acc-payments">
        <span class="acc-accept-text">We accept</span>
        <div class="acc-pay-logos">
          <img src="${root}/assets/images/visa-logo.png" alt="Visa" class="acc-pay-img">
          <img src="${root}/assets/images/mastercard-logo.png" alt="Mastercard" class="acc-pay-img">
        </div>
      </div>
    </div>
  </div>

  <!-- Master Dark Navy Footer -->
  <footer class="main-footer">
    <div class="container footer-grid">
      <!-- Col 1: Brand & Credentials -->
      <div class="footer-col-brand">
        <a href="${root}/index.html">
          <img src="${root}/assets/images/logo.jpg" alt="MyTravel.pk" class="footer-brand-logo">
        </a>
        <p class="footer-bio">
          Operated by experienced travel professionals with more than 15 years of industry leadership. MyTravel.pk is Pakistan's premier licensed full-service travel platform.
        </p>
        <div class="footer-socials">
          <a href="https://facebook.com/MyTravelPak" target="_blank" class="social-link" title="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="https://instagram.com/MyTravelPak" target="_blank" class="social-link" title="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://linkedin.com/company/MyTravelPK" target="_blank" class="social-link" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <a href="https://wa.me/923111101365" target="_blank" class="social-link" title="WhatsApp"><i class="bi bi-whatsapp"></i></a>
        </div>
      </div>

      <!-- Col 2: Services -->
      <div>
        <h4 class="footer-heading">Travel Services</h4>
        <ul class="footer-links-list">
          <li><a href="${root}/pages/flights.html"><i class="bi bi-chevron-right"></i> Book Flights Online</a></li>
          <li><a href="${root}/pages/visas.html"><i class="bi bi-chevron-right"></i> Tourist Visas</a></li>
          <li><a href="${root}/pages/insurance.html"><i class="bi bi-chevron-right"></i> Travel Insurance (20% OFF)</a></li>
          <li><a href="${root}/pages/insurance-compare.html"><i class="bi bi-chevron-right"></i> Adamjee & UIC Plans</a></li>
          <li><a href="${root}/pages/excursions.html"><i class="bi bi-chevron-right"></i> Airport Lounges & Tours</a></li>
          <li><a href="${root}/pages/airline-offices.html"><i class="bi bi-chevron-right"></i> Airline Offices Directory</a></li>
        </ul>
      </div>

      <!-- Col 3: Support -->
      <div>
        <h4 class="footer-heading">Support & Tracking</h4>
        <ul class="footer-links-list">
          <li><a href="${root}/pages/mybooking.html"><i class="bi bi-chevron-right"></i> Retrieve My Booking</a></li>
          <li><a href="${root}/pages/receipt-verify.html"><i class="bi bi-chevron-right"></i> Verify Payment Receipt</a></li>
          <li><a href="${root}/pages/about.html"><i class="bi bi-chevron-right"></i> About Ahsan Bhatti & Team</a></li>
          <li><a href="${root}/pages/travel-news.html"><i class="bi bi-chevron-right"></i> Travel Advisories</a></li>
          <li><a href="${root}/pages/blog.html"><i class="bi bi-chevron-right"></i> Travel Guides & Blog</a></li>
          <li><a href="${root}/pages/faqs.html"><i class="bi bi-chevron-right"></i> Frequently Asked Questions</a></li>
          <li><a href="${root}/pages/contact.html"><i class="bi bi-chevron-right"></i> Contact Us</a></li>
          <li><a href="${root}/pages/admin/login.html"><i class="bi bi-shield-lock"></i> Administration Portal</a></li>
        </ul>
      </div>

      <!-- Col 4: Verified Contact -->
      <div>
        <h4 class="footer-heading">Registered Office</h4>
        <div class="footer-contact-items">
          <div class="f-contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <span>Office No. 310, Al-Hafeez Business Center, 89-A Block B3, Firdous Market Road, Gulberg-III, Lahore, Pakistan</span>
          </div>
          <div class="f-contact-item">
            <i class="bi bi-telephone-fill"></i>
            <span>UAN: <strong>03111-101-365</strong></span>
          </div>
          <div class="f-contact-item">
            <i class="bi bi-whatsapp"></i>
            <span>WhatsApp: <strong>+92 311 1101365</strong></span>
          </div>
          <div class="f-contact-item">
            <i class="bi bi-envelope-fill"></i>
            <span>Email: <strong>hello@mytravel.pk</strong></span>
          </div>
          <div class="f-contact-item">
            <i class="bi bi-award-fill"></i>
            <span>Department of Tourist Services (DTS) & IATA TIDS Accredited</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="container footer-bottom">
      <div>
        &copy; 2026 MyTravel.pk. All rights reserved. Powered by MyTravel Smart Travel Technology.
      </div>
      <div class="footer-legal-links">
        <a href="${root}/pages/privacy-policy.html">Privacy Policy</a>
        <a href="${root}/pages/terms.html">Terms of Service</a>
        <a href="${root}/pages/refund-policy.html">Refund & Cancellation</a>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Quick Connect Button -->
  <a href="https://wa.me/923111101365" target="_blank" rel="noopener noreferrer" class="whatsapp-float" title="Chat on WhatsApp" aria-label="Chat with MyTravel on WhatsApp">
    <i class="bi bi-whatsapp"></i>
  </a>

  <!-- Mobile Menu Drawer Toggle Script -->
  <script>
    function toggleMobileMenu() {
      const drawer = document.getElementById('mobileDrawer');
      if (drawer) drawer.classList.toggle('active');
    }
  </script>
</body>
</html>
`;
}

module.exports = { getHeader, getFooter };
