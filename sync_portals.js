const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./template_helper.js');

const rootDesktop = 'C:/Users/PC/Desktop/MyTravel/frontend';
const rootScratch = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend';

['customer', 'admin'].forEach(dirName => {
  const pDir = path.join(rootDesktop, 'pages', dirName);
  if (!fs.existsSync(pDir)) return;
  const files = fs.readdirSync(pDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(pDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace header with depth 2
    const cleanHeaderPart = getHeader('MyTravel.pk Portal', 'general', 2);
    if (html.includes('<header class="main-header">')) {
      const startIdx = html.indexOf('<header class="main-header">');
      const endIdx = html.indexOf('</header>', startIdx) + 9;
      const newHeaderOnly = cleanHeaderPart.substring(
        cleanHeaderPart.indexOf('<header class="main-header">'),
        cleanHeaderPart.indexOf('</header>') + 9
      );
      html = html.substring(0, startIdx) + newHeaderOnly + html.substring(endIdx);
    }

    // Replace top-bar with depth 2
    if (html.includes('<div class="top-bar">')) {
      const tbStart = html.indexOf('<div class="top-bar">');
      const tbEnd = html.indexOf('<!-- Main Header');
      const newTopBar = cleanHeaderPart.substring(
        cleanHeaderPart.indexOf('<div class="top-bar">'),
        cleanHeaderPart.indexOf('<!-- Main Header')
      );
      if (tbEnd !== -1) {
        html = html.substring(0, tbStart) + newTopBar + html.substring(tbEnd);
      }
    }

    // Ensure accreditation strip is present above footer
    const cleanFooterPart = getFooter(2);
    const stripHtml = cleanFooterPart.substring(
      cleanFooterPart.indexOf('<!-- Official Accreditation'),
      cleanFooterPart.indexOf('<!-- Master Dark Navy Footer')
    );

    if (!html.includes('accreditation-trust-strip') && html.includes('<footer class="main-footer">')) {
      html = html.replace('<footer class="main-footer">', stripHtml + '\n  <footer class="main-footer">');
    }

    fs.writeFileSync(filePath, html, 'utf8');
    const scratchPath = path.join(rootScratch, 'pages', dirName, file);
    if (fs.existsSync(path.dirname(scratchPath))) {
      fs.writeFileSync(scratchPath, html, 'utf8');
    }
  });
  console.log(`Updated ${files.length} pages in ${dirName} portal.`);
});
