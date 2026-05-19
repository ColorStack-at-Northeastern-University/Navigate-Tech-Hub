/**
 * Quick checks for slack-post-dates.mjs
 * Run: node scripts/test-slack-post-dates.mjs
 */

import assert from 'node:assert/strict';
import {
    parseAnchorDate,
    parseSlackTimestampLine,
    segmentSlackPaste,
} from './lib/slack-post-dates.mjs';

const anchor = parseAnchorDate('2026-05-18');

const today = parseSlackTimestampLine('Today at 3:42 PM', anchor);
assert.equal(today?.iso, '2026-05-18');
assert.equal(today?.confidence, 'high');

const yesterday = parseSlackTimestampLine('Yesterday at 11:05 AM', anchor);
assert.equal(yesterday?.iso, '2026-05-17');

const may = parseSlackTimestampLine('May 10 at 2:15 PM', anchor);
assert.equal(may?.iso, '2026-05-10');

const divider = parseSlackTimestampLine('──────── May 12th ────────', anchor);
assert.equal(divider?.iso, '2026-05-12');

const lines = [
    'Today at 9:00 AM',
    'Check this out',
    'https://example.com/job',
    'May 15 at 1:00 PM',
    'Another one',
    'https://example.com/other',
];
const segments = segmentSlackPaste(lines, anchor);
assert.ok(segments.length >= 2);

console.log('slack-post-dates: ok');
