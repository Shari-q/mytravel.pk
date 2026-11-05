const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel';
const destDir = 'C:/Users/PC/Desktop/MyTravel';

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    // Skip node_modules and .git and bin/obj if any
    const baseName = path.basename(src);
    if (baseName === 'node_modules' || baseName === '.git' || baseName === 'bin' || baseName === 'obj') {
      return;
    }
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('Copying MyTravel project to Desktop...');
copyRecursive(srcDir, destDir);
console.log('Copy to Desktop completed successfully!');
