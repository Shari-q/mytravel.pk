const fs = require('fs');
const path = require('path');

function extractVisaDetails(filename) {
    const p = path.join('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/scraped', filename);
    if (!fs.existsSync(p)) return null;
    const html = fs.readFileSync(p, 'utf8');
    const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';
    const clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ');
    return { filename, title, snippet: clean.substring(0, 1000) };
}

console.log('Azerbaijan:', extractVisaDetails('_visas_azerbaijan.html'));
console.log('Thailand:', extractVisaDetails('_visas_thailand.html'));
console.log('Malaysia:', extractVisaDetails('_visas_malaysia.html'));
console.log('Airline offices:', extractVisaDetails('_airline_offices.html'));
console.log('Excursions:', extractVisaDetails('_excursions.html'));
console.log('Insurance:', extractVisaDetails('_travel_insurance.html'));
