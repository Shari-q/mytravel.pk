const fs = require('fs');
const path = require('path');

function extractInfo(fileName) {
    const p = path.join('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/scraped', fileName);
    if (!fs.existsSync(p)) return 'File not found: ' + fileName;
    const html = fs.readFileSync(p, 'utf8');
    // strip scripts and styles
    const clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    return clean;
}

const aboutHtml = extractInfo('_about.html');
const contactHtml = extractInfo('_contact.html');
const termsHtml = extractInfo('_terms_of_service.html');
const privacyHtml = extractInfo('_privacy_policy.html');
const refundHtml = extractInfo('_refund_policy.html');
const receiptHtml = extractInfo('_receipt.html');
const mybookingHtml = extractInfo('_mybooking.html');

console.log('--- ABOUT SNIPPET ---');
const aboutText = aboutHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(aboutText.substring(0, 800));

console.log('--- CONTACT SNIPPET ---');
const contactText = contactHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(contactText.substring(0, 800));

console.log('--- RECEIPT SNIPPET ---');
const receiptText = receiptHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(receiptText.substring(0, 500));

console.log('--- MYBOOKING SNIPPET ---');
const mybookingText = mybookingHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(mybookingText.substring(0, 500));
