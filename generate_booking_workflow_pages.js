const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./template_helper');

const pagesDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/pages';

// 5. FLIGHT DETAILS
const detailsHtml = `${getHeader('Flight Itinerary & Fare Breakdown', 'flights')}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container" style="max-width:980px;">
    <!-- Step Indicator -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span class="badge badge-blue"><i class="bi bi-airplane-fill"></i> Step 1 of 4</span>
        <h1 style="font-size:1.6rem; color:var(--navy-deep); margin:0;">Flight Itinerary & Fare Details</h1>
      </div>
      <span class="flag-badge"><i class="bi bi-patch-check-fill" style="color:var(--emerald-success);"></i> PCAA Verified Fares</span>
    </div>

    <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-card);">
      <!-- Itinerary Box with Country Flags -->
      <div id="flight-itinerary-box" style="background:var(--bg-surface-alt); border:1px solid var(--border-light); border-radius:14px; padding:1.75rem; margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; align-items:center; gap:0.85rem;">
            <div class="airline-brand-badge emirates" style="width:44px; height:44px; font-size:1rem;">EK</div>
            <div>
              <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.15rem;" id="dt-airline-flight">Emirates (Flight EK 601)</h3>
              <span style="font-size:0.8125rem; color:var(--text-muted);" id="dt-aircraft"><i class="bi bi-airplane-engines"></i> Aircraft: Boeing 777-300ER Wide-Body</span>
            </div>
          </div>
          <span class="badge badge-green"><i class="bi bi-check-circle-fill"></i> Confirmed Available</span>
        </div>

        <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:2rem; align-items:center; margin-bottom:1.5rem;">
          <div>
            <strong style="font-size:1.6rem; color:var(--navy-deep); display:block;" id="dt-dep-time">06:15 AM</strong>
            <span style="display:flex; align-items:center; gap:0.4rem; font-size:1rem; font-weight:700; color:var(--text-main); margin:0.25rem 0;" id="dt-origin-city">
              <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI)
            </span>
            <span style="font-size:0.8125rem; color:var(--text-muted);" id="dt-dep-date">Fri, 20 Nov 2026 • Terminal 1</span>
          </div>

          <div style="text-align:center;">
            <span class="duration-pill"><i class="bi bi-clock"></i> 2h 30m</span>
            <div style="width:140px; height:2px; background:var(--primary-blue); position:relative; margin:0.5rem auto;">
              <i class="bi bi-airplane-fill" style="position:absolute; top:-7px; left:50%; transform:translateX(-50%); font-size:0.95rem; color:var(--primary-blue);"></i>
            </div>
            <span style="font-size:0.75rem; color:var(--emerald-success); font-weight:700;">Non-stop Direct Flight</span>
          </div>

          <div style="text-align:right;">
            <strong style="font-size:1.6rem; color:var(--navy-deep); display:block;" id="dt-arr-time">07:45 AM</strong>
            <span style="display:inline-flex; align-items:center; gap:0.4rem; font-size:1rem; font-weight:700; color:var(--text-main); margin:0.25rem 0;" id="dt-dest-city">
              <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)
            </span>
            <span style="display:block; font-size:0.8125rem; color:var(--text-muted);">Fri, 20 Nov 2026 • Terminal 3</span>
          </div>
        </div>

        <div style="display:flex; gap:2rem; font-size:0.875rem; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:1rem; flex-wrap:wrap;">
          <div><i class="bi bi-bag-check" style="color:var(--primary-blue)"></i> Baggage: <strong id="dt-baggage" style="color:var(--navy-deep);">30 Kg Checked + 7 Kg Cabin</strong></div>
          <div><i class="bi bi-cup-hot" style="color:var(--primary-blue)"></i> Meal: <strong style="color:var(--navy-deep);">Hot Gourmet Meal Included</strong></div>
          <div><i class="bi bi-arrow-repeat" style="color:var(--primary-blue)"></i> Date Change: <strong style="color:var(--navy-deep);">Permitted (Standard PCAA rules)</strong></div>
        </div>
      </div>

      <!-- Fare Breakdown -->
      <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-receipt"></i> Verified Fare Summary</h3>
      <div style="border:1px solid var(--border-light); border-radius:12px; padding:1.5rem; margin-bottom:2rem; background:#FFFFFF;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; font-size:0.95rem;">
          <span>Base Passenger Airfare:</span>
          <span id="dt-base-price" style="font-weight:600;">PKR 68,500</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; font-size:0.95rem; color:var(--text-muted);">
          <span>Government, Security & Airport Taxes (PCAA / Civil Aviation):</span>
          <span id="dt-tax-price" style="font-weight:600;">PKR 14,200</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:2px solid var(--border-light); padding-top:1rem; font-size:1.3rem; font-weight:800; color:var(--navy-deep);">
          <span>Total Payable Amount:</span>
          <span style="color:var(--primary-blue);" id="dt-total-price">PKR 82,700</span>
        </div>
      </div>

      <!-- Action Navigation -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <a href="flights-results.html" class="btn btn-outline"><i class="bi bi-arrow-left"></i> Back to Flight Results</a>
        <a href="flight-passengers.html" class="btn btn-primary btn-lg">
          Continue to Passenger Information <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</section>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('airline')) {
      const a = params.get('airline');
      const f = params.get('flight');
      const p = params.get('price');
      const from = params.get('from') || 'KHI';
      const to = params.get('to') || 'DXB';

      document.getElementById('dt-airline-flight').textContent = a + ' (' + f + ')';
      if (p) {
        const total = parseInt(p, 10);
        const base = Math.round(total * 0.82);
        const tax = total - base;
        document.getElementById('dt-base-price').textContent = 'PKR ' + base.toLocaleString();
        document.getElementById('dt-tax-price').textContent = 'PKR ' + tax.toLocaleString();
        document.getElementById('dt-total-price').textContent = 'PKR ' + total.toLocaleString();
      }
    }
  });
</script>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'flight-details.html'), detailsHtml);

// 6. PASSENGER INFORMATION
const paxHtml = `${getHeader('Passenger Details & Travel Documents', 'flights')}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container" style="max-width:980px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span class="badge badge-blue"><i class="bi bi-people-fill"></i> Step 2 of 4</span>
        <h1 style="font-size:1.6rem; color:var(--navy-deep); margin:0;">Passenger Details & Documents</h1>
      </div>
      <span class="flag-badge"><img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> CNIC / Passport Verification</span>
    </div>

    <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card);">
      <form id="passenger-info-form" onsubmit="savePassengerAndContinue(event)">
        <!-- Primary Contact -->
        <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:1rem; border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">
          <i class="bi bi-envelope-check"></i> Primary Contact Information (for E-Ticket Delivery)
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">FULL NAME</label>
            <input type="text" id="contact-name" value="Hamza Tariq" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">EMAIL ADDRESS</label>
            <input type="email" id="contact-email" value="hamza.tariq@example.pk" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">PAKISTAN MOBILE / WHATSAPP</label>
            <input type="tel" id="contact-phone" value="+92 300 8472910" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
        </div>

        <!-- Passenger 1 Details -->
        <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:1rem; border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">
          <i class="bi bi-person-badge"></i> Adult Passenger 1 (Lead Traveler)
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">TITLE</label>
            <select id="pax1-title" style="width:100%; padding:0.8rem; border:1px solid var(--border-light); border-radius:8px; background:#FFFFFF;">
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Ms.</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">FIRST NAME (AS ON PASSPORT)</label>
            <input type="text" id="pax1-fname" value="Hamza" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">LAST NAME</label>
            <input type="text" id="pax1-lname" value="Tariq" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">DATE OF BIRTH</label>
            <input type="date" id="pax1-dob" value="1992-05-14" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">PASSPORT NUMBER</label>
            <input type="text" id="pax1-passport" value="PK892014" required style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px;">
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">NATIONALITY</label>
            <input type="text" value="Pakistani 🇵🇰" readonly style="width:100%; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px; background:var(--bg-surface-alt); font-weight:700;">
          </div>
        </div>

        <!-- Seat & Meal Preferences -->
        <h3 style="font-size:1.2rem; color:var(--navy-deep); margin-bottom:1rem; border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">
          <i class="bi bi-airplane"></i> Seat & In-Flight Dining
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem; margin-bottom:2.5rem;">
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">ASSIGNED SEAT (BOEING 777)</label>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <input type="text" id="selected-seat-input" value="14B (Window/Middle)" readonly style="flex:1; padding:0.8rem 1rem; border:1px solid var(--border-light); border-radius:8px; background:var(--bg-surface-alt); font-weight:700; color:var(--primary-blue);">
              <a href="../index.html#cabin-experience" class="btn btn-outline btn-sm" target="_blank"><i class="bi bi-view-stacked"></i> 3D Cabin</a>
            </div>
          </div>
          <div>
            <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">SPECIAL MEAL REQUEST</label>
            <select id="pax1-meal" style="width:100%; padding:0.8rem; border:1px solid var(--border-light); border-radius:8px; background:#FFFFFF;">
              <option value="standard" selected>Standard Halal Asian Meal</option>
              <option value="diabetic">Diabetic Meal</option>
              <option value="vegetarian">Asian Vegetarian (AVML)</option>
              <option value="child">Child Friendly Meal</option>
            </select>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <a href="flight-details.html" class="btn btn-outline"><i class="bi bi-arrow-left"></i> Back to Flight Details</a>
          <button type="submit" class="btn btn-primary btn-lg">
            Review Booking & Payment <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
