const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./template_helper');

const pagesDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/pages';

// 9. TOURIST VISA SERVICES (WITH COUNTRY FLAGS)
const visasHtml = `${getHeader('Tourist Visas & Visit Visa Services', 'visas')}
<section class="section-padding">
  <div class="container">
    <div class="section-header">
      <span class="section-subtitle"><i class="bi bi-passport-fill"></i> Worldwide Tourist Visas</span>
      <h1 class="section-title">Embassy & E-Visa Processing Services</h1>
      <p class="section-desc">Fast, reliable visa application assistance with verified documentation guidance and high approval rates for Pakistani passport holders.</p>
    </div>

    <div class="visa-grid">
      <!-- Azerbaijan -->
      <div class="visa-card">
        <div class="visa-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1579606032832-683a992858f2?auto=format&fit=crop&w=700&q=80" class="visa-card-img" alt="Baku Azerbaijan">
          <div class="country-flag-badge">
            <img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="Azerbaijan">
            <span>Azerbaijan</span>
          </div>
        </div>
        <div class="visa-card-body">
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.4rem;">Azerbaijan Tourist e-Visa</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">Official ASAN e-visa. 30 days single entry. No embassy visit required.</p>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
              <span class="country-pill"><i class="bi bi-clock-history"></i> 3-5 Working Days</span>
              <span class="country-pill"><i class="bi bi-calendar-check"></i> 90 Days Validity</span>
            </div>
            <div class="visa-fee-tag">PKR 14,500 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ Person</span></div>
          </div>
          <a href="visa-details.html?country=azerbaijan" class="btn btn-primary btn-block"><i class="bi bi-passport"></i> View Visa Details</a>
        </div>
      </div>

      <!-- Thailand -->
      <div class="visa-card">
        <div class="visa-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=700&q=80" class="visa-card-img" alt="Thailand Bangkok">
          <div class="country-flag-badge">
            <img src="https://flagcdn.com/w24/th.png" class="flag-icon" alt="Thailand">
            <span>Thailand</span>
          </div>
        </div>
        <div class="visa-card-body">
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.4rem;">Thailand Tourist Visa</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">Single entry tourist visa with complete file preparation and bank statement review.</p>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
              <span class="country-pill"><i class="bi bi-clock-history"></i> 7-10 Working Days</span>
              <span class="country-pill"><i class="bi bi-calendar-check"></i> 60 Days Stay</span>
            </div>
            <div class="visa-fee-tag">PKR 18,500 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ Person</span></div>
          </div>
          <a href="visa-details.html?country=thailand" class="btn btn-primary btn-block"><i class="bi bi-passport"></i> View Visa Details</a>
        </div>
      </div>

      <!-- Malaysia -->
      <div class="visa-card">
        <div class="visa-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=700&q=80" class="visa-card-img" alt="Kuala Lumpur Malaysia">
          <div class="country-flag-badge">
            <img src="https://flagcdn.com/w24/my.png" class="flag-icon" alt="Malaysia">
            <span>Malaysia</span>
          </div>
        </div>
        <div class="visa-card-body">
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.4rem;">Malaysia Tourist e-Visa</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">Official Malaysian immigration e-visa for leisure and holiday travelers.</p>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
              <span class="country-pill"><i class="bi bi-clock-history"></i> 3-5 Working Days</span>
              <span class="country-pill"><i class="bi bi-calendar-check"></i> 30 Days Stay</span>
            </div>
            <div class="visa-fee-tag">PKR 16,500 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ Person</span></div>
          </div>
          <a href="visa-details.html?country=malaysia" class="btn btn-primary btn-block"><i class="bi bi-passport"></i> View Visa Details</a>
        </div>
      </div>

      <!-- Singapore -->
      <div class="visa-card">
        <div class="visa-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80" class="visa-card-img" alt="Singapore Marina Bay">
          <div class="country-flag-badge">
            <img src="https://flagcdn.com/w24/sg.png" class="flag-icon" alt="Singapore">
            <span>Singapore</span>
          </div>
        </div>
        <div class="visa-card-body">
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.4rem;">Singapore Entry Visa</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">ICA authorized submission through verified local Singapore sponsor channel.</p>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
              <span class="country-pill"><i class="bi bi-clock-history"></i> 5-7 Working Days</span>
              <span class="country-pill"><i class="bi bi-calendar-check"></i> 30 Days Stay</span>
            </div>
            <div class="visa-fee-tag">PKR 22,000 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ Person</span></div>
          </div>
          <a href="visa-details.html?country=singapore" class="btn btn-primary btn-block"><i class="bi bi-passport"></i> View Visa Details</a>
        </div>
      </div>

      <!-- Dubai / UAE -->
      <div class="visa-card">
        <div class="visa-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80" class="visa-card-img" alt="Dubai UAE">
          <div class="country-flag-badge">
            <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE">
            <span>Dubai / UAE</span>
          </div>
        </div>
        <div class="visa-card-body">
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.4rem;">Dubai 30 / 60 Days Visa</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">Instant GDRFA / ICP tourist visa with Covid insurance and express approval.</p>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
              <span class="country-pill"><i class="bi bi-clock-history"></i> 24-48 Hours</span>
              <span class="country-pill"><i class="bi bi-calendar-check"></i> 30 or 60 Days</span>
            </div>
            <div class="visa-fee-tag">PKR 26,500 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ 30 Days</span></div>
          </div>
          <a href="visa-details.html?country=dubai" class="btn btn-primary btn-block"><i class="bi bi-passport"></i> View Visa Details</a>
        </div>
      </div>

      <!-- Turkey -->
      <div class="visa-card">
        <div class="visa-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80" class="visa-card-img" alt="Istanbul Turkey">
          <div class="country-flag-badge">
            <img src="https://flagcdn.com/w24/tr.png" class="flag-icon" alt="Turkey">
            <span>Turkey</span>
          </div>
        </div>
        <div class="visa-card-body">
          <div>
            <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:0.4rem;">Turkey Tourist e-Visa / Sticker</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">e-Visa for valid Schengen/US/UK visa holders, or full Anatolia visa dropbox support.</p>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
              <span class="country-pill"><i class="bi bi-clock-history"></i> Instant or 15 Days</span>
              <span class="country-pill"><i class="bi bi-calendar-check"></i> 90 Days Validity</span>
            </div>
            <div class="visa-fee-tag">PKR 18,000 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ Person</span></div>
          </div>
          <a href="visa-details.html?country=turkey" class="btn btn-primary btn-block"><i class="bi bi-passport"></i> View Visa Details</a>
        </div>
      </div>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'visas.html'), visasHtml);

// 10. COUNTRY-WISE VISA DETAILS
const visaDetailsHtml = `${getHeader('Country Visa Details & Requirements', 'visas')}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container" style="max-width:960px;">
    <div style="background:var(--bg-page); border-radius:16px; border:1px solid var(--border-light); padding:2rem; margin-bottom:2.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
      <div style="display:flex; align-items:center; gap:1.25rem;">
        <img id="vd-flag" src="https://flagcdn.com/w40/az.png" class="flag-icon-lg" alt="Azerbaijan Flag">
        <div>
          <span class="badge badge-blue">Official Tourist Visit Visa</span>
          <h1 style="font-size:1.85rem; color:var(--navy-deep); margin:0.25rem 0;" id="vd-title">Azerbaijan Tourist e-Visa</h1>
          <span style="font-size:0.875rem; color:var(--text-muted);" id="vd-meta">30 Days Single Entry • Electronic ASAN Portal • Non-immigrant Leisure</span>
        </div>
      </div>
      <div style="text-align:right;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">TOTAL PROCESSING FEE</span>
        <div style="font-size:2rem; font-weight:800; color:var(--primary-blue);" id="vd-price">PKR 14,500</div>
      </div>
    </div>

    <!-- Requirements Grid -->
    <div style="display:grid; grid-template-columns:1.3fr 0.7fr; gap:2.5rem; margin-bottom:3rem;">
      <div>
        <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-file-earmark-check"></i> Required Documents for Pakistani Citizens</h3>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.85rem; margin-bottom:2rem;">
          <li style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.95rem; color:var(--text-main);">
            <i class="bi bi-check-circle-fill" style="color:var(--emerald-success); font-size:1.2rem; flex-shrink:0;"></i>
            <span><strong>Valid Original Passport:</strong> Minimum 6 months validity remaining from date of planned departure.</span>
          </li>
          <li style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.95rem; color:var(--text-main);">
            <i class="bi bi-check-circle-fill" style="color:var(--emerald-success); font-size:1.2rem; flex-shrink:0;"></i>
            <span><strong>High-Resolution Passport Scans:</strong> Clear color scan of data page without flash reflections.</span>
          </li>
          <li style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.95rem; color:var(--text-main);">
            <i class="bi bi-check-circle-fill" style="color:var(--emerald-success); font-size:1.2rem; flex-shrink:0;"></i>
            <span><strong>Passport-Size Photograph:</strong> White background, neutral facial expression, 35mm x 50mm.</span>
          </li>
          <li style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.95rem; color:var(--text-main);">
            <i class="bi bi-check-circle-fill" style="color:var(--emerald-success); font-size:1.2rem; flex-shrink:0;"></i>
            <span><strong>Confirmed Round-Trip Flight Itinerary:</strong> Provided and booked via MyTravel.pk.</span>
          </li>
          <li style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.95rem; color:var(--text-main);">
            <i class="bi bi-check-circle-fill" style="color:var(--emerald-success); font-size:1.2rem; flex-shrink:0;"></i>
            <span><strong>Hotel Accommodation Voucher:</strong> Confirmed booking for entire duration of stay.</span>
          </li>
        </ul>

        <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-info-circle"></i> Application Steps</h3>
        <div style="background:var(--bg-page); border-radius:12px; padding:1.5rem; border:1px solid var(--border-light);">
          <div style="display:flex; gap:1rem; margin-bottom:1rem;">
            <span style="width:28px; height:28px; border-radius:50%; background:var(--primary-blue); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0;">1</span>
            <div><strong style="color:var(--navy-deep);">Submit Documents:</strong> WhatsApp your passport copy and photograph to <strong>+92 311 1101365</strong>.</div>
          </div>
          <div style="display:flex; gap:1rem; margin-bottom:1rem;">
            <span style="width:28px; height:28px; border-radius:50%; background:var(--primary-blue); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0;">2</span>
            <div><strong style="color:var(--navy-deep);">Verification:</strong> Our visa desk verifies compliance against immigration rules.</div>
          </div>
          <div style="display:flex; gap:1rem;">
            <span style="width:28px; height:28px; border-radius:50%; background:var(--primary-blue); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0;">3</span>
            <div><strong style="color:var(--navy-deep);">E-Visa Issuance:</strong> Official electronic visa PDF sent to your WhatsApp and email.</div>
          </div>
        </div>
      </div>

      <!-- Right Contact Form -->
      <div>
        <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:14px; padding:1.75rem; box-shadow:var(--shadow-card);">
          <h3 style="font-size:1.15rem; color:var(--navy-deep); margin-bottom:1rem;"><i class="bi bi-send-fill" style="color:var(--primary-blue);"></i> Apply for this Visa</h3>
          <form onsubmit="handleVisaApply(event)">
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.3rem;">FULL NAME</label>
              <input type="text" required style="width:100%; padding:0.75rem; border:1px solid var(--border-light); border-radius:8px;">
            </div>
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.3rem;">WHATSAPP PHONE NUMBER</label>
              <input type="tel" required placeholder="0300-1234567" style="width:100%; padding:0.75rem; border:1px solid var(--border-light); border-radius:8px;">
            </div>
            <div style="margin-bottom:1.5rem;">
              <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--text-muted); margin-bottom:0.3rem;">TRAVEL DATE</label>
              <input type="date" required style="width:100%; padding:0.75rem; border:1px solid var(--border-light); border-radius:8px;">
            </div>
            <button type="submit" class="btn btn-primary btn-block"><i class="bi bi-whatsapp"></i> Apply via WhatsApp</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
