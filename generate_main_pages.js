const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./template_helper');

const pagesDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/pages';

// 1. ABOUT US
const aboutHtml = `${getHeader('About Us - Leadership & Credentials', 'about')}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <div style="max-width:900px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:3rem;">
        <span class="badge badge-blue" style="margin-bottom:0.75rem;"><i class="bi bi-patch-check-fill"></i> Verified Travel Leadership</span>
        <h1 style="font-size:2.75rem; color:var(--navy-deep); line-height:1.2; margin-bottom:1rem;">
          Making Global Travel Seamless, Transparent & Memorable
        </h1>
        <p style="font-size:1.1rem; color:var(--text-muted); line-height:1.7;">
          Operated by seasoned travel professionals with more than <strong>15 years of industry leadership</strong> in Pakistan's tourism and aviation sectors, <strong>MyTravel.pk</strong> is dedicated to delivering complete ease, authenticity, and maximum value.
        </p>
      </div>

      <!-- CEO Message Box -->
      <div style="background:var(--bg-page); border-left:5px solid var(--primary-blue); padding:2rem; border-radius:12px; margin-bottom:3rem; box-shadow:var(--shadow-subtle);">
        <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1rem;">
          <div style="width:56px; height:56px; border-radius:50%; background:var(--primary-blue); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:800;">
            AB
          </div>
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.2rem;">Ahsan Bhatti</h3>
            <span style="font-size:0.875rem; color:var(--primary-blue); font-weight:700;"><i class="bi bi-award-fill"></i> Founder & Chief Executive Officer</span>
          </div>
        </div>
        <p style="font-size:1rem; color:var(--text-main); line-height:1.7; font-style:italic;">
          "We are a full-service travel company in Pakistan providing dedicated services for international air tickets, worldwide hotels, customized tours, Schengen and worldwide travel insurance, tourist visas, sight-seeing, and airport departure lounges. We bring our deep technical expertise and genuine human care into booking every single itinerary for our esteemed clients."
        </p>
      </div>

      <!-- Credentials & Pillars Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.75rem; margin-bottom:3.5rem;">
        <div style="background:#FFFFFF; border:1px solid var(--border-light); padding:1.75rem; border-radius:14px; box-shadow:var(--shadow-card);">
          <div style="width:48px; height:48px; border-radius:10px; background:var(--primary-light); color:var(--primary-blue); display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin-bottom:1.25rem;">
            <i class="bi bi-award-fill"></i>
          </div>
          <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:0.5rem;">DTS Licensed Agency</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6;">Fully licensed and registered by the Department of Tourist Services (DTS), Government of Pakistan for domestic and international travel operations.</p>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-light); padding:1.75rem; border-radius:14px; box-shadow:var(--shadow-card);">
          <div style="width:48px; height:48px; border-radius:10px; background:var(--gold-light); color:#B45309; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin-bottom:1.25rem;">
            <i class="bi bi-globe-americas"></i>
          </div>
          <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:0.5rem;">IATA TIDS Member</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6;">Official International Air Transport Association (IATA) TIDS validated travel partner, ensuring global airline reservation compliance and security.</p>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-light); padding:1.75rem; border-radius:14px; box-shadow:var(--shadow-card);">
          <div style="width:48px; height:48px; border-radius:10px; background:var(--emerald-light); color:var(--emerald-success); display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin-bottom:1.25rem;">
            <i class="bi bi-shield-check"></i>
          </div>
          <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:0.5rem;">Adamjee & UIC Partner</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6;">Authorized corporate agent providing instant embassy-approved Schengen, UK, and worldwide travel insurance policies with real-time tracking.</p>
        </div>
      </div>

      <!-- Quick Action CTA -->
      <div style="text-align:center; background:linear-gradient(135deg, var(--navy-deep) 0%, var(--navy-primary) 100%); padding:2.5rem; border-radius:16px; color:#FFFFFF;">
        <h3 style="color:#FFFFFF; font-size:1.6rem; margin-bottom:0.75rem;">Experience The MyTravel Difference</h3>
        <p style="color:#CBD5E1; margin-bottom:1.5rem; max-width:600px; margin-left:auto; margin-right:auto;">Book flights with transparent pricing, apply for e-visas with document guidance, or get instant embassy insurance in minutes.</p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <a href="flights.html" class="btn btn-primary"><i class="bi bi-airplane-fill"></i> Search Flights</a>
          <a href="contact.html" class="btn btn-outline" style="color:var(--navy-deep);"><i class="bi bi-telephone-fill"></i> Talk to a Travel Expert</a>
        </div>
      </div>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'about.html'), aboutHtml);

// 2. OUR SERVICES
const servicesHtml = `${getHeader('Our Services - End-to-End Travel Solutions', 'about')}
<section class="section-padding">
  <div class="container">
    <div class="section-header">
      <span class="section-subtitle"><i class="bi bi-stars"></i> Comprehensive Solutions</span>
      <h1 class="section-title">End-to-End Travel Services</h1>
      <p class="section-desc">From instant airline tickets and embassy-compliant insurance to expedited tourist e-visas and VIP airport departure lounge access.</p>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:2rem;">
      <!-- Service 1: Flights -->
      <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="width:52px; height:52px; border-radius:12px; background:var(--primary-light); color:var(--primary-blue); display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
            <i class="bi bi-airplane-engines"></i>
          </div>
          <h3 style="font-size:1.3rem; color:var(--navy-deep); margin-bottom:0.75rem;">Flight Reservations</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">
            Direct ticketing across major domestic and international carriers including PIA, Emirates, Qatar Airways, AirSial, Fly Jinnah, Saudia, and Azerbaijan Airlines with verified fare transparency and 3D seat mapping.
          </p>
        </div>
        <a href="flights.html" class="btn btn-primary btn-sm"><i class="bi bi-search"></i> Book Flights Online</a>
      </div>

      <!-- Service 2: Tourist Visas -->
      <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="width:52px; height:52px; border-radius:12px; background:var(--gold-light); color:#B45309; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
            <i class="bi bi-passport-fill"></i>
          </div>
          <h3 style="font-size:1.3rem; color:var(--navy-deep); margin-bottom:0.75rem;">Tourist Visas</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">
            Comprehensive tourist visit visa processing for Azerbaijan e-Visa, Thailand, Malaysia, Singapore, Dubai/UAE, Turkey, UK, USA, and Schengen with complete document preparation support.
          </p>
        </div>
        <a href="visas.html" class="btn btn-gold btn-sm"><i class="bi bi-passport"></i> Explore Visa Services</a>
      </div>

      <!-- Service 3: Travel Insurance -->
      <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="width:52px; height:52px; border-radius:12px; background:var(--emerald-light); color:var(--emerald-success); display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
            <i class="bi bi-shield-check"></i>
          </div>
          <h3 style="font-size:1.3rem; color:var(--navy-deep); margin-bottom:0.75rem;">Travel Insurance</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">
            Instant online insurance policy generation authorized by Adamjee Insurance and United Insurance Company (UIC). 100% compliant with Schengen embassy requirements and Covid-19 coverage.
          </p>
        </div>
        <a href="insurance.html" class="btn btn-outline btn-sm"><i class="bi bi-shield-check"></i> Compare Insurance</a>
      </div>

      <!-- Service 4: Excursions & Holiday Tours -->
      <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="width:52px; height:52px; border-radius:12px; background:#F5F3FF; color:#7C3AED; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
            <i class="bi bi-compass-fill"></i>
          </div>
          <h3 style="font-size:1.3rem; color:var(--navy-deep); margin-bottom:0.75rem;">Excursions & Holiday Tours</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">
            Curated sightseeing activities, desert safaris in Dubai, city tours in Baku and Istanbul, island excursions in Thailand, and bespoke family vacation packages with verified local guides.
          </p>
        </div>
        <a href="excursions.html" class="btn btn-outline btn-sm"><i class="bi bi-compass"></i> View Excursions</a>
      </div>

      <!-- Service 5: Airline Offices Directory -->
      <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="width:52px; height:52px; border-radius:12px; background:var(--primary-light); color:var(--primary-blue); display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
            <i class="bi bi-buildings"></i>
          </div>
          <h3 style="font-size:1.3rem; color:var(--navy-deep); margin-bottom:0.75rem;">Airline Offices Directory</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">
            Official direct contact numbers, city office locations in Karachi, Lahore, and Islamabad, UAN hotlines, and hub details for over 30 international and domestic airline carriers operating in Pakistan.
          </p>
        </div>
        <a href="airline-offices.html" class="btn btn-outline btn-sm"><i class="bi bi-telephone-outbound"></i> Airline Directory</a>
      </div>

      <!-- Service 6: Departure Lounges & Concierge -->
      <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="width:52px; height:52px; border-radius:12px; background:var(--gold-light); color:#B45309; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
            <i class="bi bi-cup-hot-fill"></i>
          </div>
          <h3 style="font-size:1.3rem; color:var(--navy-deep); margin-bottom:0.75rem;">Airport Lounge Access</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">
            VIP CIP and executive departure lounge reservations at Karachi (JINNAH), Lahore (AIIAP), and Islamabad (IIAP) airports for smooth, relaxing pre-flight airport hospitality.
          </p>
        </div>
        <a href="contact.html" class="btn btn-outline btn-sm"><i class="bi bi-chat-dots"></i> Inquire Lounge Access</a>
      </div>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'services.html'), servicesHtml);

