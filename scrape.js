const https = require('https');
const fs = require('fs');
const url = require('url');

const visited = new Set();
const queue = ['https://mytravel.pk/'];
const siteData = {
    pages: [],
    contacts: [],
    services: [],
    visas: [],
    airlines: [],
    testimonials: [],
    images: []
};

function fetchUrl(targetUrl) {
    return new Promise((resolve, reject) => {
        const parsed = url.parse(targetUrl);
        const req = https.get({
            hostname: parsed.hostname,
            path: parsed.path,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirect = url.resolve(targetUrl, res.headers.location);
                return resolve(fetchUrl(redirect));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    });
}

async function audit() {
    console.log('Auditing mytravel.pk...');
    const urlsToScrape = [
        'https://mytravel.pk/',
        'https://mytravel.pk/about-us',
        'https://mytravel.pk/contact-us',
        'https://mytravel.pk/flights',
        'https://mytravel.pk/visas',
        'https://mytravel.pk/travel-insurance',
        'https://mytravel.pk/excursions',
        'https://mytravel.pk/destinations',
        'https://mytravel.pk/travel-news',
        'https://mytravel.pk/blog',
        'https://mytravel.pk/airline-offices',
        'https://mytravel.pk/terms-and-conditions',
        'https://mytravel.pk/privacy-policy',
        'https://mytravel.pk/refund-policy',
        'https://mytravel.pk/faqs'
    ];

    const results = {};
    for (const u of urlsToScrape) {
        try {
            console.log('Fetching', u);
            const res = await fetchUrl(u);
            results[u] = {
                status: res.status,
                length: res.body.length,
                title: (res.body.match(/<title>([^<]+)<\/title>/i) || [])[1] || '',
                metaDesc: (res.body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) || [])[1] || ''
            };
            if (u === 'https://mytravel.pk/') {
                fs.writeFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/home.html', res.body);
            }
        } catch (e) {
            results[u] = { error: e.message };
        }
    }

    fs.writeFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/audit_summary.json', JSON.stringify(results, null, 2));
    console.log('Audit completed.');
}

audit();
