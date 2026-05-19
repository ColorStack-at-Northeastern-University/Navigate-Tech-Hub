/**
 * parse-opportunities.mjs
 *
 * Converts a raw paste of ColorStack #opportunities Slack messages into a
 * structured ColorStackOpportunity[] array ready to drop into
 * frontend/data/opportunities.ts.
 *
 * Usage:
 *   1. Paste your raw Slack export into a text file, e.g. raw-opps.txt
 *   2. Run:
 *        node scripts/parse-opportunities.mjs raw-opps.txt
 *      or pipe directly:
 *        pbpaste | node scripts/parse-opportunities.mjs
 *
 * Output:
 *   Prints a JSON array to stdout. Redirect to a file if you like:
 *        node scripts/parse-opportunities.mjs raw-opps.txt > parsed.json
 *
 * The script:
 *   - Extracts all https:// URLs from the paste
 *   - Skips noise URLs (LinkedIn feeds, Slack archives, Google Forms, etc.)
 *   - For each URL, tries to extract context from surrounding text
 *   - Deduplicates by URL
 *   - Outputs an array with best-guess fields you can then hand-edit
 */

import fs from 'node:fs';
import readline from 'node:readline';

// ---------------------------------------------------------------------------
// URL filtering — skip non-opportunity links
// ---------------------------------------------------------------------------

const SKIP_PATTERNS = [
    /linkedin\.com\/feed\//,
    /linkedin\.com\/posts\//,
    /linkedin\.com\/redir\//,
    /colorstack-family\.slack\.com/,
    /app\.outlier\.ai\/expert\/referrals/,
    /curious-cardinals\.referral-factory/,
    /joinhandshake\.com\/move-program/,
    /docs\.google\.com\/forms/,
    /forms\.office\.com/,
    /surveymonkey\.com/,
    /adobeforeducation\.com\/student-ambassador/,
    /youtube\.com/,
    /nextofferup\.com/,
    /risehub\.site/,
    /paraform\.com\/share/,        // referral links
    /forms\.gle\//,
    /bit\.ly\//,
    /lnkd\.in\//,
    /click\.appcast\.io/,
    /nightshift-agi\.com\/careers/,
    /pulse\.aws\/application/,
    /builder\.aws\.com/,
    /bmc\.com/,
];

function isSkippable(url) {
    return SKIP_PATTERNS.some((p) => p.test(url));
}

// ---------------------------------------------------------------------------
// Type heuristics
// ---------------------------------------------------------------------------

function guessType(title = '', company = '', url = '') {
    const t = (title + ' ' + url).toLowerCase();
    if (/co-?op/i.test(t)) return 'co-op';
    if (/new.?grad|recent.?grad|associate.*program/i.test(t)) return 'new-grad';
    if (/fellowship|residency|academy|summit|insight|early.id|apprentice/i.test(t)) return 'program';
    if (/scholarship/i.test(t)) return 'scholarship';
    if (/intern/i.test(t)) return 'internship';
    return 'other';
}

// ---------------------------------------------------------------------------
// Company / title extraction from link preview text
// Pattern in Slack export: URL followed by "CompanyTitle..." block
// ---------------------------------------------------------------------------

