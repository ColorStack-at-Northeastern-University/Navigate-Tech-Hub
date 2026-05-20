import type { EmptyStateLink } from '@/components/ui/EmptyResourceState';
import { getSubmitResourceUrl, SITE_CONFIG } from '@/lib/constants';
import type { Resource } from '@/lib/types';

export type GuidesCatalogLoadStatus = 'loaded' | 'empty' | 'unavailable';

export interface GuidesCatalogResult {
    resources: Resource[];
    loadStatus: GuidesCatalogLoadStatus;
}

export interface GuidesEmptyStateContent {
    title: string;
    body: string;
    links?: EmptyStateLink[];
}

export function getGuidesUnavailableEmptyState(): GuidesEmptyStateContent {
    return {
        title: 'Guides temporarily unavailable',
        body: 'We could not load guides from the CMS right now. Please try again in a few minutes. If this keeps happening, let us know so we can fix it.',
        links: [
            { href: getSubmitResourceUrl(), label: 'Report an issue' },
            { href: `mailto:${SITE_CONFIG.directContact.email}`, label: 'Email the team' },
            { href: '/external-resources', label: 'External resources' },
        ],
    };
}

export function resolveGuidesEmptyState(
    loadStatus: GuidesCatalogLoadStatus,
    whenEmpty: GuidesEmptyStateContent,
): GuidesEmptyStateContent | null {
    if (loadStatus === 'loaded') return null;
    if (loadStatus === 'unavailable') return getGuidesUnavailableEmptyState();
    return whenEmpty;
}
