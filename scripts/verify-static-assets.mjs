/**
 * Verifies files referenced by SITE_ASSETS exist on disk.
 * Run from repo root: node scripts/verify-static-assets.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Paths required for production UI (must exist). */
const REQUIRED_PATHS = [
    '/images/navtechhub-logo.png',
    '/images/husky-head.png',
    '/images/colorstack-logo-red.png',
    '/images/s-icon.png',
    '/fonts/gotham-black.otf',
    '/fonts/archer-semibold.otf',
    '/assets/resume/navigate-tech-hub-resume-template.docx',
];

/** Declared but optional until sample docx are published under samples/. */
const OPTIONAL_PATHS = [
    '/assets/resume/samples/resume-sample-1.docx',
    '/assets/resume/samples/resume-sample-2.docx',
    '/assets/resume/samples/resume-sample-3.docx',
    '/assets/resume/samples/resume-sample-4.docx',
];

let failed = false;

for (const urlPath of REQUIRED_PATHS) {
    const disk = path.join(ROOT, 'frontend/public', urlPath.replace(/^\//, ''));
    if (!fs.existsSync(disk)) {
        console.error(`MISSING (required): ${urlPath}  →  ${disk}`);
        failed = true;
    } else {
        console.log(`ok  ${urlPath}`);
    }
}

for (const urlPath of OPTIONAL_PATHS) {
    const disk = path.join(ROOT, 'frontend/public', urlPath.replace(/^\//, ''));
    if (!fs.existsSync(disk)) {
        console.log(`skip (optional) ${urlPath}`);
    } else {
        console.log(`ok  ${urlPath}`);
    }
}

if (failed) {
    process.exit(1);
}
console.log('\nAll required static assets present.');