function extractContext(lines, urlLineIdx) {
    // Look at the line containing the URL and up to 5 lines after for preview text
    const contextLines = lines.slice(urlLineIdx, urlLineIdx + 6).join(' ');

    // Try to detect company from known domains
    const urlLine = lines[urlLineIdx] || '';
    let company = '';
    let title = '';

    const domainMap = [
        [/careers\.sharkninja\.com/, 'SharkNinja'],
        [/jobs\.ashbyhq\.com\/Strava/, 'Strava'],
        [/draftkings\.wd1\.myworkdayjobs\.com/, 'DraftKings'],
        [/careers\.point72\.com/, 'Point72'],
        [/fiveringsllc/, 'Five Rings'],
        [/job-boards\.greenhouse\.io\/youcom/, 'You.com'],
        [/app\.ripplematch\.com/, 'eBay (via RippleMatch)'],
        [/nvidia\.wd5\.myworkdayjobs\.com/, 'NVIDIA'],
        [/jobs\.nvidia\.com/, 'NVIDIA'],
        [/jj\.wd5\.myworkdayjobs\.com/, 'Johnson & Johnson'],
        [/sofi\.com\/careers/, 'SoFi'],
        [/imc\.com\/us\/careers/, 'IMC Trading'],
        [/job-boards\.greenhouse\.io\/typeface/, 'Typeface'],
        [/citadel\.com\/careers/, 'Citadel'],
        [/careers\.sig\.com/, 'SIG (Susquehanna)'],
        [/university-uber\.icims\.com/, 'Uber'],
        [/careers\.datadoghq\.com/, 'Datadog'],
        [/jobs\.ashbyhq\.com\/Strava/, 'Strava'],
        [/jobs\.ashbyhq\.com\/cohere/, 'Cohere'],
        [/amazon\.jobs/, 'Amazon'],
        [/stripe\.com\/jobs/, 'Stripe'],
        [/shopify\.com\/careers/, 'Shopify'],
        [/dap\.shopify\.com/, 'Shopify'],
        [/talent\.wellsfargojobs\.com/, 'Wells Fargo'],
        [/careers\.snowflake\.com/, 'Snowflake'],
        [/careers\.docusign\.com/, 'Docusign'],
        [/lifeattiktok\.com/, 'TikTok'],
        [/jobs\.ashbyhq\.com\/replit/, 'Replit'],
        [/www\.skydio\.com\/careers/, 'Skydio'],
        [/jobs\.ashbyhq\.com\/triumph/, 'Triumph Arcade'],
        [/salesforce\.wd12\.myworkdayjobs\.com/, 'Salesforce'],
        [/salesforce-builderlab\.splashthat\.com/, 'Salesforce'],
        [/careers\.nutanix\.com/, 'Nutanix'],
        [/jobs\.nvidia\.com/, 'NVIDIA'],
        [/www\.tesla\.com\/careers/, 'Tesla'],
        [/haier\.wd3\.myworkdayjobs\.com/, 'GE Appliances'],
        [/careers\.ibm\.com/, 'IBM'],
        [/career-boards\.greenhouse\.io\/cloudflare/, 'Cloudflare'],
        [/job-boards\.greenhouse\.io\/cloudflare/, 'Cloudflare'],
        [/databricks\.com\/blog/, 'Databricks'],
        [/zoom\.wd5\.myworkdayjobs\.com/, 'Zoom'],
        [/bloomenergy\.wd1\.myworkdayjobs\.com/, 'Bloom Energy'],
        [/cursor\.com\/careers/, 'Cursor'],
        [/hioscar\.com\/careers/, 'Oscar Health'],
        [/careers\.airbnb\.com/, 'Airbnb'],
        [/jobs\.ashbyhq\.com\/arcade-ai/, 'Arcade AI'],
        [/bloomberg\.wd1\.myworkdayjobs\.com/, 'Bloomberg'],
        [/careers\.veeam\.com/, 'Veeam'],
        [/job-boards\.greenhouse\.io\/formationbio/, 'Formation Bio'],
        [/job-boards\.greenhouse\.io\/axon/, 'Axon'],
        [/hp\.wd5\.myworkdayjobs\.com/, 'HP'],
        [/voloridge-investment-management\.hiringthing\.com/, 'Voloridge'],
        [/job-boards\.greenhouse\.io\/aquaticcapitalmanagement/, 'Aquatic Capital'],
        [/jobright\.ai/, 'via Jobright'],
        [/janestreet\.com/, 'Jane Street'],
        [/careers\.google\.com/, 'Google'],
        [/arrowstreetcapital\.wd5\.myworkdayjobs\.com/, 'Arrowstreet Capital'],
        [/akunacapital\.com/, 'Akuna Capital'],
        [/job-boards\.greenhouse\.io\/verkada/, 'Verkada'],
        [/paradigm\.xyz/, 'Paradigm'],
        [/www\.imc\.com\/us\/careers/, 'IMC Trading'],
        [/careers\.progressive\.com/, 'Progressive'],
        [/dsp\.prng\.co/, 'Intuit'],
        [/salesforce\.wd12/, 'Salesforce'],
        [/job-boards\.greenhouse\.io\/figureai/, 'Figure AI'],
        [/jobs\.aon\.com/, 'Aon'],
        [/gsk-us-earlytalent\.icims\.com/, 'GSK'],
        [/shpe\.org/, 'SHPE'],
        [/zoom\.wd5/, 'Zoom'],
        [/spothero\.com\/careers/, 'SpotHero'],
        [/careers\.paramount\.com/, 'Paramount'],
        [/careers\.ibm\.com/, 'IBM'],
        [/careers\.nutanix\.com/, 'Nutanix'],
        [/applytofigfest2026\.figma\.site/, 'Figma'],
    ];

    for (const [pattern, co] of domainMap) {
        if (pattern.test(urlLine)) {
            company = co;
            break;
        }
    }

    // Try to extract title from the context block (line after URL is usually preview title)
    const afterUrl = lines.slice(urlLineIdx + 1, urlLineIdx + 3).join(' ').trim();
    // Link preview title is usually the first sentence before a long description
    const titleMatch = afterUrl.match(/^([^|.\n]+)/);
    if (titleMatch) {
        title = titleMatch[1].trim().slice(0, 100);
    }

    return { company, title };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
    let raw = '';

    // Read from file arg or stdin
    if (process.argv[2]) {
        raw = fs.readFileSync(process.argv[2], 'utf8');
    } else {
        const rl = readline.createInterface({ input: process.stdin });
        const lines = [];
        for await (const line of rl) lines.push(line);
        raw = lines.join('\n');
    }

    const lines = raw.split('\n');
    const urlRegex = /https?:\/\/[^\s)"'>]+/g;

    const seen = new Set();
    const results = [];
    let id = 1;

    for (let i = 0; i < lines.length; i++) {
        const matches = lines[i].match(urlRegex);
        if (!matches) continue;

        for (const rawUrl of matches) {
            // Clean trailing punctuation
            const url = rawUrl.replace(/[.,;!?)]+$/, '');
            if (seen.has(url)) continue;
            if (isSkippable(url)) continue;
            seen.add(url);

            const { company, title: guessedTitle } = extractContext(lines, i);
            const type = guessType(guessedTitle, company, url);

            results.push({
                id: id++,
                title: guessedTitle || '(fill in title)',
                company: company || '(fill in company)',
                url,
                description: undefined,
                type,
                location: undefined,
                deadline: undefined,
                tags: [],
                // metadata to help manual curation:
                _lineContext: lines.slice(Math.max(0, i - 1), i + 3).join(' | ').slice(0, 200),
            });
        }
    }

    // Separate deadline items (manually tagged or heuristically detected)
    // For now just output in extraction order; the check-opportunity-links
    // script handles dead links separately.

    // Strip _lineContext from final output unless DEBUG=1
    const output = results.map(({ _lineContext, ...rest }) =>
        process.env.DEBUG ? { ...rest, _lineContext } : rest
    );

    console.log(JSON.stringify(output, null, 2));
    console.error(`\nExtracted ${output.length} unique opportunities. Review and curate before pasting into frontend/data/opportunities.ts`);
}

main().catch((e) => { console.error(e); process.exit(1); });
