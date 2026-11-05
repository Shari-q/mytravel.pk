const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/scraped';
const files = fs.readdirSync(dir);

const inventory = [];

files.forEach(f => {
    if (!f.endsWith('.html')) return;
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Extract H1 and H2
    const h1s = [...content.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim());
    const h2s = [...content.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].map(m => m[1].trim());

    // Extract some key text snippets
    const cleanText = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                             .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                             .replace(/<[^>]+>/g, ' ')
                             .replace(/\s+/g, ' ')
                             .trim();

    inventory.push({
        file: f,
        title,
        h1s: h1s.slice(0, 5),
        h2s: h2s.slice(0, 10),
        preview: cleanText.substring(0, 300)
    });
});

fs.writeFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/inventory_parsed.json', JSON.stringify(inventory, null, 2));
console.log('Parsed', inventory.length, 'files');