<script>
  function handleVisaApply(e) {
    e.preventDefault();
    alert('Thank you! Our visa counselor will contact your WhatsApp immediately with document instructions.');
  }
</script>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'visa-details.html'), visaDetailsHtml);

// 11. TRAVEL INSURANCE & COMPARISON
const insuranceHtml = `${getHeader('Travel Insurance - Adamjee & UIC Embassy Approved', 'insurance')}
<section class="section-padding">
  <div class="container">
    <div class="section-header">
      <span class="section-subtitle"><i class="bi bi-shield-check"></i> Authorized Agent</span>
      <h1 class="section-title">Embassy Compliant Travel Insurance</h1>
      <p class="section-desc">Instant online travel insurance policies compliant with Schengen, UK, US, and worldwide embassy requirements. Underwritten by <strong>Adamjee Insurance</strong> and <strong>United Insurance Company (UIC)</strong>.</p>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:2rem; margin-bottom:3rem;">
      <!-- Adamjee -->
      <div style="background:#FFFFFF; border:2px solid var(--primary-blue); border-radius:16px; padding:2rem; box-shadow:var(--shadow-card); position:relative;">
        <span class="badge badge-blue" style="position:absolute; top:1rem; right:1rem;">Most Popular</span>
        <div style="width:52px; height:52px; border-radius:12px; background:var(--primary-light); color:var(--primary-blue); display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
          <i class="bi bi-shield-fill-check"></i>
        </div>
        <h3 style="font-size:1.35rem; color:var(--navy-deep); margin-bottom:0.5rem;">Adamjee Insurance</h3>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">
          Pakistan's largest general insurer with global international emergency assistance. 100% embassy guaranteed for Schengen visa appointments.
        </p>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.75rem; font-size:0.875rem;">
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> US$ 50,000 / €30,000 Medical Coverage</li>
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> Emergency Medical Repatriation Included</li>
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> Lost Luggage & Passport Theft Reimbursement</li>
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> Instant Verifiable QR Code Certificate</li>
        </ul>
        <div style="font-size:1.5rem; font-weight:800; color:var(--primary-blue); margin-bottom:1.25rem;">
          Starting PKR 2,800 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ 7 Days</span>
        </div>
        <a href="insurance-compare.html" class="btn btn-primary btn-block"><i class="bi bi-lightning-charge-fill"></i> Get Adamjee Policy</a>
      </div>

      <!-- UIC -->
      <div style="background:#FFFFFF; border:1px solid var(--border-card); border-radius:16px; padding:2rem; box-shadow:var(--shadow-card); position:relative;">
        <div style="width:52px; height:52px; border-radius:12px; background:var(--gold-light); color:#B45309; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1.25rem;">
          <i class="bi bi-shield-lock-fill"></i>
        </div>
        <h3 style="font-size:1.35rem; color:var(--navy-deep); margin-bottom:0.5rem;">United Insurance Company (UIC)</h3>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">
          Competitive rates for international student, business, and tourist travelers. Trusted partner recognized across worldwide foreign missions.
        </p>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.75rem; font-size:0.875rem;">
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> US$ 50,000 to $100,000 Policy Options</li>
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> Flight Delay & Cancellation Protection</li>
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> Cashless Hospitalization Overseas</li>
          <li><i class="bi bi-check2-circle" style="color:var(--emerald-success)"></i> Official Embassy Accepted Format</li>
        </ul>
        <div style="font-size:1.5rem; font-weight:800; color:var(--primary-blue); margin-bottom:1.25rem;">
          Starting PKR 2,400 <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ 7 Days</span>
        </div>
        <a href="insurance-compare.html" class="btn btn-outline btn-block"><i class="bi bi-sliders"></i> Compare with Adamjee</a>
      </div>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'insurance.html'), insuranceHtml);

// 12. INSURANCE COMPARE
const compareHtml = `${getHeader('Compare Adamjee vs UIC Travel Insurance', 'insurance')}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container" style="max-width:960px;">
    <div class="section-header">
      <span class="section-subtitle">Side-by-Side</span>
      <h1 class="section-title">Adamjee vs UIC Insurance Comparison</h1>
      <p class="section-desc">Transparent comparison of coverage limits, deductibles, embassy compliances and premium pricing.</p>
    </div>

    <div class="routes-card-table-wrap">
      <table class="routes-table">
        <thead>
          <tr>
            <th>Coverage Feature</th>
            <th>Adamjee Insurance (Gold)</th>
            <th>UIC Insurance (Standard)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Medical Expenses Cover</strong></td>
            <td><span style="color:var(--primary-blue); font-weight:700;">US$ 50,000 (€30,000)</span></td>
            <td><span style="color:var(--primary-blue); font-weight:700;">US$ 50,000 (€30,000)</span></td>
          </tr>
          <tr>
            <td><strong>Schengen Embassy Acceptance</strong></td>
            <td><span class="badge badge-green"><i class="bi bi-check2"></i> 100% Guaranteed</span></td>
            <td><span class="badge badge-green"><i class="bi bi-check2"></i> 100% Guaranteed</span></td>
          </tr>
          <tr>
            <td><strong>Repatriation of Mortal Remains</strong></td>
            <td>Actual Cost Covered</td>
            <td>Actual Cost Covered</td>
          </tr>
          <tr>
            <td><strong>Loss of Checked Baggage</strong></td>
            <td>Up to US$ 1,000</td>
            <td>Up to US$ 800</td>
          </tr>
          <tr>
            <td><strong>Delivery Time</strong></td>
            <td><span class="badge badge-blue">Within 20 Minutes (PDF)</span></td>
            <td><span class="badge badge-blue">Within 20 Minutes (PDF)</span></td>
          </tr>
          <tr>
            <td><strong>Starting 7-Day Premium</strong></td>
            <td><span class="route-price">PKR 2,800</span></td>
            <td><span class="route-price">PKR 2,400</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="margin-top:2.5rem; text-align:center;">
      <a href="https://wa.me/923111101365?text=Hello%20MyTravel%2C%20I%20want%20to%20issue%20travel%20insurance" class="btn btn-primary btn-lg" target="_blank">
        <i class="bi bi-whatsapp"></i> Get Instant Policy on WhatsApp
      </a>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'insurance-compare.html'), compareHtml);

