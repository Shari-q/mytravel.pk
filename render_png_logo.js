const sharp = require('sharp');
const fs = require('fs');

async function generatePngLogos() {
  const dirs = [
    'C:/Users/PC/Desktop/MyTravel/frontend/assets/images',
    'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/assets/images'
  ];

  // Official logo SVG
  const svgBuffer = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 76" width="340" height="76" fill="none">
    <!-- "my" text -->
    <text x="6" y="55" font-family="'DM Sans', 'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="800" fill="#168DE2" letter-spacing="-1">my</text>
    
    <!-- Stylized modern taking-off airliner in vibrant blue -->
    <g transform="translate(82, 12) scale(1.05)">
      <!-- Motion line -->
      <path d="M 2 30 Q 18 24 38 12" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 3" opacity="0.8"/>
      <!-- Jet Body -->
      <path d="M38 10 L26 16 L14 18 L4 20 L0 19 L-1 21 L5 23 L14 22 L24 24 L20 36 L23 37 L31 25 L43 24 L54 21 L58 18 L56 16 L46 17 L38 10 Z" fill="#168DE2"/>
      <!-- Contrail glow -->
      <circle cx="-1" cy="21" r="2.5" fill="#38BDF8" opacity="0.6"/>
    </g>

    <!-- "travel" text in deep navy -->
    <text x="148" y="55" font-family="'DM Sans', 'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="800" fill="#082957" letter-spacing="-1">travel</text>
    
    <!-- ".pk" in sky blue -->
    <circle cx="288" cy="51" r="5" fill="#168DE2"/>
    <text x="296" y="55" font-family="'DM Sans', 'Helvetica Neue', Arial, sans-serif" font-size="50" font-weight="800" fill="#168DE2" letter-spacing="-0.5">pk</text>
  </svg>`);

  for (const d of dirs) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });

    // 1. High-Res Transparent PNG
    await sharp(svgBuffer)
      .resize(400, 90, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(d + '/logo.png');

    console.log('Created high-res transparent logo.png in', d);

    // 2. Also transparent white logo for footer/dark backgrounds
    const svgWhite = svgBuffer.toString()
      .replace('#082957', '#FFFFFF');
    await sharp(Buffer.from(svgWhite))
      .resize(400, 90, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(d + '/logo-white.png');

    console.log('Created logo-white.png in', d);
  }
}

generatePngLogos();
