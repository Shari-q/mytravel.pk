const fs = require('fs');

const indexPath = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Replace the flower painting with Baku Flame Towers photo
html = html.replace(
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579606032832-683a992858f2?auto=format&fit=crop&w=800&q=80'
);

// 2. Add the official accreditation strip before <footer class="main-footer">
const stripHtml = `
  <!-- Official Accreditation & Trust Strip (IATA TIDS, DTS, Visa, Mastercard) -->
  <div class="accreditation-trust-strip">
    <div class="container accreditation-flex">
      <!-- Left: Logo & Tagline -->
      <div class="acc-brand">
        <a href="index.html" style="display:inline-block;">
          <img src="assets/images/logo.jpg" alt="MyTravel.pk" class="acc-logo-img">
        </a>
        <div class="acc-tagline">Your journey &mdash; our expertise</div>
      </div>

      <!-- Center: Official Accreditation Seals -->
      <div class="acc-seals">
        <div class="acc-seal-item" title="IATA TIDS Accredited Member (Travel Industry Designator Service)">
          <img src="assets/images/iata-tids-logo.png" alt="IATA TIDS" class="acc-seal-img">
        </div>
        <div class="acc-seal-item" title="Department of Tourist Services (DTS) Licensed Agency">
          <img src="assets/images/dts-logo.png" alt="DTS Tourism Department" class="acc-seal-img">
        </div>
      </div>

      <!-- Right: We Accept Cards -->
      <div class="acc-payments">
        <span class="acc-accept-text">We accept</span>
        <div class="acc-pay-logos">
          <img src="assets/images/visa-logo.png" alt="Visa" class="acc-pay-img">
          <img src="assets/images/mastercard-logo.png" alt="Mastercard" class="acc-pay-img">
        </div>
      </div>
    </div>
  </div>
`;

if (!html.includes('class="accreditation-trust-strip"')) {
  html = html.replace('<footer class="main-footer">', stripHtml + '\n  <footer class="main-footer">');
}

// 3. Ensure no brand-text-block exists
html = html.replace(/<div class="brand-text-block">[\s\S]*?<\/div>/g, '');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully patched index.html with Baku photo and accreditation strip!');