// 13. AIRLINE OFFICES DIRECTORY (THE BIG COMPREHENSIVE DIRECTORY WITH ALL COUNTRY FLAGS!)
const airlineOfficesHtml = `${getHeader('Airline Offices in Pakistan Directory (30+ Carriers)', 'flights')}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <div class="section-header">
      <span class="section-subtitle"><i class="bi bi-buildings"></i> Verified Contacts</span>
      <h1 class="section-title">Major Carriers Operating in Pakistan</h1>
      <p class="section-desc">Official telephone numbers, hub locations, UAN hotlines, and city booking offices across Karachi, Lahore, Islamabad, and Sialkot with authentic home country flags.</p>
    </div>

    <div class="airlines-grid">
      <!-- 1. PIA -->
      <div class="airline-card">
        <div class="airline-brand-badge pia">PK</div>
        <div class="airline-info">
          <h4>Pakistan International Airlines (PIA)</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan">
            <span>Hub: Karachi (KHI) & Islamabad (ISB)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> UAN: 111-786-786 • 021-99040000</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Head Office, Karachi Airport / Egerton Rd Lahore</div>
        </div>
      </div>

      <!-- 2. Emirates -->
      <div class="airline-card">
        <div class="airline-brand-badge emirates">EK</div>
        <div class="airline-info">
          <h4>Emirates</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE">
            <span>Hub: Dubai International (DXB)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35683377 • 042-35789800</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Serena Hotel Islamabad / Gulberg-III Lahore</div>
        </div>
      </div>

      <!-- 3. Qatar Airways -->
      <div class="airline-card">
        <div class="airline-brand-badge qatar">QR</div>
        <div class="airline-info">
          <h4>Qatar Airways</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/qa.png" class="flag-icon" alt="Qatar">
            <span>Hub: Hamad International, Doha (DOH)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-111-310-310 • 051-111-310-310</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Stock Exchange Towers, Islamabad</div>
        </div>
      </div>

      <!-- 4. AirSial -->
      <div class="airline-card">
        <div class="airline-brand-badge airsial">PF</div>
        <div class="airline-info">
          <h4>AirSial</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan">
            <span>Hub: Sialkot (SKT) & Karachi (KHI)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> UAN: 021-111-247-742</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Kashmir Road Sialkot / Shahrah-e-Faisal Karachi</div>
        </div>
      </div>

      <!-- 5. Fly Jinnah -->
      <div class="airline-card">
        <div class="airline-brand-badge flyjinnah">9P</div>
        <div class="airline-info">
          <h4>Fly Jinnah</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/pk.png" class="flag-icon" alt="Pakistan">
            <span>Hub: Karachi (KHI)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> UAN: 021-35656565</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Park Towers, Clifton, Karachi</div>
        </div>
      </div>

      <!-- 6. Azerbaijan Airlines -->
      <div class="airline-card">
        <div class="airline-brand-badge azerbaijan">J2</div>
        <div class="airline-info">
          <h4>Azerbaijan Airlines (AZAL)</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/az.png" class="flag-icon" alt="Azerbaijan">
            <span>Hub: Baku Heydar Aliyev (GYD)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Direct Flights to LHE & ISB</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: GSA Office Lahore & Islamabad</div>
        </div>
      </div>

      <!-- 7. Saudia -->
      <div class="airline-card">
        <div class="airline-brand-badge saudia">SV</div>
        <div class="airline-info">
          <h4>Saudia (Saudi Arabian Airlines)</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/sa.png" class="flag-icon" alt="Saudi Arabia">
            <span>Hub: Jeddah (JED) & Riyadh (RUH)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35688081 • 042-36307771</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Davis Road Lahore / Club Road Karachi</div>
        </div>
      </div>

      <!-- 8. Turkish Airlines -->
      <div class="airline-card">
        <div class="airline-brand-badge turkish">TK</div>
        <div class="airline-info">
          <h4>Turkish Airlines</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/tr.png" class="flag-icon" alt="Turkey">
            <span>Hub: Istanbul Airport (IST)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-111-849-849 • 042-111-849-849</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: DHA Phase 5 Lahore / Marriott Islamabad</div>
        </div>
      </div>

      <!-- 9. British Airways -->
      <div class="airline-card">
        <div class="airline-brand-badge british">BA</div>
        <div class="airline-info">
          <h4>British Airways</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/gb.png" class="flag-icon" alt="United Kingdom">
            <span>Hub: London Heathrow (LHR)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 051-111-247-742</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Blue Area Islamabad</div>
        </div>
      </div>

      <!-- 10. Flydubai -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">FZ</div>
        <div class="airline-info">
          <h4>Flydubai</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE">
            <span>Hub: Dubai International (DXB)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> UAN: 021-111-777-011</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Operating from KHI, LHE, ISB, MUX, SKT, PEW, UET</div>
        </div>
      </div>

      <!-- 11. Air Arabia -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">G9</div>
        <div class="airline-info">
          <h4>Air Arabia</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/ae.png" class="flag-icon" alt="UAE">
            <span>Hub: Sharjah (SHJ)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35688535 • 042-35787720</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Gulberg Lahore / Shahrah-e-Faisal Karachi</div>
        </div>
      </div>

      <!-- 12. Gulf Air -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">GF</div>
        <div class="airline-info">
          <h4>Gulf Air</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/bh.png" class="flag-icon" alt="Bahrain">
            <span>Hub: Bahrain International (BAH)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35655511 • 042-36307775</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Avari Towers Karachi</div>
        </div>
      </div>

      <!-- 13. Oman Air -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">WY</div>
        <div class="airline-info">
          <h4>Oman Air</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/om.png" class="flag-icon" alt="Oman">
            <span>Hub: Muscat (MCT)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35687721 • 042-35787750</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Karachi, Lahore, Islamabad</div>
        </div>
      </div>

      <!-- 14. Kuwait Airways -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">KU</div>
        <div class="airline-info">
          <h4>Kuwait Airways</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/kw.png" class="flag-icon" alt="Kuwait">
            <span>Hub: Kuwait International (KWI)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35682221</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Club Road Karachi / Islamabad</div>
        </div>
      </div>

      <!-- 15. Thai Airways -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">TG</div>
        <div class="airline-info">
          <h4>Thai Airways</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/th.png" class="flag-icon" alt="Thailand">
            <span>Hub: Bangkok Suvarnabhumi (BKK)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35660066 • 042-36309922</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Park Towers Karachi / Lahore</div>
        </div>
      </div>

      <!-- 16. Malaysia Airlines -->
      <div class="airline-card">
        <div class="airline-brand-badge generic">MH</div>
        <div class="airline-info">
          <h4>Malaysia Airlines</h4>
          <div class="airline-hub-line">
            <img src="https://flagcdn.com/w24/my.png" class="flag-icon" alt="Malaysia">
            <span>Hub: Kuala Lumpur (KUL)</span>
          </div>
          <div class="airline-contact-line"><i class="bi bi-telephone"></i> Tel: 021-35682414</div>
          <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.25rem;">Office: Avari Towers, Karachi</div>
        </div>
      </div>
    </div>
  </div>
</section>
${getFooter()}`;
fs.writeFileSync(path.join(pagesDir, 'airline-offices.html'), airlineOfficesHtml);

console.log('Successfully generated services and content pages with authentic country flags.');
