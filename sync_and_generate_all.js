const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./template_helper.js');

const rootDesktop = 'C:/Users/PC/Desktop/MyTravel/frontend';
const rootScratch = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend';

console.log('=== STARTING COMPLETE SYNCHRONIZATION FOR MYTRAVEL.PK ===');

// 1. UPDATE INDEX.HTML
function updateIndexHtml() {
  const indexPath = path.join(rootDesktop, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');

  // Fix relative URLs (no leading slashes)
  content = content.replace(/href="\/pages\//g, 'href="pages/');
  content = content.replace(/src="\/assets\//g, 'src="assets/');
  content = content.replace(/href="\/css\//g, 'href="css/');
  content = content.replace(/src="\/js\//g, 'src="js/');
  content = content.replace(/href="\/index\.html"/g, 'href="index.html"');
  content = content.replace(/window\.location\.href\s*=\s*'\/pages\//g, "window.location.href = 'pages/");

  // Ensure header has clean PNG logo and no text block
  const cleanHeader = `
  <!-- Main Header & Navigation (Clean PNG Logo only, zero text overlap) -->
  <header class="main-header">
    <div class="container header-container">
      <a href="index.html" class="brand-logo-wrap" title="MyTravel.pk Home">
        <img src="assets/images/logo.jpg" alt="MyTravel.pk" class="brand-logo">
      </a>

      <!-- Modern Navigation Menu with Icons -->
      <nav>
        <ul class="nav-menu">
          <li class="nav-item active">
            <a href="index.html" class="nav-link"><i class="bi bi-house-door-fill"></i> <span>Home</span></a>
          </li>
          <li class="nav-item">
            <a href="pages/about.html" class="nav-link"><i class="bi bi-info-circle-fill"></i> <span>About Us</span></a>
          </li>
          <li class="nav-item">
            <a href="pages/flights.html" class="nav-link">
              <i class="bi bi-airplane-fill"></i> <span>Flights</span> <i class="bi bi-chevron-down chevron"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="pages/flights.html" class="dropdown-link"><i class="bi bi-airplane"></i> Flight Search Engine</a></li>
              <li><a href="pages/flights-results.html" class="dropdown-link"><i class="bi bi-filter-square"></i> Available Flight Deals</a></li>
              <li><a href="pages/airline-offices.html" class="dropdown-link"><i class="bi bi-buildings"></i> Airline Offices Directory</a></li>
              <li><a href="pages/mybooking.html" class="dropdown-link"><i class="bi bi-ticket-perforated"></i> Retrieve Booking</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="pages/visas.html" class="nav-link">
              <i class="bi bi-passport-fill"></i> <span>Visas</span> <i class="bi bi-chevron-down chevron"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="pages/visas.html" class="dropdown-link"><i class="bi bi-passport"></i> All Tourist Visas</a></li>
              <li><a href="pages/visa-details.html?country=azerbaijan" class="dropdown-link"><img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="Azerbaijan"> Azerbaijan e-Visa</a></li>
              <li><a href="pages/visa-details.html?country=thailand" class="dropdown-link"><img src="https://flagcdn.com/w24/th.png" class="flag-icon" alt="Thailand"> Thailand Tourist Visa</a></li>
              <li><a href="pages/visa-details.html?country=malaysia" class="dropdown-link"><img src="https://flagcdn.com/w24/my.png" class="flag-icon" alt="Malaysia"> Malaysia e-Visa</a></li>
              <li><a href="pages/visa-details.html?country=singapore" class="dropdown-link"><img src="https://flagcdn.com/w24/sg.png" class="flag-icon" alt="Singapore"> Singapore Visa</a></li>
              <li><a href="pages/visa-details.html?country=dubai" class="dropdown-link"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai 30/60 Days Visa</a></li>
              <li><a href="pages/visa-details.html?country=turkey" class="dropdown-link"><img src="https://flagcdn.com/w24/tr.png" class="flag-icon" alt="Turkey"> Turkey Tourist Visa</a></li>
              <li><a href="pages/visa-details.html?country=saudi" class="dropdown-link"><img src="https://flagcdn.com/w24/sa.png" class="flag-icon" alt="Saudi Arabia"> Saudi Tourist / Umrah Visa</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="pages/insurance.html" class="nav-link">
              <i class="bi bi-shield-check"></i> <span>Insurance</span> <i class="bi bi-chevron-down chevron"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="pages/insurance.html" class="dropdown-link"><i class="bi bi-shield-check"></i> Instant Online Insurance</a></li>
              <li><a href="pages/insurance-compare.html" class="dropdown-link"><i class="bi bi-sliders"></i> Compare Adamjee vs UIC</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="pages/excursions.html" class="nav-link"><i class="bi bi-compass-fill"></i> <span>Excursions</span></a>
          </li>
          <li class="nav-item">
            <a href="pages/destinations.html" class="nav-link"><i class="bi bi-geo-alt-fill"></i> <span>Destinations</span></a>
          </li>
          <li class="nav-item">
            <a href="pages/travel-news.html" class="nav-link"><i class="bi bi-newspaper"></i> <span>Travel News</span></a>
          </li>
          <li class="nav-item">
            <a href="pages/contact.html" class="nav-link"><i class="bi bi-envelope-fill"></i> <span>Contact</span></a>
          </li>
        </ul>
      </nav>

      <!-- Header Action Buttons -->
      <div class="header-actions">
        <a href="pages/login.html" class="btn btn-outline btn-sm"><i class="bi bi-person-circle"></i> <span>Login</span></a>
        <a href="pages/flights.html" class="btn btn-primary btn-sm"><i class="bi bi-send-fill"></i> <span>Book Now</span></a>
        <button class="mobile-toggle-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" onclick="toggleMobileMenu()">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </div>
  </header>
  `;

  // Replace header in index.html
  content = content.replace(/<header class="main-header">[\s\S]*?<\/header>/, cleanHeader.trim());

  // Check if Flight Simulator section exists, if not, insert right after hero section
  const simSectionHtml = `
  <!-- 3D Aircraft Takeoff, Cruise & Landing Simulator ("Jahaz Ureh Phir Land Karee") -->
  <section class="flight-simulator-section" id="takeoff-landing-simulator">
    <div class="container">
      <div class="sim-section-header">
        <span class="badge"><i class="bi bi-airplane-engines"></i> Interactive 3D WebGL Flight Experience</span>
        <h2>Watch 3D Airplane Takeoff, Sky Cruise & Landing</h2>
        <p>
          Experience our Boeing 777-300ER flight dynamics. Watch the aircraft accelerate down the runway, rotate and lift off, climb through 3D clouds over the Arabian Sea, deploy landing gear on approach, and touch down with realistic tire smoke at your destination.
        </p>

        <!-- Route Selector Pills with Flags -->
        <div class="sim-route-selector-pills">
          <button class="route-pill-btn active" onclick="switchSimRoute('Karachi (KHI)', 'https://flagcdn.com/w24/pk.png', 'Dubai (DXB)', 'https://flagcdn.com/w24/ae.png', this)">
            <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Karachi (KHI) &rarr; <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="AE"> Dubai (DXB)
          </button>
          <button class="route-pill-btn" onclick="switchSimRoute('Lahore (LHE)', 'https://flagcdn.com/w24/pk.png', 'Baku (GYD)', 'https://flagcdn.com/w24/az.png', this)">
            <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Lahore (LHE) &rarr; <img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="AZ"> Baku (GYD)
          </button>
          <button class="route-pill-btn" onclick="switchSimRoute('Islamabad (ISB)', 'https://flagcdn.com/w24/pk.png', 'London (LHR)', 'https://flagcdn.com/w24/gb.png', this)">
            <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Islamabad (ISB) &rarr; <img src="https://flagcdn.com/w24/gb.png" class="flag-icon" alt="GB"> London (LHR)
          </button>
        </div>
      </div>

      <!-- 3D Viewport with HUD Telemetry & Camera Switchers -->
      <div class="sim-viewport-container">
        <div id="flight-sim-canvas"></div>
      </div>
    </div>
  </section>
  `;

  if (!content.includes('id="takeoff-landing-simulator"')) {
    // Insert before cabin-experience-section
    content = content.replace('<section class="cabin-experience-section">', simSectionHtml + '\n  <section class="cabin-experience-section">');
  }

  // Ensure scripts at bottom load flightAnimation.js
  if (!content.includes('flightAnimation.js')) {
    content = content.replace('<script src="js/seatmap3d.js"></script>', '<script src="js/seatmap3d.js"></script>\n  <script src="js/flightAnimation.js"></script>');
  }

  // Ensure script initializes flight simulator
  if (!content.includes('initFlightSimulator')) {
    const initCode = `
      // Initialize 3D Takeoff & Landing Flight Simulator
      if (window.initFlightSimulator) {
        window.initFlightSimulator('flight-sim-canvas', {
          route: 'KHI-DXB',
          origin: 'Karachi (KHI)',
          destination: 'Dubai (DXB)',
          originFlag: 'https://flagcdn.com/w24/pk.png',
          destFlag: 'https://flagcdn.com/w24/ae.png',
          flightNumber: 'EK-601 / PK-787'
        });
      }
    `;
    content = content.replace("mySeatMap = new MyTravelSeatMap('cabin3d-viewport', 'cabin2d-fallback');", "mySeatMap = new MyTravelSeatMap('cabin3d-viewport', 'cabin2d-fallback');\n" + initCode);
  }

  // Add switchSimRoute helper if not present
  if (!content.includes('function switchSimRoute')) {
    const routeFunc = `
    function switchSimRoute(origin, originFlag, dest, destFlag, btn) {
      document.querySelectorAll('.route-pill-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      if (window.myFlightSim) {
        window.myFlightSim.setRoute(origin, originFlag, dest, destFlag);
      }
    }
    `;
    content = content.replace('function toggleCabinView(mode)', routeFunc + '\n    function toggleCabinView(mode)');
  }

  // Save to both locations
  fs.writeFileSync(path.join(rootDesktop, 'index.html'), content, 'utf8');
  fs.writeFileSync(path.join(rootScratch, 'index.html'), content, 'utf8');
  console.log('Updated index.html with clean header, 3D Flight Simulator, and cabin experience.');
}

// 2. UPDATE FLIGHTS.HTML WITH POPULAR ROUTES FLAGS
function updateFlightsHtml() {
  const filePath = path.join(rootDesktop, 'pages', 'flights.html');
  const headerHtml = getHeader('Book Flights - Compare Air Tickets in Pakistan', 'flights', 1);
  const footerHtml = getFooter(1);

  const flightsBody = `
  <!-- Flight Search Hero Section -->
  <section class="page-hero-banner" style="background: linear-gradient(135deg, #082957 0%, #168DE2 100%); color:#FFFFFF; padding: 4.5rem 0 3.5rem;">
    <div class="container text-center">
      <span class="badge" style="background:rgba(255,255,255,0.15); color:#FFFFFF; margin-bottom:1rem; padding:0.4rem 1.1rem; border-radius:999px; font-weight:700;">
        <i class="bi bi-airplane-fill"></i> Real-Time Global Air Ticketing
      </span>
      <h1 style="font-size:2.75rem; font-weight:800; margin-bottom:1rem; letter-spacing:-0.02em;">Search & Compare Air Tickets</h1>
      <p style="font-size:1.15rem; max-width:720px; margin:0 auto; opacity:0.92; line-height:1.6;">
        Search domestic flights across Pakistan and international routes worldwide with transparent fare breakdowns, live seat selection, and instant confirmation.
      </p>
    </div>
  </section>

  <!-- Flight Booking Search Box Section -->
  <section style="padding: 2.5rem 0; background: var(--bg-surface-alt, #F8FAFC); margin-top:-2rem;">
    <div class="container">
      <div class="flight-search-card" style="background:#FFFFFF; border-radius:18px; padding:2rem; box-shadow:0 12px 36px rgba(0,0,0,0.08); border:1px solid #E2E8F0;">
        <form id="flight-main-search-form" onsubmit="handleFlightSearch(event)">
          <!-- Trip Type Selector -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; gap:1.5rem;">
              <label style="display:flex; align-items:center; gap:0.4rem; font-weight:600; cursor:pointer;">
                <input type="radio" name="tripType" value="roundtrip" checked onchange="toggleReturnDate(true)"> Round Trip
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-weight:600; cursor:pointer;">
                <input type="radio" name="tripType" value="oneway" onchange="toggleReturnDate(false)"> One Way
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-weight:600; cursor:pointer;">
                <input type="radio" name="tripType" value="multicity"> Multi-City
              </label>
            </div>
            <div class="badge" style="background:#EFF6FF; color:#168DE2; border:1px solid #BFDBFE; font-size:0.8125rem; padding:0.35rem 0.75rem;">
              <i class="bi bi-info-circle-fill"></i> Real-time GDS Connected: PIA, Emirates, Fly Jinnah, Qatar Airways
            </div>
          </div>

          <!-- Input Fields Row -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; align-items:end;">
            <!-- Origin -->
            <div>
              <label style="font-size:0.8125rem; font-weight:700; color:#475569; display:block; margin-bottom:0.4rem;">FROM</label>
              <div style="position:relative;">
                <select id="fl-origin" style="width:100%; padding:0.75rem 1rem 0.75rem 2.4rem; border:1.5px solid #CBD5E1; border-radius:10px; font-weight:600; background:#FFFFFF;">
                  <option value="KHI">🇵🇰 Karachi (KHI) - Jinnah Intl</option>
                  <option value="LHE">🇵🇰 Lahore (LHE) - Allama Iqbal</option>
                  <option value="ISB">🇵🇰 Islamabad (ISB) - Islamabad Intl</option>
                  <option value="PEW">🇵🇰 Peshawar (PEW) - Bacha Khan</option>
                  <option value="MUX">🇵🇰 Multan (MUX) - Multan Intl</option>
                  <option value="SKT">🇵🇰 Sialkot (SKT) - Sialkot Intl</option>
                </select>
                <i class="bi bi-geo-alt-fill" style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); color:#168DE2;"></i>
              </div>
            </div>

            <!-- Destination -->
            <div>
              <label style="font-size:0.8125rem; font-weight:700; color:#475569; display:block; margin-bottom:0.4rem;">TO</label>
              <div style="position:relative;">
                <select id="fl-dest" style="width:100%; padding:0.75rem 1rem 0.75rem 2.4rem; border:1.5px solid #CBD5E1; border-radius:10px; font-weight:600; background:#FFFFFF;">
                  <option value="DXB">🇦🇪 Dubai (DXB) - Dubai Intl</option>
                  <option value="GYD">🇦🇿 Baku (GYD) - Heydar Aliyev</option>
                  <option value="LHR">🇬🇧 London (LHR) - Heathrow</option>
                  <option value="JED">🇸🇦 Jeddah (JED) - King Abdulaziz</option>
                  <option value="IST">🇹🇷 Istanbul (IST) - Istanbul Airport</option>
                  <option value="BKK">🇹🇭 Bangkok (BKK) - Suvarnabhumi</option>
                  <option value="KUL">🇲🇾 Kuala Lumpur (KUL) - KLIA</option>
                  <option value="SIN">🇸🇬 Singapore (SIN) - Changi</option>
                </select>
                <i class="bi bi-airplane-fill" style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); color:#168DE2;"></i>
              </div>
            </div>

            <!-- Departure Date -->
            <div>
              <label style="font-size:0.8125rem; font-weight:700; color:#475569; display:block; margin-bottom:0.4rem;">DEPARTURE</label>
              <input type="date" id="fl-depart" value="2026-11-20" style="width:100%; padding:0.75rem 1rem; border:1.5px solid #CBD5E1; border-radius:10px; font-weight:600;">
            </div>

            <!-- Return Date -->
            <div id="fl-return-group">
              <label style="font-size:0.8125rem; font-weight:700; color:#475569; display:block; margin-bottom:0.4rem;">RETURN</label>
              <input type="date" id="fl-return" value="2026-11-28" style="width:100%; padding:0.75rem 1rem; border:1.5px solid #CBD5E1; border-radius:10px; font-weight:600;">
            </div>

            <!-- Passengers / Cabin -->
            <div>
              <label style="font-size:0.8125rem; font-weight:700; color:#475569; display:block; margin-bottom:0.4rem;">CABIN CLASS</label>
              <select id="fl-cabin" style="width:100%; padding:0.75rem 1rem; border:1.5px solid #CBD5E1; border-radius:10px; font-weight:600; background:#FFFFFF;">
                <option value="Economy">Economy Class</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
                <option value="First">First Class Suite</option>
              </select>
            </div>

            <!-- Search Button -->
            <div>
              <button type="submit" class="btn btn-primary" style="width:100%; padding:0.85rem; justify-content:center; font-size:1rem;">
                <i class="bi bi-search"></i> Find Flights
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Popular Flight Routes from Pakistan with REAL Country Flags -->
  <section style="padding: 4.5rem 0; background:#FFFFFF;">
    <div class="container">
      <div style="text-align:center; max-width:700px; margin:0 auto 2.5rem;">
        <span class="badge" style="background:#EFF6FF; color:#168DE2; margin-bottom:0.5rem; padding:0.35rem 0.9rem; border-radius:999px; font-weight:700;">
          <i class="bi bi-stars"></i> Verified Lowest Fares
        </span>
        <h2 style="font-size:2.25rem; font-weight:800; color:#082957; margin-bottom:0.75rem;">Popular Flight Routes from Pakistan</h2>
        <p style="color:#64748B;">Instant direct booking on verified domestic and international airline routes.</p>
      </div>

      <!-- Modern Route Cards Table -->
      <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.04);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="background:#F8FAFC; border-bottom:2px solid #E2E8F0; color:#475569; font-size:0.875rem; text-transform:uppercase; letter-spacing:0.04em;">
              <th style="padding:1.25rem 1.5rem;">Route</th>
              <th style="padding:1.25rem 1.5rem;">Airlines Operating</th>
              <th style="padding:1.25rem 1.5rem;">Average Duration</th>
              <th style="padding:1.25rem 1.5rem;">Starting Fare</th>
              <th style="padding:1.25rem 1.5rem; text-align:right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Route 1: KHI to DXB -->
            <tr style="border-bottom:1px solid #F1F5F9; transition:background 0.2s ease;">
              <td style="padding:1.25rem 1.5rem; font-weight:700; color:#082957; font-size:1.05rem;">
                <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI)
                <i class="bi bi-arrow-right" style="color:#168DE2; margin:0 0.5rem;"></i>
                <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569;">
                <span class="badge" style="background:#EFF6FF; color:#168DE2; margin-right:0.35rem;">Emirates</span>
                <span class="badge" style="background:#F0FDF4; color:#16A34A; margin-right:0.35rem;">Fly Jinnah</span>
                <span class="badge" style="background:#FEF2F2; color:#DC2626;">Flydubai</span>
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569; font-weight:600;"><i class="bi bi-clock"></i> 2h 30m (Direct)</td>
              <td style="padding:1.25rem 1.5rem; font-weight:800; color:#168DE2; font-size:1.2rem;">PKR 63,400</td>
              <td style="padding:1.25rem 1.5rem; text-align:right;">
                <a href="flights-results.html?origin=KHI&dest=DXB" class="btn btn-primary btn-sm">Check Fares <i class="bi bi-chevron-right"></i></a>
              </td>
            </tr>

            <!-- Route 2: LHE to GYD -->
            <tr style="border-bottom:1px solid #F1F5F9; transition:background 0.2s ease;">
              <td style="padding:1.25rem 1.5rem; font-weight:700; color:#082957; font-size:1.05rem;">
                <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Lahore (LHE)
                <i class="bi bi-arrow-right" style="color:#168DE2; margin:0 0.5rem;"></i>
                <img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="Azerbaijan"> Baku (GYD)
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569;">
                <span class="badge" style="background:#EFF6FF; color:#168DE2; margin-right:0.35rem;">Azerbaijan Airlines</span>
                <span class="badge" style="background:#F0FDF4; color:#16A34A;">Direct Weekly</span>
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569; font-weight:600;"><i class="bi bi-clock"></i> 4h 15m (Direct)</td>
              <td style="padding:1.25rem 1.5rem; font-weight:800; color:#168DE2; font-size:1.2rem;">PKR 106,500</td>
              <td style="padding:1.25rem 1.5rem; text-align:right;">
                <a href="flights-results.html?origin=LHE&dest=GYD" class="btn btn-primary btn-sm">Check Fares <i class="bi bi-chevron-right"></i></a>
              </td>
            </tr>

            <!-- Route 3: ISB to LHR -->
            <tr style="border-bottom:1px solid #F1F5F9; transition:background 0.2s ease;">
              <td style="padding:1.25rem 1.5rem; font-weight:700; color:#082957; font-size:1.05rem;">
                <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Islamabad (ISB)
                <i class="bi bi-arrow-right" style="color:#168DE2; margin:0 0.5rem;"></i>
                <img src="https://flagcdn.com/w24/gb.png" class="flag-icon" alt="UK"> London (LHR)
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569;">
                <span class="badge" style="background:#EFF6FF; color:#168DE2; margin-right:0.35rem;">British Airways</span>
                <span class="badge" style="background:#F8FAFC; color:#334155; margin-right:0.35rem;">Qatar Airways</span>
                <span class="badge" style="background:#F0FDF4; color:#16A34A;">PIA</span>
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569; font-weight:600;"><i class="bi bi-clock"></i> 8h 55m (Direct)</td>
              <td style="padding:1.25rem 1.5rem; font-weight:800; color:#168DE2; font-size:1.2rem;">PKR 203,000</td>
              <td style="padding:1.25rem 1.5rem; text-align:right;">
                <a href="flights-results.html?origin=ISB&dest=LHR" class="btn btn-primary btn-sm">Check Fares <i class="bi bi-chevron-right"></i></a>
              </td>
            </tr>

            <!-- Route 4: KHI to JED -->
            <tr style="border-bottom:1px solid #F1F5F9; transition:background 0.2s ease;">
              <td style="padding:1.25rem 1.5rem; font-weight:700; color:#082957; font-size:1.05rem;">
                <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI)
                <i class="bi bi-arrow-right" style="color:#168DE2; margin:0 0.5rem;"></i>
                <img src="https://flagcdn.com/w24/sa.png" class="flag-icon" alt="Saudi Arabia"> Jeddah (JED)
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569;">
                <span class="badge" style="background:#EFF6FF; color:#168DE2; margin-right:0.35rem;">Saudia</span>
                <span class="badge" style="background:#F0FDF4; color:#16A34A; margin-right:0.35rem;">Fly Jinnah</span>
                <span class="badge" style="background:#F8FAFC; color:#334155;">Airblue</span>
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569; font-weight:600;"><i class="bi bi-clock"></i> 4h 30m (Direct)</td>
              <td style="padding:1.25rem 1.5rem; font-weight:800; color:#168DE2; font-size:1.2rem;">PKR 88,500</td>
              <td style="padding:1.25rem 1.5rem; text-align:right;">
                <a href="flights-results.html?origin=KHI&dest=JED" class="btn btn-primary btn-sm">Check Fares <i class="bi bi-chevron-right"></i></a>
              </td>
            </tr>

            <!-- Route 5: ISB to IST -->
            <tr style="transition:background 0.2s ease;">
              <td style="padding:1.25rem 1.5rem; font-weight:700; color:#082957; font-size:1.05rem;">
                <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Islamabad (ISB)
                <i class="bi bi-arrow-right" style="color:#168DE2; margin:0 0.5rem;"></i>
                <img src="https://flagcdn.com/w24/tr.png" class="flag-icon" alt="Turkey"> Istanbul (IST)
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569;">
                <span class="badge" style="background:#EFF6FF; color:#168DE2; margin-right:0.35rem;">Turkish Airlines</span>
                <span class="badge" style="background:#F0FDF4; color:#16A34A;">Daily Non-Stop</span>
              </td>
              <td style="padding:1.25rem 1.5rem; color:#475569; font-weight:600;"><i class="bi bi-clock"></i> 6h 15m (Direct)</td>
              <td style="padding:1.25rem 1.5rem; font-weight:800; color:#168DE2; font-size:1.2rem;">PKR 145,000</td>
              <td style="padding:1.25rem 1.5rem; text-align:right;">
                <a href="flights-results.html?origin=ISB&dest=IST" class="btn btn-primary btn-sm">Check Fares <i class="bi bi-chevron-right"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Interactive Search Handler Script -->
  <script>
    function toggleReturnDate(show) {
      document.getElementById('fl-return-group').style.display = show ? 'block' : 'none';
    }

    function handleFlightSearch(e) {
      e.preventDefault();
      const origin = document.getElementById('fl-origin').value;
      const dest = document.getElementById('fl-dest').value;
      const depart = document.getElementById('fl-depart').value;
      const cabin = document.getElementById('fl-cabin').value;
      window.location.href = 'flights-results.html?origin=' + origin + '&dest=' + dest + '&depart=' + depart + '&cabin=' + encodeURIComponent(cabin);
    }
  </script>
  `;

  const fullHtml = headerHtml + flightsBody + footerHtml;
  fs.writeFileSync(path.join(rootDesktop, 'pages', 'flights.html'), fullHtml, 'utf8');
  fs.writeFileSync(path.join(rootScratch, 'pages', 'flights.html'), fullHtml, 'utf8');
  console.log('Updated flights.html with real country flags and clean template.');
}

// 3. UPDATE FLIGHTS-RESULTS.HTML WITH AIRLINE CARDS AND COUNTRY FLAGS
function updateFlightsResultsHtml() {
  const filePath = path.join(rootDesktop, 'pages', 'flights-results.html');
  const headerHtml = getHeader('Available Flights - Results', 'flights', 1);
  const footerHtml = getFooter(1);

  const resultsBody = `
  <!-- Results Banner -->
  <section style="background: linear-gradient(135deg, #082957 0%, #168DE2 100%); color:#FFFFFF; padding: 3rem 0;">
    <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
      <div>
        <div style="display:flex; align-items:center; gap:0.75rem; font-size:1.75rem; font-weight:800;">
          <img src="https://flagcdn.com/w36/pk.png" class="flag-icon-lg" alt="Pakistan"> Karachi (KHI)
          <i class="bi bi-airplane-fill" style="transform:rotate(90deg); color:#38BDF8;"></i>
          <img src="https://flagcdn.com/w36/ae.png" class="flag-icon-lg" alt="UAE"> Dubai (DXB)
        </div>
        <p style="margin-top:0.5rem; opacity:0.9; font-size:0.95rem;">
          Round Trip &bull; 1 Adult &bull; Economy Class &bull; 5 Verified GDS Schedules Found
        </p>
      </div>
      <div>
        <a href="flights.html" class="btn btn-outline" style="background:rgba(255,255,255,0.15); color:#FFFFFF; border-color:rgba(255,255,255,0.4);">
          <i class="bi bi-pencil-square"></i> Modify Search
        </a>
      </div>
    </div>
  </section>

  <!-- Flight Results Main Grid -->
  <section style="padding: 3rem 0; background: var(--bg-surface-alt, #F8FAFC);">
    <div class="container" style="display:grid; grid-template-columns: 280px 1fr; gap:2rem; align-items:start;">
      <!-- Filters Sidebar -->
      <aside style="background:#FFFFFF; border-radius:14px; padding:1.5rem; border:1px solid #E2E8F0; box-shadow:0 4px 16px rgba(0,0,0,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#082957;">Filters</h3>
          <button style="background:none; border:none; color:#168DE2; font-size:0.8125rem; font-weight:700; cursor:pointer;">Reset All</button>
        </div>

        <!-- Stops -->
        <div style="margin-bottom:1.5rem; border-bottom:1px solid #F1F5F9; padding-bottom:1.25rem;">
          <h4 style="font-size:0.875rem; font-weight:700; color:#475569; margin-bottom:0.75rem;">Stops</h4>
          <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.875rem; cursor:pointer;">
            <input type="checkbox" checked> Non-stop Direct (2)
          </label>
          <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.875rem; cursor:pointer;">
            <input type="checkbox" checked> 1 Stop (3)
          </label>
        </div>

        <!-- Airlines -->
        <div style="margin-bottom:1.5rem; border-bottom:1px solid #F1F5F9; padding-bottom:1.25rem;">
          <h4 style="font-size:0.875rem; font-weight:700; color:#475569; margin-bottom:0.75rem;">Airlines</h4>
          <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.875rem; cursor:pointer;">
            <input type="checkbox" checked> Emirates
          </label>
          <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.875rem; cursor:pointer;">
            <input type="checkbox" checked> Fly Jinnah
          </label>
          <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.875rem; cursor:pointer;">
            <input type="checkbox" checked> Qatar Airways
          </label>
        </div>

        <!-- Price -->
        <div>
          <h4 style="font-size:0.875rem; font-weight:700; color:#475569; margin-bottom:0.75rem;">Max Price (PKR)</h4>
          <input type="range" min="50000" max="250000" value="150000" style="width:100%; accent-color:#168DE2;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#64748B; margin-top:0.25rem;">
            <span>PKR 50k</span>
            <span>PKR 250k</span>
          </div>
        </div>
      </aside>

      <!-- Flight Results List -->
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <!-- Flight 1: Emirates EK 601 -->
        <div class="flight-deal-card" style="background:#FFFFFF; border-radius:14px; padding:1.75rem; border:1px solid #E2E8F0; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <div style="width:56px; height:56px; background:#D71920; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-weight:800; font-size:1.1rem; box-shadow:0 4px 10px rgba(215,25,32,0.3);">
              EK
            </div>
            <div>
              <div style="font-weight:800; font-size:1.15rem; color:#082957;">Emirates <span style="font-size:0.8125rem; color:#64748B; font-weight:600;">(EK 601 &bull; Boeing 777-300ER)</span></div>
              <div style="font-size:0.8125rem; color:#10B981; font-weight:700;"><i class="bi bi-shield-check"></i> Flex Economy &bull; 30kg Baggage &bull; Hot Meals Included</div>
            </div>
          </div>

          <!-- Schedule Times -->
          <div style="display:flex; align-items:center; gap:1.75rem; text-align:center;">
            <div>
              <div style="font-size:1.35rem; font-weight:800; color:#082957;">06:15 AM</div>
              <div style="font-size:0.8125rem; color:#64748B; font-weight:600;"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> KHI</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
              <span style="font-size:0.75rem; color:#64748B; font-weight:600;">2h 30m</span>
              <div style="width:100px; height:2px; background:#CBD5E1; position:relative;">
                <i class="bi bi-airplane-fill" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(90deg); color:#168DE2; font-size:0.85rem;"></i>
              </div>
              <span style="font-size:0.75rem; color:#10B981; font-weight:700;">Non-stop Direct</span>
            </div>
            <div>
              <div style="font-size:1.35rem; font-weight:800; color:#082957;">07:45 AM</div>
              <div style="font-size:0.8125rem; color:#64748B; font-weight:600;"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="AE"> DXB</div>
            </div>
          </div>

          <!-- Price & Booking -->
          <div style="text-align:right;">
            <div style="font-size:0.75rem; color:#64748B; text-transform:uppercase; font-weight:700;">TOTAL FARE</div>
            <div style="font-size:1.6rem; font-weight:800; color:#168DE2;">PKR 82,700</div>
            <div style="font-size:0.75rem; color:#64748B; margin-bottom:0.5rem;">Includes all taxes & baggage</div>
            <a href="flight-details.html?flight=EK601&price=82700" class="btn btn-primary btn-sm">
              Select Flight <i class="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>

        <!-- Flight 2: Fly Jinnah 9P 740 -->
        <div class="flight-deal-card" style="background:#FFFFFF; border-radius:14px; padding:1.75rem; border:1px solid #E2E8F0; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <div style="width:56px; height:56px; background:#01411C; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-weight:800; font-size:1.1rem; box-shadow:0 4px 10px rgba(1,65,28,0.3);">
              9P
            </div>
            <div>
              <div style="font-weight:800; font-size:1.15rem; color:#082957;">Fly Jinnah <span style="font-size:0.8125rem; color:#64748B; font-weight:600;">(9P 740 &bull; Airbus A320)</span></div>
              <div style="font-size:0.8125rem; color:#10B981; font-weight:700;"><i class="bi bi-shield-check"></i> Value Saver &bull; 20kg Baggage &bull; Extra Legroom 32"</div>
            </div>
          </div>

          <!-- Schedule Times -->
          <div style="display:flex; align-items:center; gap:1.75rem; text-align:center;">
            <div>
              <div style="font-size:1.35rem; font-weight:800; color:#082957;">10:30 AM</div>
              <div style="font-size:0.8125rem; color:#64748B; font-weight:600;"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> KHI</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
              <span style="font-size:0.75rem; color:#64748B; font-weight:600;">2h 35m</span>
              <div style="width:100px; height:2px; background:#CBD5E1; position:relative;">
                <i class="bi bi-airplane-fill" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(90deg); color:#168DE2; font-size:0.85rem;"></i>
              </div>
              <span style="font-size:0.75rem; color:#10B981; font-weight:700;">Non-stop Direct</span>
            </div>
            <div>
              <div style="font-size:1.35rem; font-weight:800; color:#082957;">12:05 PM</div>
              <div style="font-size:0.8125rem; color:#64748B; font-weight:600;"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="AE"> DXB</div>
            </div>
          </div>

          <!-- Price & Booking -->
          <div style="text-align:right;">
            <div style="font-size:0.75rem; color:#64748B; text-transform:uppercase; font-weight:700;">TOTAL FARE</div>
            <div style="font-size:1.6rem; font-weight:800; color:#168DE2;">PKR 63,400</div>
            <div style="font-size:0.75rem; color:#64748B; margin-bottom:0.5rem;">Includes all taxes & baggage</div>
            <a href="flight-details.html?flight=9P740&price=63400" class="btn btn-primary btn-sm">
              Select Flight <i class="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>

        <!-- Flight 3: Qatar Airways QR 611 -->
        <div class="flight-deal-card" style="background:#FFFFFF; border-radius:14px; padding:1.75rem; border:1px solid #E2E8F0; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <div style="width:56px; height:56px; background:#5C0632; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-weight:800; font-size:1.1rem; box-shadow:0 4px 10px rgba(92,6,50,0.3);">
              QR
            </div>
            <div>
              <div style="font-weight:800; font-size:1.15rem; color:#082957;">Qatar Airways <span style="font-size:0.8125rem; color:#64748B; font-weight:600;">(QR 611 &bull; Boeing 787 Dreamliner)</span></div>
              <div style="font-size:0.8125rem; color:#10B981; font-weight:700;"><i class="bi bi-shield-check"></i> Economy Classic &bull; 30kg Baggage &bull; Award Winning Service</div>
            </div>
          </div>

          <!-- Schedule Times -->
          <div style="display:flex; align-items:center; gap:1.75rem; text-align:center;">
            <div>
              <div style="font-size:1.35rem; font-weight:800; color:#082957;">03:40 AM</div>
              <div style="font-size:0.8125rem; color:#64748B; font-weight:600;"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> KHI</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
              <span style="font-size:0.75rem; color:#64748B; font-weight:600;">6h 10m</span>
              <div style="width:100px; height:2px; background:#CBD5E1; position:relative;">
                <i class="bi bi-airplane-fill" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(90deg); color:#168DE2; font-size:0.85rem;"></i>
              </div>
              <span style="font-size:0.75rem; color:#F59E0B; font-weight:700;">1 Stop (DOH)</span>
            </div>
            <div>
              <div style="font-size:1.35rem; font-weight:800; color:#082957;">08:50 AM</div>
              <div style="font-size:0.8125rem; color:#64748B; font-weight:600;"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="AE"> DXB</div>
            </div>
          </div>

          <!-- Price & Booking -->
          <div style="text-align:right;">
            <div style="font-size:0.75rem; color:#64748B; text-transform:uppercase; font-weight:700;">TOTAL FARE</div>
            <div style="font-size:1.6rem; font-weight:800; color:#168DE2;">PKR 74,500</div>
            <div style="font-size:0.75rem; color:#64748B; margin-bottom:0.5rem;">Includes all taxes & baggage</div>
            <a href="flight-details.html?flight=QR611&price=74500" class="btn btn-primary btn-sm">
              Select Flight <i class="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  const fullHtml = headerHtml + resultsBody + footerHtml;
  fs.writeFileSync(path.join(rootDesktop, 'pages', 'flights-results.html'), fullHtml, 'utf8');
  fs.writeFileSync(path.join(rootScratch, 'pages', 'flights-results.html'), fullHtml, 'utf8');
  console.log('Updated flights-results.html with airline cards and country flags.');
}

// 4. UPDATE FLIGHT-DETAILS.HTML WITH AUTHENTIC 3D CABIN & 2D BLUEPRINT
function updateFlightDetailsHtml() {
  const filePath = path.join(rootDesktop, 'pages', 'flight-details.html');
  const headerHtml = getHeader('Flight Itinerary & Fare Breakdown', 'flights', 1);
  const footerHtml = getFooter(1);

  const detailsBody = `
  <!-- Flight Details Section -->
  <section style="background: linear-gradient(135deg, #082957 0%, #168DE2 100%); color:#FFFFFF; padding: 3rem 0;">
    <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
      <div>
        <span class="badge" style="background:rgba(255,255,255,0.15); color:#FFFFFF; margin-bottom:0.5rem; padding:0.35rem 0.85rem; border-radius:999px;">
          <i class="bi bi-airplane-fill"></i> Selected Flight Schedule
        </span>
        <h1 style="font-size:2.25rem; font-weight:800; margin-top:0.35rem;">
          <img src="https://flagcdn.com/w36/pk.png" class="flag-icon-lg" alt="PK"> Karachi (KHI) ➔ <img src="https://flagcdn.com/w36/ae.png" class="flag-icon-lg" alt="AE"> Dubai (DXB)
        </h1>
        <p style="opacity:0.9; margin-top:0.4rem;">Emirates &bull; Flight EK-601 &bull; Boeing 777-300ER Wide-Body Aircraft</p>
      </div>
      <div>
        <div style="font-size:0.8125rem; opacity:0.8; text-transform:uppercase; font-weight:700;">TOTAL FARE PER ADULT</div>
        <div style="font-size:2rem; font-weight:800; color:#38BDF8;">PKR 82,700</div>
      </div>
    </div>
  </section>

  <!-- Interactive 3D Aircraft Cabin & Seat Selection ("Asli Jahaz") -->
  <section class="cabin-experience-section" style="padding: 4rem 0; background:#081B38;">
    <div class="container">
      <div class="cabin-experience-grid">
        <!-- Seat Info & Selection Summary -->
        <div class="cabin-info-col">
          <span class="badge badge-gold" style="margin-bottom:0.75rem;"><i class="bi bi-airplane-fill"></i> Authentic 3D Aircraft Interior</span>
          <h2 style="font-size:2.2rem; font-weight:800; margin-bottom:0.75rem; color:#FFFFFF;">Select Your Seat (Boeing 777)</h2>
          <p style="color:#94A3B8; line-height:1.6; margin-bottom:1.5rem;">
            Explore the authentic Boeing 777-300ER passenger cabin. View daylight passing through oval passenger windows, inspect overhead luggage compartments, and select your preferred window, aisle, or extra-legroom seat.
          </p>

          <div class="cabin-legend" style="display:flex; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
            <div class="legend-item" style="display:flex; align-items:center; gap:0.4rem; font-size:0.8125rem;"><span class="legend-box available" style="width:14px; height:14px; background:#168DE2; border-radius:3px;"></span> Standard Available</div>
            <div class="legend-item" style="display:flex; align-items:center; gap:0.4rem; font-size:0.8125rem;"><span class="legend-box selected" style="width:14px; height:14px; background:#F59E0B; border-radius:3px;"></span> Selected Seat</div>
            <div class="legend-item" style="display:flex; align-items:center; gap:0.4rem; font-size:0.8125rem;"><span class="legend-box premium" style="width:14px; height:14px; background:#7C3AED; border-radius:3px;"></span> First / Extra Legroom</div>
            <div class="legend-item" style="display:flex; align-items:center; gap:0.4rem; font-size:0.8125rem;"><span class="legend-box occupied" style="width:14px; height:14px; background:#334155; border-radius:3px;"></span> Occupied</div>
          </div>

          <div style="background:rgba(255,255,255,0.08); padding:1.25rem; border-radius:12px; margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.12);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
              <span>Selected Seat Number:</span>
              <strong id="selected-seat-display" style="color:#F59E0B; font-size:1.15rem;">14B (Standard Economy)</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
              <span>Seat Selection Surcharge:</span>
              <strong id="seat-fee-display" style="color:#38BDF8;">PKR 0 (Included)</strong>
            </div>
          </div>

          <a href="flight-passengers.html" class="btn btn-primary btn-lg" style="width:100%; justify-content:center;">
            <i class="bi bi-person-fill-check"></i> Continue to Passenger Information
          </a>
        </div>

        <!-- 3D / 2D Cabin Stage -->
        <div class="cabin-stage-wrap">
          <div class="cabin-controls-bar">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <i class="bi bi-airplane-engines" style="color:#38BDF8; font-size:1.2rem;"></i>
              <span style="font-size:0.875rem; font-weight:700;">Aircraft: Boeing 777-300ER Wide-Body</span>
            </div>
            <div class="cabin-view-toggle">
              <button class="toggle-btn active" id="btn-view-3d" onclick="toggleCabinView('3d')">3D Cabin View</button>
              <button class="toggle-btn" id="btn-view-2d" onclick="toggleCabinView('2d')">2D Aircraft Blueprint</button>
            </div>
          </div>

          <!-- 3D Three.js Viewport (Authentic Cylindrical Fuselage Interior) -->
          <div id="cabin3d-viewport"></div>

          <!-- 2D Aircraft Blueprint Map -->
          <div id="cabin2d-fallback" class="seatmap-2d-container" style="display:none;"></div>
        </div>
      </div>
    </div>
  </section>

  <script src="../js/seatmap3d.js"></script>
  <script>
    let mySeatMap = null;
    document.addEventListener('DOMContentLoaded', () => {
      mySeatMap = new MyTravelSeatMap('cabin3d-viewport', 'cabin2d-fallback', {
        basePrice: 82700,
        currency: 'PKR'
      });
    });

    function toggleCabinView(mode) {
      document.getElementById('btn-view-3d').classList.toggle('active', mode === '3d');
      document.getElementById('btn-view-2d').classList.toggle('active', mode === '2d');
      if (mySeatMap) mySeatMap.toggleView(mode);
    }
  </script>
  `;

  const fullHtml = headerHtml + detailsBody + footerHtml;
  fs.writeFileSync(path.join(rootDesktop, 'pages', 'flight-details.html'), fullHtml, 'utf8');
  fs.writeFileSync(path.join(rootScratch, 'pages', 'flight-details.html'), fullHtml, 'utf8');
  console.log('Updated flight-details.html with authentic 3D cabin and 2D blueprint.');
}

// 5. UPDATE ALL SUBPAGES (HEADER, ACCREDITATION STRIP, FOOTER UNIFORMITY)
function updateAllSubpages() {
  const pagesDir = path.join(rootDesktop, 'pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    // Skip if already custom updated above
    if (['flights.html', 'flights-results.html', 'flight-details.html'].includes(file)) return;

    const filePath = path.join(pagesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace header
    const cleanHeaderPart = getHeader('MyTravel.pk', 'general', 1);
    const headerMatch = html.match(/<header class="main-header">[\s\S]*?<\/header>/);
    if (headerMatch) {
      const newHeaderOnly = cleanHeaderPart.substring(
        cleanHeaderPart.indexOf('<header class="main-header">'),
        cleanHeaderPart.indexOf('</header>') + 9
      );
      html = html.replace(/<header class="main-header">[\s\S]*?<\/header>/, newHeaderOnly);
    }

    // Ensure top-bar matches
    const topBarMatch = html.match(/<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>/);
    if (topBarMatch) {
      const newTopBar = cleanHeaderPart.substring(
        cleanHeaderPart.indexOf('<div class="top-bar">'),
        cleanHeaderPart.indexOf('<!-- Main Header')
      );
      html = html.replace(/<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>/, newTopBar.trim());
    }

    // Ensure accreditation strip is present above footer
    const cleanFooterPart = getFooter(1);
    const stripHtml = cleanFooterPart.substring(
      cleanFooterPart.indexOf('<!-- Official Accreditation'),
      cleanFooterPart.indexOf('<!-- Master Dark Navy Footer')
    );

    if (!html.includes('accreditation-trust-strip')) {
      html = html.replace('<footer class="main-footer">', stripHtml + '\n  <footer class="main-footer">');
    }

    // Save
    fs.writeFileSync(filePath, html, 'utf8');
    fs.writeFileSync(path.join(rootScratch, 'pages', file), html, 'utf8');
  });

  console.log(`Synchronized headers and footers across ${files.length} main pages.`);
}

// Run all updates
updateIndexHtml();
updateFlightsHtml();
updateFlightsResultsHtml();
updateFlightDetailsHtml();
updateAllSubpages();

console.log('=== COMPLETE SYNCHRONIZATION FINISHED SUCCESSFULLY ===');