<script>
  function savePassengerAndContinue(e) {
    e.preventDefault();
    const paxData = {
      contactName: document.getElementById('contact-name').value,
      contactEmail: document.getElementById('contact-email').value,
      contactPhone: document.getElementById('contact-phone').value,
      firstName: document.getElementById('pax1-fname').value,
      lastName: document.getElementById('pax1-lname').value,
      passport: document.getElementById('pax1-passport').value,
      seat: document.getElementById('selected-seat-input').value
    };
    sessionStorage.setItem('mytravel_passenger_data', JSON.stringify(paxData));
    window.location.href = 'flight-review.html';
  }
</script>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'flight-passengers.html'), paxHtml);

// 7. BOOKING REVIEW & PAYMENT
const reviewHtml = `${getHeader('Review Booking & Secure Payment', 'flights')}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container" style="max-width:980px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span class="badge badge-blue"><i class="bi bi-credit-card-fill"></i> Step 3 of 4</span>
        <h1 style="font-size:1.6rem; color:var(--navy-deep); margin:0;">Review Booking & Confirm Payment</h1>
      </div>
      <span class="flag-badge"><i class="bi bi-shield-lock-fill" style="color:var(--emerald-success);"></i> 256-bit SSL Encrypted</span>
    </div>

    <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--border-card); padding:2rem; box-shadow:var(--shadow-card);">
      <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:2.5rem; margin-bottom:2.5rem;">
        <!-- Left: Summary -->
        <div>
          <h3 style="font-size:1.15rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-airplane-fill"></i> Selected Journey</h3>
          <div style="background:var(--bg-surface-alt); border-radius:12px; padding:1.5rem; margin-bottom:1.5rem; border:1px solid var(--border-light);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <span class="badge badge-blue">Emirates (EK 601)</span>
              <span style="font-size:0.8125rem; font-weight:700; color:var(--emerald-success);">Confirmed Seat 14B</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.6rem; font-size:1.15rem; font-weight:700; color:var(--navy-deep); margin-bottom:0.5rem;">
              <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan"> Karachi (KHI) 
              <i class="bi bi-arrow-right" style="color:var(--primary-blue);"></i> 
              <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE"> Dubai (DXB)
            </div>
            <div style="font-size:0.875rem; color:var(--text-muted);">
              Departure: Fri, 20 Nov 2026 at 06:15 AM • 2h 30m Direct • Economy Flex
            </div>
          </div>

          <h3 style="font-size:1.15rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-person-fill"></i> Passenger Details</h3>
          <div style="background:var(--bg-surface-alt); border-radius:12px; padding:1.25rem; border:1px solid var(--border-light);">
            <strong style="color:var(--navy-deep); font-size:1rem;" id="rev-pax-name">Mr. Hamza Tariq</strong>
            <div style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">
              Passport: <strong>PK892014</strong> • Nationality: Pakistani 🇵🇰 • Baggage: 30kg + 7kg
            </div>
          </div>
        </div>

        <!-- Right: Payment Method -->
        <div>
          <h3 style="font-size:1.15rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-wallet2"></i> Payment Mode</h3>
          <div style="border:2px solid var(--primary-blue); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem; background:var(--primary-light);">
            <label style="display:flex; align-items:center; gap:0.6rem; font-weight:700; color:var(--navy-deep); cursor:pointer;">
              <input type="radio" name="payMethod" checked style="accent-color:var(--primary-blue);"> 
              <span>Debit / Credit Card (Visa & Mastercard)</span>
            </label>
            <span style="display:block; font-size:0.8125rem; color:var(--text-muted); margin-top:0.5rem; line-height:1.4;">
              Instant automated ticket issuance. Verified PCAA & IATA ticketing gateway.
            </span>
          </div>

          <div style="border:1px solid var(--border-light); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
            <label style="display:flex; align-items:center; gap:0.6rem; font-weight:700; color:var(--navy-deep); cursor:pointer;">
              <input type="radio" name="payMethod" style="accent-color:var(--primary-blue);"> 
              <span>Online Bank Transfer / 1Bill / Raast</span>
            </label>
            <span style="display:block; font-size:0.8125rem; color:var(--text-muted); margin-top:0.5rem;">
              Direct deposit into MyTravel.pk official Meezan Bank / HBL corporate account.
            </span>
          </div>

          <!-- Total Due -->
          <div style="background:var(--bg-surface-alt); border-radius:12px; padding:1.25rem; border:1px solid var(--border-light);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-muted);">
              <span>Base Airfare:</span>
              <span>PKR 68,500</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-muted);">
              <span>PCAA Taxes & Fees:</span>
              <span>PKR 14,200</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:1.3rem; font-weight:800; color:var(--navy-deep); border-top:1px solid var(--border-light); padding-top:0.75rem;">
              <span>Total Payable:</span>
              <span style="color:var(--primary-blue);">PKR 82,700</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <a href="flight-passengers.html" class="btn btn-outline"><i class="bi bi-arrow-left"></i> Back to Passenger Info</a>
        <button type="button" class="btn btn-primary btn-lg" onclick="confirmPaymentAndIssueTicket()">
          <i class="bi bi-lock-fill"></i> Confirm Payment & Issue E-Ticket
        </button>
      </div>
    </div>
  </div>
</section>
<script>
  function confirmPaymentAndIssueTicket() {
    window.location.href = 'flight-confirmation.html?pnr=MT-78492&status=confirmed';
  }
</script>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'flight-review.html'), reviewHtml);

// 8. BOOKING CONFIRMATION & AUTHENTIC E-TICKET / BOARDING PASS
const confirmHtml = `${getHeader('Booking Confirmed - Official E-Ticket', 'flights')}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container" style="max-width:940px;">
    <!-- Success Banner -->
    <div style="text-align:center; margin-bottom:2.5rem;">
      <div style="width:72px; height:72px; border-radius:50%; background:var(--emerald-light); color:var(--emerald-success); display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(16,185,129,0.3);">
        <i class="bi bi-check-lg"></i>
      </div>
      <span class="badge badge-green" style="margin-bottom:0.5rem;"><i class="bi bi-patch-check-fill"></i> Payment Verified & Ticket Issued</span>
      <h1 style="font-size:2.2rem; color:var(--navy-deep); margin-bottom:0.5rem;">Your Flight Is Successfully Booked!</h1>
      <p style="color:var(--text-muted); font-size:1.05rem;">Official e-ticket receipt and confirmation have been dispatched to <strong>hamza.tariq@example.pk</strong>.</p>
    </div>

    <!-- Official E-Ticket / Boarding Pass Card -->
    <div style="background:#FFFFFF; border-radius:20px; border:2px solid var(--border-card); overflow:hidden; box-shadow:var(--shadow-elevated); margin-bottom:2.5rem;">
      <!-- Pass Header -->
      <div style="background:linear-gradient(135deg, var(--navy-deep) 0%, var(--navy-primary) 100%); color:#FFFFFF; padding:1.75rem 2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div style="display:flex; align-items:center; gap:1rem;">
          <img src="../assets/images/logo.jpg" alt="MyTravel.pk" style="height:36px; width:auto;">
          <div style="border-left:1px solid rgba(255,255,255,0.25); padding-left:1rem;">
            <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:#94A3B8;">Official Boarding Voucher</span>
            <div style="font-size:1.1rem; font-weight:700;">Emirates EK 601</div>
          </div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:#94A3B8;">PNR / Booking Reference</span>
          <div style="font-size:1.5rem; font-weight:900; color:var(--gold-accent); letter-spacing:2px;" id="conf-pnr">MT-78492</div>
        </div>
      </div>

      <!-- Pass Body -->
      <div style="padding:2.25rem 2rem;">
        <!-- Route Row -->
        <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:2rem; align-items:center; margin-bottom:2rem; border-bottom:1px dashed var(--border-light); padding-bottom:2rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
              <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan">
              <span style="font-size:1.5rem; font-weight:800; color:var(--navy-deep);">KHI</span>
            </div>
            <strong style="color:var(--text-main); font-size:1.1rem; display:block;">Karachi</strong>
            <span style="font-size:0.85rem; color:var(--text-muted);">Jinnah Intl Airport (Terminal 1)</span>
            <div style="margin-top:0.5rem; font-size:1.25rem; font-weight:800; color:var(--primary-blue);">06:15 AM</div>
            <span style="font-size:0.8rem; color:var(--text-light);">Fri, 20 Nov 2026</span>
          </div>

          <div style="text-align:center;">
            <span class="duration-pill"><i class="bi bi-clock"></i> 2h 30m</span>
            <div style="width:140px; height:2px; background:var(--primary-blue); position:relative; margin:0.6rem auto;">
              <i class="bi bi-airplane-fill" style="position:absolute; top:-7px; left:50%; transform:translateX(-50%); color:var(--primary-blue); font-size:1rem;"></i>
            </div>
            <span style="font-size:0.8rem; color:var(--emerald-success); font-weight:700;">Direct Non-Stop</span>
          </div>

          <div style="text-align:right;">
            <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
              <span style="font-size:1.5rem; font-weight:800; color:var(--navy-deep);">DXB</span>
              <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE">
            </div>
            <strong style="color:var(--text-main); font-size:1.1rem; display:block;">Dubai</strong>
            <span style="font-size:0.85rem; color:var(--text-muted);">Dubai Intl Airport (Terminal 3)</span>
            <div style="margin-top:0.5rem; font-size:1.25rem; font-weight:800; color:var(--primary-blue);">07:45 AM</div>
            <span style="font-size:0.8rem; color:var(--text-light);">Fri, 20 Nov 2026</span>
          </div>
        </div>

        <!-- Passenger & Flight Meta Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-light); font-weight:700;">PASSENGER</span>
            <div style="font-weight:700; color:var(--navy-deep); font-size:1rem;">Mr. Hamza Tariq</div>
            <span style="font-size:0.8rem; color:var(--text-muted);">Passport: PK892014</span>
          </div>

          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-light); font-weight:700;">SEAT ASSIGNMENT</span>
            <div style="font-weight:800; color:var(--primary-blue); font-size:1.1rem;"><i class="bi bi-check2-circle"></i> 14B (Window)</div>
            <span style="font-size:0.8rem; color:var(--text-muted);">Boeing 777 Economy</span>
          </div>

          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-light); font-weight:700;">CABIN / MEAL</span>
            <div style="font-weight:700; color:var(--navy-deep); font-size:1rem;">Economy Flex</div>
            <span style="font-size:0.8rem; color:var(--text-muted);">Halal Meal Included</span>
          </div>

          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-light); font-weight:700;">BAGGAGE ALLOWANCE</span>
            <div style="font-weight:700; color:var(--navy-deep); font-size:1rem;">30 Kg Checked</div>
            <span style="font-size:0.8rem; color:var(--text-muted);">+ 7 Kg Hand Baggage</span>
          </div>
        </div>

        <!-- Verification Barcode & QR Code Graphic -->
        <div style="background:var(--bg-surface-alt); border-radius:12px; padding:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; border:1px solid var(--border-light);">
          <div>
            <span style="font-size:0.8125rem; font-weight:700; color:var(--navy-deep);"><i class="bi bi-qr-code"></i> DIGITAL VERIFICATION CODE:</span>
            <div style="font-family:monospace; font-size:0.95rem; color:var(--primary-blue); font-weight:700; letter-spacing:1px; margin-top:0.25rem;">
              MT-PK-DXB-EK601-20261120-78492
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">Verified against Department of Tourist Services (DTS) Registry</span>
          </div>
          <div style="display:flex; gap:1rem;">
            <button class="btn btn-outline btn-sm" onclick="window.print()"><i class="bi bi-printer"></i> Print Ticket</button>
            <a href="receipt-verify.html?receipt=MT-REC-90214" class="btn btn-primary btn-sm"><i class="bi bi-shield-check"></i> Verify Receipt</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div style="display:flex; justify-content:center; gap:1.25rem; flex-wrap:wrap;">
      <a href="../index.html" class="btn btn-outline"><i class="bi bi-house-door-fill"></i> Return to Homepage</a>
      <a href="mybooking.html?pnr=MT-78492" class="btn btn-primary"><i class="bi bi-ticket-perforated-fill"></i> View My Bookings</a>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'flight-confirmation.html'), confirmHtml);

console.log('Successfully generated booking workflow pages (details, passengers, review, confirmation).');
