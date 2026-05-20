import type { ColorStackOpportunity } from '@/lib/opportunityTypes';

function parseDeadlineMs(deadline?: string): number | null {
    if (!deadline) return null;
    const parsed = Date.parse(deadline);
    return Number.isNaN(parsed) ? null : parsed;
}

function postedAtMs(item: ColorStackOpportunity): number | null {
    if (!item.postedAt) return null;
    const parsed = Date.parse(item.postedAt);
    return Number.isNaN(parsed) ? null : parsed;
}

/**
 * Global ingest rank for carousel ordering. Higher = added more recently.
 * Legacy rows may omit pasteIndex; `id` is a monotonic fallback from ingest order.
 */
function ingestRank(item: ColorStackOpportunity): number {
    return item.pasteIndex ?? item.id;
}

/**
 * Sort: explicit deadlines first (earliest due first), then most recently ingested first.
 */
export function sortColorStackOpportunities(
    items: ColorStackOpportunity[],
): ColorStackOpportunity[] {
    return [...items].sort((a, b) => {
        const aDeadline = parseDeadlineMs(a.deadline);
        const bDeadline = parseDeadlineMs(b.deadline);
        const aHasDeadline = aDeadline !== null;
        const bHasDeadline = bDeadline !== null;

        if (aHasDeadline && !bHasDeadline) return -1;
        if (!aHasDeadline && bHasDeadline) return 1;
        if (aHasDeadline && bDeadline !== null) {
            if (aDeadline !== bDeadline) return aDeadline - bDeadline;
        }

        const aPosted = postedAtMs(a);
        const bPosted = postedAtMs(b);
        if (aPosted !== null && bPosted !== null && aPosted !== bPosted) {
            return bPosted - aPosted;
        }
        if (aPosted !== null && bPosted === null) return -1;
        if (aPosted === null && bPosted !== null) return 1;

        const aRank = ingestRank(a);
        const bRank = ingestRank(b);
        if (aRank !== bRank) return bRank - aRank;

        return b.id - a.id;
    });
}
