const fs = require('fs');

// Create crisp SVG logo with transparent background
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 72" width="320" height="72" fill="none">
  <!-- My Text -->
  <text x="4" y="52" font-family="'DM Sans', 'Segoe UI', Arial, sans-serif" font-size="46" font-weight="800" fill="#168DE2" letter-spacing="-1">my</text>
  
  <!-- Airplane Taking Off -->
  <g transform="translate(74, 14) scale(0.95)">
    <!-- Motion trails -->
    <path d="M4 28 C 14 26, 26 22, 38 12" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 4" opacity="0.8"/>
    <!-- Modern Airliner Silhouette -->
    <path d="M38 10 L28 15 L18 17 L8 19 L4 18 L2 20 L8 22 L16 21 L26 23 L22 34 L25 35 L33 24 L44 23 L54 20 L58 17 L56 15 L46 16 L38 10 Z" fill="#168DE2"/>
    <!-- Jet contrail glow -->
    <circle cx="3" cy="21" r="2" fill="#38BDF8" opacity="0.6"/>
  </g>

  <!-- Travel Text -->
  <text x="134" y="52" font-family="'DM Sans', 'Segoe UI', Arial, sans-serif" font-size="46" font-weight="800" fill="#082957" letter-spacing="-1">travel</text>
  
  <!-- .pk Dot and Domain -->
  <circle cx="266" cy="48" r="4.5" fill="#168DE2"/>
  <text x="274" y="52" font-family="'DM Sans', 'Segoe UI', Arial, sans-serif" font-size="44" font-weight="800" fill="#168DE2" letter-spacing="-0.5">pk</text>
</svg>`;

// Save to scratch and desktop
const dirs = [
  'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/assets/images',
  'C:/Users/PC/Desktop/MyTravel/frontend/assets/images'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(d + '/logo.svg', svgLogo);
  // Also save a fallback png-referenced SVG
  console.log('Saved logo.svg to', d);
});
