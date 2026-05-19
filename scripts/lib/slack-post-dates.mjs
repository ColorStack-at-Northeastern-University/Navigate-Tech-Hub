/**
 * Slack paste helpers: segment messages and resolve postedAt (ISO YYYY-MM-DD).
 * Conservative parsing — ambiguous dates return null and rely on paste order.
 */

const MONTHS = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
};

/** @param {string} isoDate YYYY-MM-DD */
export function parseAnchorDate(isoDate) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
    if (!m) throw new Error(`Invalid anchor date (use YYYY-MM-DD): ${isoDate}`);
    const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
    if (Number.isNaN(d.getTime())) throw new Error(`Invalid anchor date: ${isoDate}`);
    return d;
}

function toIsoDate(d) {
    return d.toISOString().slice(0, 10);
}

function addDays(anchor, days) {
    const d = new Date(anchor.getTime());
    d.setUTCDate(d.getUTCDate() + days);
    return d;
}

function resolveYear(monthIndex, day, anchor) {
    let year = anchor.getUTCFullYear();
    const candidate = new Date(Date.UTC(year, monthIndex, day));
    const sixMonthsMs = 183 * 24 * 60 * 60 * 1000;
    if (candidate.getTime() > anchor.getTime() + sixMonthsMs) {
        year -= 1;
    }
    return year;
}

/**
 * Try to parse a single line as a Slack timestamp or date divider.
 * @returns {{ iso: string, confidence: 'high' | 'low' } | null}
 */
export function parseSlackTimestampLine(line, anchor) {
    const trimmed = line.trim();
    if (!trimmed) return null;

    // Today / Yesterday at H:MM AM
    let m = /^(Today|Yesterday)\s+at\s+\d{1,2}:\d{2}\s*(?:AM|PM)?/i.exec(trimmed);
    if (m) {
        const offset = m[1].toLowerCase() === 'yesterday' ? -1 : 0;
        return { iso: toIsoDate(addDays(anchor, offset)), confidence: 'high' };
    }

    // May 18 at 2:15 PM  |  May 18th at ...
    m = /^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?\s+at\s+\d{1,2}:\d{2}/i.exec(trimmed);
    if (m) {
        const monthKey = m[1].toLowerCase();
        if (MONTHS[monthKey] !== undefined) {
            const day = Number(m[2]);
            const year = resolveYear(MONTHS[monthKey], day, anchor);
            return { iso: toIsoDate(new Date(Date.UTC(year, MONTHS[monthKey], day))), confidence: 'high' };
        }
    }

    // Date divider: May 18th, 2026  |  May 18, 2026  |  ─── May 18th ───
    m = /(?:^|[^\d])([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?(?:\s|$|[^\d])/i.exec(trimmed);
    if (m && MONTHS[m[1].toLowerCase()] !== undefined) {
        const monthIndex = MONTHS[m[1].toLowerCase()];
        const day = Number(m[2]);
        const year = m[3] ? Number(m[3]) : resolveYear(monthIndex, day, anchor);
        if (day >= 1 && day <= 31) {
            return { iso: toIsoDate(new Date(Date.UTC(year, monthIndex, day))), confidence: m[3] ? 'high' : 'high' };
        }
    }

    // Monday at 9:00 AM (low confidence)
    m = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+at\s+\d{1,2}:\d{2}/i.exec(trimmed);
    if (m) {
        return { iso: toIsoDate(anchor), confidence: 'low' };
    }

    // Username   3:42 PM (desktop copy — use anchor day)
    m = /\s\d{1,2}:\d{2}\s*(?:AM|PM)\s*$/i.exec(trimmed);
    if (m && !/https?:\/\//.test(trimmed) && trimmed.length < 120) {
        return { iso: toIsoDate(anchor), confidence: 'low' };
    }

    return null;
}

/**
 * Split paste into segments; each segment inherits the latest seen postedAt.
 * @param {string[]} lines
 * @param {Date} anchor
 */
export function segmentSlackPaste(lines, anchor) {
    /** @type {{ startLine: number, lines: string[], postedAt: string | null, confidence: 'high' | 'low' | 'none' }[]} */
    const segments = [];
    let current = { startLine: 0, lines: [], postedAt: null, confidence: 'none' };

    for (let i = 0; i < lines.length; i++) {
        const parsed = parseSlackTimestampLine(lines[i], anchor);
        if (parsed) {
            if (current.lines.length > 0 || current.postedAt) {
                segments.push(current);
            }
            current = {
                startLine: i,
                lines: [],
                postedAt: parsed.iso,
                confidence: parsed.confidence,
            };
            continue;
        }
        current.lines.push(lines[i]);
    }
    if (current.lines.length > 0 || current.postedAt) {
        segments.push(current);
    }
    if (segments.length === 0) {
        segments.push({ startLine: 0, lines: [...lines], postedAt: null, confidence: 'none' });
    }
    return segments;
}

/** Map line index -> segment index */
export function lineToSegmentIndex(segments, lineCount) {
    const map = new Array(lineCount).fill(0);
    let segIdx = 0;
    for (let i = 0; i < lineCount; i++) {
        while (
            segIdx + 1 < segments.length
            && i >= segments[segIdx + 1].startLine
        ) {
            segIdx += 1;
        }
        map[i] = segIdx;
    }
    return map;
}
