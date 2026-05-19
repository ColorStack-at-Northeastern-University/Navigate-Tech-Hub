import type { ColorStackOpportunity } from '@/lib/opportunityTypes';

/** Assign pasteIndex from file order when missing (higher = earlier in paste = newer). */
export function withPasteIndexFallback(
    items: ColorStackOpportunity[],
): ColorStackOpportunity[] {
    const total = items.length;
    return items.map((item, index) => ({
        ...item,
        pasteIndex: item.pasteIndex ?? total - index,
    }));
}

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
 * Sort: explicit deadlines first (earliest due first), then by postedAt desc,
 * then pasteIndex desc, then id asc.
 */
export function sortColorStackOpportunities(
    items: ColorStackOpportunity[],
): ColorStackOpportunity[] {
    const withIndex = withPasteIndexFallback(items);
    return [...withIndex].sort((a, b) => {
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

        const aPaste = a.pasteIndex ?? 0;
        const bPaste = b.pasteIndex ?? 0;
        if (aPaste !== bPaste) return bPaste - aPaste;

        return a.id - b.id;
    });
}