// 3. FLIGHT SEARCH & BOOKING ENGINE (WITH COUNTRY FLAGS & REAL AIRLINES)
const flightsHtml = `${getHeader('Book Flights - Compare Air Tickets in Pakistan', 'flights')}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <div class="section-header">
      <span class="section-subtitle"><i class="bi bi-airplane-fill"></i> Real-Time Fare Search</span>
      <h1 class="section-title">Search & Compare Air Tickets</h1>
      <p class="section-desc">Search domestic flights across Pakistan and international routes worldwide with transparent fare breakdowns and verified airline credentials.</p>
    </div>

    <!-- Booking Card Component -->
    <div style="background:#FFFFFF; border:1px solid var(--border-card); border-radius:16px; padding:2rem; box-shadow:var(--shadow-card); margin-bottom:4rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-light); padding-bottom:1rem;">
        <div style="display:flex; gap:1.5rem;">
          <label style="display:inline-flex; align-items:center; gap:0.4rem; font-weight:600; cursor:pointer;">
            <input type="radio" name="flightTripType" value="roundtrip" checked onchange="toggleFlightTrip(this.value)"> <i class="bi bi-arrow-left-right"></i> Round Trip
          </label>
          <label style="display:inline-flex; align-items:center; gap:0.4rem; font-weight:600; cursor:pointer;">
            <input type="radio" name="flightTripType" value="oneway" onchange="toggleFlightTrip(this.value)"> <i class="bi bi-arrow-right"></i> One Way
          </label>
          <label style="display:inline-flex; align-items:center; gap:0.4rem; font-weight:600; cursor:pointer;">
            <input type="radio" name="flightTripType" value="multicity" onchange="toggleFlightTrip(this.value)"> <i class="bi bi-diagram-3"></i> Multi-City
          </label>
        </div>
        <span class="flag-badge"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> DTS Licensed Booking Engine</span>
      </div>

      <form id="main-flights-form" onsubmit="executeFlightSearch(event)">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">
          <!-- Origin -->
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">ORIGIN AIRPORT (PAKISTAN)</label>
            <div style="position:relative;">
              <select id="fl-origin" style="width:100%; padding:0.85rem 1rem 0.85rem 2.5rem; border:1px solid var(--border-light); border-radius:10px; font-weight:600; background:#FFFFFF;">
                <option value="KHI" selected>🇵🇰 Karachi (KHI) - Jinnah Intl</option>
                <option value="LHE">🇵🇰 Lahore (LHE) - Allama Iqbal Intl</option>
                <option value="ISB">🇵🇰 Islamabad (ISB) - Islamabad Intl</option>
                <option value="PEW">🇵🇰 Peshawar (PEW) - Bacha Khan</option>
                <option value="MUX">🇵🇰 Multan (MUX) - Multan Intl</option>
                <option value="SKT">🇵🇰 Sialkot (SKT) - Sialkot Intl</option>
              </select>
              <i class="bi bi-geo-alt-fill" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--primary-blue);"></i>
            </div>
          </div>

          <!-- Destination -->
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">DESTINATION</label>
            <div style="position:relative;">
              <select id="fl-dest" style="width:100%; padding:0.85rem 1rem 0.85rem 2.5rem; border:1px solid var(--border-light); border-radius:10px; font-weight:600; background:#FFFFFF;">
                <option value="DXB" selected>🇦🇪 Dubai (DXB) - UAE</option>
                <option value="GYD">🇦🇿 Baku (GYD) - Azerbaijan</option>
                <option value="LHR">🇬🇧 London Heathrow (LHR) - UK</option>
                <option value="DOH">🇶🇦 Doha (DOH) - Qatar</option>
                <option value="JED">🇸🇦 Jeddah (JED) - Saudi Arabia</option>
                <option value="IST">🇹🇷 Istanbul (IST) - Turkey</option>
                <option value="BKK">🇹🇭 Bangkok (BKK) - Thailand</option>
                <option value="KUL">🇲🇾 Kuala Lumpur (KUL) - Malaysia</option>
                <option value="SIN">🇸🇬 Singapore Changi (SIN)</option>
                <option value="JFK">🇺🇸 New York (JFK) - USA</option>
                <option value="YYZ">🇨🇦 Toronto (YYZ) - Canada</option>
              </select>
              <i class="bi bi-pin-map-fill" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--rose-danger);"></i>
            </div>
          </div>

          <!-- Departure Date -->
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">DEPARTURE DATE</label>
            <div style="position:relative;">
              <input type="date" id="fl-dep-date" value="2026-11-20" style="width:100%; padding:0.85rem 1rem 0.85rem 2.5rem; border:1px solid var(--border-light); border-radius:10px; font-weight:600;">
              <i class="bi bi-calendar-event" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--primary-blue);"></i>
            </div>
          </div>

          <!-- Return Date -->
          <div id="fl-return-group">
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">RETURN DATE</label>
            <div style="position:relative;">
              <input type="date" id="fl-ret-date" value="2026-11-28" style="width:100%; padding:0.85rem 1rem 0.85rem 2.5rem; border:1px solid var(--border-light); border-radius:10px; font-weight:600;">
              <i class="bi bi-calendar-check" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--primary-blue);"></i>
            </div>
          </div>

          <!-- Passengers -->
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">TRAVELERS & CLASS</label>
            <div style="position:relative;">
              <select id="fl-pax" style="width:100%; padding:0.85rem 1rem 0.85rem 2.5rem; border:1px solid var(--border-light); border-radius:10px; font-weight:600; background:#FFFFFF;">
                <option value="1">1 Adult (Economy)</option>
                <option value="2">2 Adults (Economy)</option>
                <option value="family">Family (2 Adults + 2 Children)</option>
                <option value="business">1 Adult (Business Class)</option>
              </select>
              <i class="bi bi-people-fill" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--primary-blue);"></i>
            </div>
          </div>
        </div>

        <!-- Search Action Button -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--text-muted); align-self:center;">Popular Searches:</span>
            <a href="flights-results.html?origin=KHI&dest=DXB" class="country-pill"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> KHI &rarr; <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> DXB</a>
            <a href="flights-results.html?origin=LHE&dest=GYD" class="country-pill"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> LHE &rarr; <img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="AZ"> GYD</a>
            <a href="flights-results.html?origin=ISB&dest=LHR" class="country-pill"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> ISB &rarr; <img src="https://flagcdn.com/w24/gb.png" class="flag-icon" alt="UK"> LHR</a>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="min-width:200px;">
            <i class="bi bi-airplane-fill"></i> Find Flights Now
          </button>
        </div>
      </form>
    </div>

    <!-- Popular Flight Routes from Pakistan (WITH COUNTRY FLAGS & MODERN CARDS) -->
    <div style="margin-top:4rem;">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <span class="badge badge-gold" style="margin-bottom:0.5rem;"><i class="bi bi-fire"></i> Best Fare Guarantees</span>
          <h2 style="font-size:1.85rem; color:var(--navy-deep);">Popular Flight Routes from Pakistan</h2>
          <p style="color:var(--text-muted); font-size:0.95rem;">Verified direct routes and connecting options operating regularly across major hubs.</p>
        </div>
        <a href="airline-offices.html" class="btn btn-outline btn-sm"><i class="bi bi-buildings"></i> View Airline Directory</a>
      </div>

      <div class="routes-card-table-wrap">
        <table class="routes-table">
          <thead>
            <tr>
              <th>Flight Route</th>
              <th>Operating Airlines</th>
              <th>Average Flight Duration</th>
              <th>Starting Fare (Round Trip)</th>
              <th style="text-align:right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Route 1: KHI to DXB -->
            <tr>
              <td>
                <div class="route-cell-content">
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI)</span>
                  <i class="bi bi-arrow-right route-arrow"></i>
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)</span>
                </div>
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:var(--text-main);">
                  <span class="badge badge-blue">EK</span> Emirates, Fly Jinnah, Flydubai
                </div>
              </td>
              <td><span class="duration-pill"><i class="bi bi-clock-history"></i> 2h 30m (Direct)</span></td>
              <td><span class="route-price">PKR 63,400</span></td>
              <td style="text-align:right;">
                <a href="flights-results.html?origin=KHI&dest=DXB" class="btn btn-sm btn-primary">
                  <i class="bi bi-search"></i> Check Fares
                </a>
              </td>
            </tr>

            <!-- Route 2: LHE to GYD -->
            <tr>
              <td>
                <div class="route-cell-content">
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Lahore (LHE)</span>
                  <i class="bi bi-arrow-right route-arrow"></i>
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="Azerbaijan"> Baku (GYD)</span>
                </div>
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:var(--text-main);">
                  <span class="badge badge-blue">J2</span> Azerbaijan Airlines (Direct)
                </div>
              </td>
              <td><span class="duration-pill"><i class="bi bi-clock-history"></i> 4h 15m (Direct)</span></td>
              <td><span class="route-price">PKR 106,500</span></td>
              <td style="text-align:right;">
                <a href="flights-results.html?origin=LHE&dest=GYD" class="btn btn-sm btn-primary">
                  <i class="bi bi-search"></i> Check Fares
                </a>
              </td>
            </tr>

            <!-- Route 3: ISB to LHR -->
            <tr>
              <td>
                <div class="route-cell-content">
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Islamabad (ISB)</span>
                  <i class="bi bi-arrow-right route-arrow"></i>
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/gb.png" class="flag-icon" alt="United Kingdom"> London (LHR)</span>
                </div>
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:var(--text-main);">
                  <span class="badge badge-blue">BA</span> British Airways, Qatar Airways, PIA
                </div>
              </td>
              <td><span class="duration-pill"><i class="bi bi-clock-history"></i> 8h 55m (Direct)</span></td>
              <td><span class="route-price">PKR 203,000</span></td>
              <td style="text-align:right;">
                <a href="flights-results.html?origin=ISB&dest=LHR" class="btn btn-sm btn-primary">
                  <i class="bi bi-search"></i> Check Fares
                </a>
              </td>
            </tr>

            <!-- Route 4: KHI to DOH -->
            <tr>
              <td>
                <div class="route-cell-content">
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI)</span>
                  <i class="bi bi-arrow-right route-arrow"></i>
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/qa.png" class="flag-icon" alt="Qatar"> Doha (DOH)</span>
                </div>
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:var(--text-main);">
                  <span class="badge badge-blue">QR</span> Qatar Airways (5-Star)
                </div>
              </td>
              <td><span class="duration-pill"><i class="bi bi-clock-history"></i> 3h 10m (Direct)</span></td>
              <td><span class="route-price">PKR 74,500</span></td>
              <td style="text-align:right;">
                <a href="flights-results.html?origin=KHI&dest=DOH" class="btn btn-sm btn-primary">
                  <i class="bi bi-search"></i> Check Fares
                </a>
              </td>
            </tr>

            <!-- Route 5: LHE to JED -->
            <tr>
              <td>
                <div class="route-cell-content">
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Lahore (LHE)</span>
                  <i class="bi bi-arrow-right route-arrow"></i>
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/sa.png" class="flag-icon" alt="Saudi Arabia"> Jeddah (JED)</span>
                </div>
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:var(--text-main);">
                  <span class="badge badge-blue">SV</span> Saudia, PIA, Airblue
                </div>
              </td>
              <td><span class="duration-pill"><i class="bi bi-clock-history"></i> 5h 20m (Direct)</span></td>
              <td><span class="route-price">PKR 92,000</span></td>
              <td style="text-align:right;">
                <a href="flights-results.html?origin=LHE&dest=JED" class="btn btn-sm btn-primary">
                  <i class="bi bi-search"></i> Check Fares
                </a>
              </td>
            </tr>

            <!-- Route 6: ISB to IST -->
            <tr>
              <td>
                <div class="route-cell-content">
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Islamabad (ISB)</span>
                  <i class="bi bi-arrow-right route-arrow"></i>
                  <span class="route-city-code"><img src="https://flagcdn.com/w24/tr.png" class="flag-icon" alt="Turkey"> Istanbul (IST)</span>
                </div>
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:var(--text-main);">
                  <span class="badge badge-blue">TK</span> Turkish Airlines, Pegasus
                </div>
              </td>
              <td><span class="duration-pill"><i class="bi bi-clock-history"></i> 6h 10m (Direct)</span></td>
              <td><span class="route-price">PKR 118,000</span></td>
              <td style="text-align:right;">
                <a href="flights-results.html?origin=ISB&dest=IST" class="btn btn-sm btn-primary">
                  <i class="bi bi-search"></i> Check Fares
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<script>
  function toggleFlightTrip(val) {
    const retGrp = document.getElementById('fl-return-group');
    if (retGrp) {
      retGrp.style.opacity = val === 'oneway' ? '0.4' : '1';
      retGrp.querySelector('input').disabled = (val === 'oneway');
    }
  }

  function executeFlightSearch(e) {
    e.preventDefault();
    const orig = document.getElementById('fl-origin').value;
    const dest = document.getElementById('fl-dest').value;
    window.location.href = 'flights-results.html?origin=' + orig + '&dest=' + dest;
  }
</script>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'flights.html'), flightsHtml);

// 4. FLIGHTS RESULTS (WITH REAL AIRLINE BADGES, COUNTRY FLAGS & 3D CABIN HOOK)
const flightsResultsHtml = `${getHeader('Available Flights - Results', 'flights')}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container">
    <!-- Top Route Banner with Country Flags -->
    <div style="background:#FFFFFF; padding:1.5rem 2rem; border-radius:16px; border:1px solid var(--border-card); margin-bottom:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.25rem; box-shadow:var(--shadow-card);">
      <div>
        <span class="badge badge-blue" style="margin-bottom:0.35rem;"><i class="bi bi-check-circle-fill"></i> Live Flight Inventory</span>
        <h2 style="font-size:1.6rem; color:var(--navy-deep); margin:0.25rem 0;" id="results-route-title">
          <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI) 
          <i class="bi bi-arrow-right" style="color:var(--primary-blue); font-size:1.2rem; margin:0 0.5rem;"></i> 
          <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)
        </h2>
        <span style="font-size:0.875rem; color:var(--text-muted);" id="results-meta-info">Round Trip • 1 Adult • Economy Class • Verified DTS Agent Fares</span>
      </div>
      <div>
        <a href="flights.html" class="btn btn-outline btn-sm"><i class="bi bi-pencil-square"></i> Modify Search</a>
      </div>
    </div>

    <!-- Results Layout: Filters on Left, Flight Cards on Right -->
    <div class="results-layout">
      <!-- Filters Sidebar -->
      <aside class="filter-sidebar">
        <div class="filter-title">
          <span><i class="bi bi-sliders"></i> Filter Flights</span>
          <button style="background:none; border:none; color:var(--primary-blue); font-size:0.8125rem; font-weight:700; cursor:pointer;" onclick="resetFilters()">Reset All</button>
        </div>

        <!-- Stops Filter -->
        <div class="filter-group">
          <div style="font-size:0.875rem; font-weight:700; color:var(--navy-deep); margin-bottom:0.75rem;">Stops</div>
          <label class="filter-checkbox-item">
            <input type="checkbox" id="chk-nonstop" checked onchange="applyFilters()"> Non-stop Direct (2)
          </label>
          <label class="filter-checkbox-item">
            <input type="checkbox" id="chk-1stop" checked onchange="applyFilters()"> 1 Stop (1)
          </label>
        </div>

        <!-- Airlines Filter -->
        <div class="filter-group">
          <div style="font-size:0.875rem; font-weight:700; color:var(--navy-deep); margin-bottom:0.75rem;">Airlines Operating</div>
          <label class="filter-checkbox-item">
            <input type="checkbox" id="chk-air-ek" checked onchange="applyFilters()"> 
            <span class="badge badge-outline" style="font-size:0.7rem; padding:0.15rem 0.4rem;">EK</span> Emirates (1)
          </label>
          <label class="filter-checkbox-item">
            <input type="checkbox" id="chk-air-9p" checked onchange="applyFilters()"> 
            <span class="badge badge-outline" style="font-size:0.7rem; padding:0.15rem 0.4rem;">9P</span> Fly Jinnah (1)
          </label>
          <label class="filter-checkbox-item">
            <input type="checkbox" id="chk-air-qr" checked onchange="applyFilters()"> 
            <span class="badge badge-outline" style="font-size:0.7rem; padding:0.15rem 0.4rem;">QR</span> Qatar Airways (1)
          </label>
          <label class="filter-checkbox-item">
            <input type="checkbox" id="chk-air-pk" checked onchange="applyFilters()"> 
            <span class="badge badge-outline" style="font-size:0.7rem; padding:0.15rem 0.4rem;">PK</span> PIA (1)
          </label>
        </div>

        <!-- Max Price Slider -->
        <div class="filter-group">
          <div style="display:flex; justify-content:space-between; font-size:0.875rem; font-weight:700; margin-bottom:0.5rem;">
            <span>Max Price (PKR)</span>
            <span id="price-slider-label" style="color:var(--primary-blue);">PKR 250,000</span>
          </div>
          <input type="range" id="price-range" min="50000" max="250000" step="5000" value="250000" style="width:100%; accent-color:var(--primary-blue);" oninput="updatePriceFilter(this.value)">
        </div>

        <!-- Trust Box -->
        <div style="background:var(--primary-light); padding:1rem; border-radius:10px; font-size:0.8125rem; color:var(--navy-deep); line-height:1.5;">
          <i class="bi bi-shield-check" style="color:var(--primary-blue); font-size:1.1rem; display:inline-block; margin-bottom:0.25rem;"></i><br>
          <strong>DTS Verified Fares:</strong> All prices shown include standard PCAA taxes, passenger security fees, and fuel surcharges.
        </div>
      </aside>

      <!-- Flight Results List -->
      <main id="flight-results-list">
        <!-- Flight 1: Emirates -->
        <div class="flight-card" data-airline="EK" data-stops="nonstop" data-price="82700">
          <div class="flight-airline-meta">
            <div class="airline-brand-badge emirates">EK</div>
            <div class="flight-airline-info">
              <h4>Emirates</h4>
              <span class="flight-number-tag">Flight EK 601 • Boeing 777-300ER</span>
              <div style="font-size:0.75rem; color:var(--emerald-success); font-weight:700; margin-top:0.2rem;"><i class="bi bi-shield-check"></i> Flex Economy</div>
            </div>
          </div>

          <div class="flight-route-segment">
            <div class="route-stop-point">
              <div class="route-time">06:15 AM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Karachi (KHI)</div>
            </div>

            <div class="route-timeline-wrap">
              <span class="duration-pill"><i class="bi bi-clock"></i> 2h 30m</span>
              <div class="route-timeline-bar">
                <i class="bi bi-airplane-fill route-plane-icon"></i>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--emerald-success);">Non-stop Direct</span>
            </div>

            <div class="route-stop-point">
              <div class="route-time">07:45 AM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)</div>
            </div>
          </div>

          <div class="flight-price-col">
            <span class="price-sub">Total Fare per Adult</span>
            <div class="flight-fare-amount">PKR 82,700</div>
            <span class="flight-tax-tag"><i class="bi bi-check2"></i> Includes all taxes & 30kg baggage</span>
            <a href="flight-details.html?airline=Emirates&flight=EK601&price=82700&from=KHI&to=DXB" class="btn-select-flight">
              Select Flight <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- Flight 2: Fly Jinnah -->
        <div class="flight-card" data-airline="9P" data-stops="nonstop" data-price="63400">
          <div class="flight-airline-meta">
            <div class="airline-brand-badge flyjinnah">9P</div>
            <div class="flight-airline-info">
              <h4>Fly Jinnah</h4>
              <span class="flight-number-tag">Flight 9P 740 • Airbus A320</span>
              <div style="font-size:0.75rem; color:var(--primary-blue); font-weight:700; margin-top:0.2rem;"><i class="bi bi-check-circle"></i> Value Saver Fares</div>
            </div>
          </div>

          <div class="flight-route-segment">
            <div class="route-stop-point">
              <div class="route-time">10:30 AM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Karachi (KHI)</div>
            </div>

            <div class="route-timeline-wrap">
              <span class="duration-pill"><i class="bi bi-clock"></i> 2h 35m</span>
              <div class="route-timeline-bar">
                <i class="bi bi-airplane-fill route-plane-icon"></i>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--emerald-success);">Non-stop Direct</span>
            </div>

            <div class="route-stop-point">
              <div class="route-time">12:05 PM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)</div>
            </div>
          </div>

          <div class="flight-price-col">
            <span class="price-sub">Total Fare per Adult</span>
            <div class="flight-fare-amount">PKR 63,400</div>
            <span class="flight-tax-tag"><i class="bi bi-check2"></i> Includes 20kg baggage</span>
            <a href="flight-details.html?airline=FlyJinnah&flight=9P740&price=63400&from=KHI&to=DXB" class="btn-select-flight">
              Select Flight <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- Flight 3: Qatar Airways -->
        <div class="flight-card" data-airline="QR" data-stops="1stop" data-price="74500">
          <div class="flight-airline-meta">
            <div class="airline-brand-badge qatar">QR</div>
            <div class="flight-airline-info">
              <h4>Qatar Airways</h4>
              <span class="flight-number-tag">Flight QR 611 • Boeing 787</span>
              <div style="font-size:0.75rem; color:#831843; font-weight:700; margin-top:0.2rem;"><i class="bi bi-award"></i> 5-Star Experience</div>
            </div>
          </div>

          <div class="flight-route-segment">
            <div class="route-stop-point">
              <div class="route-time">03:40 AM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Karachi (KHI)</div>
            </div>

            <div class="route-timeline-wrap">
              <span class="duration-pill"><i class="bi bi-clock"></i> 6h 10m</span>
              <div class="route-timeline-bar">
                <i class="bi bi-airplane-fill route-plane-icon"></i>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--amber-warning);">1 Stop via Doha (DOH)</span>
            </div>

            <div class="route-stop-point">
              <div class="route-time">08:50 AM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)</div>
            </div>
          </div>

          <div class="flight-price-col">
            <span class="price-sub">Total Fare per Adult</span>
            <div class="flight-fare-amount">PKR 74,500</div>
            <span class="flight-tax-tag"><i class="bi bi-check2"></i> Full in-flight meal included</span>
            <a href="flight-details.html?airline=QatarAirways&flight=QR611&price=74500&from=KHI&to=DXB" class="btn-select-flight">
              Select Flight <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- Flight 4: PIA -->
        <div class="flight-card" data-airline="PK" data-stops="nonstop" data-price="203000">
          <div class="flight-airline-meta">
            <div class="airline-brand-badge pia">PK</div>
            <div class="flight-airline-info">
              <h4>Pakistan International (PIA)</h4>
              <span class="flight-number-tag">Flight PK 787 • Boeing 777-200ER</span>
              <div style="font-size:0.75rem; color:#065F46; font-weight:700; margin-top:0.2rem;"><i class="bi bi-shield-check"></i> National Carrier</div>
            </div>
          </div>

          <div class="flight-route-segment">
            <div class="route-stop-point">
              <div class="route-time">11:20 AM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="PK"> Islamabad (ISB)</div>
            </div>

            <div class="route-timeline-wrap">
              <span class="duration-pill"><i class="bi bi-clock"></i> 8h 55m</span>
              <div class="route-timeline-bar">
                <i class="bi bi-airplane-fill route-plane-icon"></i>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--emerald-success);">Non-stop Direct</span>
            </div>

            <div class="route-stop-point">
              <div class="route-time">04:15 PM</div>
              <div class="route-airport-tag"><img src="https://flagcdn.com/w24/gb.png" class="flag-icon" alt="UK"> London (LHR)</div>
            </div>
          </div>

          <div class="flight-price-col">
            <span class="price-sub">Total Fare per Adult</span>
            <div class="flight-fare-amount">PKR 203,000</div>
            <span class="flight-tax-tag"><i class="bi bi-check2"></i> 2 Pieces 23kg Baggage</span>
            <a href="flight-details.html?airline=PIA&flight=PK787&price=203000&from=ISB&to=LHR" class="btn-select-flight">
              Select Flight <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </main>
    </div>
  </div>
