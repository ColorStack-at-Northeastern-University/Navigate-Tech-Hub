import type { ExternalResource, ProgramType, TypicalOpenSeason } from '@/lib/types';

const SEASON_BY_PROGRAM_TYPE: Record<ProgramType, TypicalOpenSeason> = {
    'early-career-program': 'fall',
    'pre-internship': 'spring',
    fellowship: 'spring',
    'insight-event': 'fall',
    conference: 'fall',
};

const SEASON_LABELS: Record<TypicalOpenSeason, string> = {
    spring: 'spring (roughly Feb–Apr)',
    summer: 'summer (roughly May–Jul)',
    fall: 'fall (roughly Aug–Nov)',
    winter: 'winter (roughly Dec–Jan)',
    rolling: 'rolling / multiple windows',
    varies: 'varies by company',
};

/** Month (0-indexed) and day for a reminder ~6 weeks before typical open. */
const REMINDER_BEFORE_OPEN: Record<Exclude<TypicalOpenSeason, 'varies' | 'rolling'>, { month: number; day: number }> = {
    spring: { month: 0, day: 15 },
    summer: { month: 3, day: 15 },
    fall: { month: 6, day: 15 },
    winter: { month: 10, day: 15 },
};

export function seasonLabel(season: TypicalOpenSeason): string {
    return SEASON_LABELS[season];
}

export function defaultSeasonForProgramType(programType?: ProgramType): TypicalOpenSeason {
    if (!programType) return 'varies';
    return SEASON_BY_PROGRAM_TYPE[programType] ?? 'varies';
}

/** Short name to search on a careers site — text after em dash when present. */
export function deriveProgramSearchHint(title: string): string {
    const dash = title.indexOf('—') >= 0 ? title.indexOf('—') : title.indexOf(' - ');
    if (dash !== -1) {
        const hint = title.slice(dash + 1).trim();
        if (hint) return hint;
    }
    const hyphen = title.indexOf(' - ');
    if (hyphen !== -1) {
        const hint = title.slice(hyphen + 3).trim();
        if (hint) return hint;
    }
    return title.trim();
}

export function resolveCareersHubUrl(resource: ExternalResource): string {
    const hub = resource.careersHubUrl?.trim();
    if (hub) return hub;
    return resource.url?.trim() || '#';
}

export function hasDistinctProgramUrl(resource: ExternalResource): boolean {
    const hub = resource.careersHubUrl?.trim();
    const primary = resource.url?.trim();
    if (!hub || !primary) return false;
    try {
        return new URL(hub).href !== new URL(primary).href;
    } catch {
        return hub !== primary;
    }
}

/**
 * Editorial note from Strapi, or a default cycle explanation for recurring programs.
 */
export function resolveSeasonalGuidance(resource: ExternalResource): string {
    if (resource.seasonalNote?.trim()) {
        return resource.seasonalNote.trim();
    }

    const season = resource.typicalOpenSeason ?? defaultSeasonForProgramType(resource.programType);
    const hint = resource.programSearchHint?.trim() || deriveProgramSearchHint(resource.title);
    const host = safeHostname(resolveCareersHubUrl(resource));

    if (season === 'rolling') {
        return `Applications may open year-round. Check ${host} and search for "${hint}" when you are ready to apply.`;
    }
    if (season === 'varies') {
        return `The dedicated program page often rotates each cycle. Around application season, check ${host} and search for "${hint}".`;
    }

    return `Usually opens in ${seasonLabel(season)}. The apply link changes each cycle. Check ${host} and search for "${hint}" as that window approaches.`;
}

function safeHostname(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return 'the company careers site';
    }
}

/**
 * Deterministic day offset (0–13) so same-season programs land on different
 * reminder dates. Prevents Google Calendar conflicts when users add multiple
 * programs from the same recruiting window at once.
 */
function titleDayOffset(title: string): number {
    let sum = 0;
    for (let i = 0; i < title.length; i++) {
        sum += title.charCodeAt(i);
    }
    return sum % 14;
}

function nextReminderDate(season: TypicalOpenSeason, title: string): Date | null {
    if (season === 'varies') return null;

    const offset = titleDayOffset(title);

    if (season === 'rolling') {
        const d = new Date();
        d.setMonth(d.getMonth() + 1, 1 + offset);
        d.setHours(9, 0, 0, 0);
        return d;
    }

    const anchor = REMINDER_BEFORE_OPEN[season];
    const now = new Date();
    let year = now.getFullYear();
    let candidate = new Date(year, anchor.month, anchor.day + offset, 9, 0, 0, 0);
    if (candidate <= now) {
        year += 1;
        candidate = new Date(year, anchor.month, anchor.day + offset, 9, 0, 0, 0);
    }
    return candidate;
}

/** Google Calendar "create event" URL for a check-in reminder. */
export function buildCalendarReminderUrl(resource: ExternalResource): string | null {
    const season = resource.typicalOpenSeason ?? defaultSeasonForProgramType(resource.programType);
    const when = nextReminderDate(season, resource.title);
    if (!when) return null;

    const end = new Date(when.getTime() + 30 * 60 * 1000);
    const hint = resource.programSearchHint?.trim() || deriveProgramSearchHint(resource.title);
    const hub = resolveCareersHubUrl(resource);

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `Check: ${resource.title}`,
        details: [
            `Reminder to look for "${hint}" on the careers site.`,
            `Careers hub: ${hub}`,
            '',
            'Program pages rotate each cycle. The hub link is usually more stable than last year\'s apply URL.',
        ].join('\n'),
        dates: `${formatCalendarInstant(when)}/${formatCalendarInstant(end)}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatCalendarInstant(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
        `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
        `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`
    );
}
