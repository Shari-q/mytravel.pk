const https = require('https');
const fs = require('fs');
const path = require('path');

const targetUrls = [
    '/about',
    '/contact',
    '/terms-of-service',
    '/visas',
    '/visas/azerbaijan',
    '/visas/thailand',
    '/visas/malaysia',
    '/visas/singapore',
    '/visas/indonesia',
    '/visas/kenya',
    '/visas/sri-lanka',
    '/visas/vietnam',
    '/travel-insurance',
    '/travel-insurance/schengen',
    '/travel-insurance/united-insurance',
    '/travel-insurance/adamjee-insurance',
    '/excursions',
    '/travel',
    '/travel/currency-export-rules-pakistan',
    '/travel/italy-schengen-suspension-with-spain',
    '/travel/riyadh-air-pakistan-flights',
    '/blog',
    '/airline-offices',
    '/receipt',
    '/mybooking'
];

const outDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/scraped';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function downloadFile(urlStr, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redir = new URL(res.headers.location, urlStr).toString();
                return resolve(downloadFile(redir, dest));
            }
            res.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

function fetchPage(urlPath) {
    return new Promise((resolve) => {
        const target = 'https://mytravel.pk' + urlPath;
        https.get(target, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                console.log(`Redirect ${urlPath} -> ${res.headers.location}`);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const safeName = urlPath.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
                fs.writeFileSync(path.join(outDir, safeName), data);
                console.log(`Saved ${urlPath} (${res.statusCode}, ${data.length} bytes)`);
                resolve({ path: urlPath, status: res.statusCode, len: data.length });
            });
        }).on('error', err => {
            console.error(`Error on ${urlPath}: ${err.message}`);
            resolve({ path: urlPath, error: err.message });
        });
    });
}

async function run() {
    console.log('Downloading logo...');
    const logoDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/assets';
    if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });
    try {
        await downloadFile('https://mytravel.pk/images/core/logo.jpg', path.join(logoDir, 'logo.jpg'));
        console.log('Logo downloaded successfully!');
    } catch (e) {
        console.error('Failed to download logo:', e.message);
    }
    try {
        await downloadFile('https://mytravel.pk/images/core/favicon.png', path.join(logoDir, 'favicon.png'));
        console.log('Favicon downloaded successfully!');
    } catch (e) {
        console.error('Failed to download favicon:', e.message);
    }

    console.log('Fetching pages...');
    for (const p of targetUrls) {
        await fetchPage(p);
    }
    console.log('All downloads completed.');
}

run();