</section>

<script>
  function updatePriceFilter(val) {
    document.getElementById('price-slider-label').textContent = 'PKR ' + parseInt(val).toLocaleString();
    applyFilters();
  }

  function applyFilters() {
    const showNonstop = document.getElementById('chk-nonstop').checked;
    const show1stop = document.getElementById('chk-1stop').checked;
    const ek = document.getElementById('chk-air-ek').checked;
    const jinnah = document.getElementById('chk-air-9p').checked;
    const qr = document.getElementById('chk-air-qr').checked;
    const pk = document.getElementById('chk-air-pk').checked;
    const maxPrice = parseInt(document.getElementById('price-range').value, 10);

    const cards = document.querySelectorAll('.flight-card');
    cards.forEach(card => {
      const stops = card.getAttribute('data-stops');
      const airline = card.getAttribute('data-airline');
      const price = parseInt(card.getAttribute('data-price'), 10);

      let stopMatch = (stops === 'nonstop' && showNonstop) || (stops === '1stop' && show1stop);
      let airlineMatch = false;
      if (airline === 'EK' && ek) airlineMatch = true;
      if (airline === '9P' && jinnah) airlineMatch = true;
      if (airline === 'QR' && qr) airlineMatch = true;
      if (airline === 'PK' && pk) airlineMatch = true;
      let priceMatch = price <= maxPrice;

      card.style.display = (stopMatch && airlineMatch && priceMatch) ? 'flex' : 'none';
    });
  }

  function resetFilters() {
    document.getElementById('chk-nonstop').checked = true;
    document.getElementById('chk-1stop').checked = true;
    document.getElementById('chk-air-ek').checked = true;
    document.getElementById('chk-air-9p').checked = true;
    document.getElementById('chk-air-qr').checked = true;
    document.getElementById('chk-air-pk').checked = true;
    document.getElementById('price-range').value = 250000;
    document.getElementById('price-slider-label').textContent = 'PKR 250,000';
    applyFilters();
  }
</script>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'flights-results.html'), flightsResultsHtml);

console.log('Successfully generated main pages (about, services, flights, flights-results).');
