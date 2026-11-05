const fs = require('fs');
const html = fs.readFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/home.html', 'utf8');
const links = [];
const regex = /href=["']([^"']+)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
}
const uniqueLinks = [...new Set(links)].filter(l => !l.startsWith('#') && !l.startsWith('javascript'));
console.log('Unique links from home.html:');
console.log(uniqueLinks.join('\n'));

// Extract logo
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
const images = [];
while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[0]);
}
console.log('\nImages found:');
console.log(images.slice(0, 15).join('\n'));

// Extract contact text
console.log('\nPhone / emails / addresses found:');
const text = html.replace(/<[^>]+>/g, ' ');
const phones = text.match(/(?:\+?92|03)[0-9\-\s]{8,15}/g) || [];
const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
console.log('Phones:', [...new Set(phones)]);
console.log('Emails:', [...new Set(emails)]);
