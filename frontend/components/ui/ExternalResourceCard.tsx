import { CATEGORIES } from '@/lib/constants';
import { hasDistinctProgramUrl, resolveCareersHubUrl } from '@/lib/programCycle';
import { ExternalResourceCardProps, ResourceCategory, RiskFlag } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import ProgramCycleCallout from '@/components/ui/ProgramCycleCallout';

const ARTICLE_CATEGORY_SLUGS = new Set<ResourceCategory>(
    CATEGORIES.map((entry) => entry.slug),
);

/**
 * ExternalResourceCard
 *
 * Both modes are wrapped in an `<a>` so the card (and title) are fully clickable:
 *
 *   - **Tools & communities** — wraps everything; single link to resource.url.
 *
 *   - **Recurring programs** — wraps title + description + cycle callout in `<a hubUrl>`.
 *     The cycle callout's own buttons (careers hub, calendar) are nested inside with
 *     `event.stopPropagation()` + `event.preventDefault()` so they still work independently.
 *     Related guide link stays outside the main anchor (no nested <a>).
 */
export default function ExternalResourceCard({ resource }: ExternalResourceCardProps) {
    const isRecurring = resource.directoryTier === 'recurring-program';
    const relatedGuideHref = buildRelatedGuideHref(resource.relatedArticleSlug);
    const hasPills = isRecurring && hasAnyPill(resource.audienceSpecific, resource.bostonLocal, resource.riskFlag);

    if (isRecurring) {
        const hubUrl = resolveCareersHubUrl(resource);
        const showAlternateProgramLink = hasDistinctProgramUrl(resource);
        const displayHost = parseDisplayHost(hubUrl);

        return (
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 border-t-[3px] border-neu-red">
                {/* Primary clickable area — full card minus related guide strip */}
                <a
                    href={hubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-8 pt-8 ${relatedGuideHref ? 'pb-4' : 'pb-8'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2`}
                >
                    <h4 className="text-2xl font-semibold mb-3 text-neu-black mt-4 group-hover:text-neu-red transition-colors">
                        {resource.title}
                    </h4>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {resource.description}
                    </p>

                    {/* Cycle callout — buttons inside stop propagation so they don't trigger the card link */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <ProgramCycleCallout resource={resource} />
                    </div>

                    {hasPills && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {resource.audienceSpecific && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-colorstack-teal/10 text-colorstack-teal border border-colorstack-teal/30">
                                    For This Community
                                </span>
                            )}
                            {resource.bostonLocal && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                                    Boston
                                </span>
                            )}
                            {resource.riskFlag && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                                    {riskFlagLabel(resource.riskFlag)}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-neu-red font-semibold">
                                {displayHost} · careers hub
                            </span>
                            <span className="text-2xl text-neu-red transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                        </div>
                        {showAlternateProgramLink && (
                            <p className="text-xs text-gray-400">
                                Also try the saved program link (may be last cycle&apos;s page)
                            </p>
                        )}
                        {renderFreshnessLine(resource.lastVerified, resource.lastUpdated)}
                    </div>
                </a>

                {relatedGuideHref && (
                    <div className="px-8 pb-8 pt-1 border-t border-gray-100">
                        <Link
                            href={relatedGuideHref}
                            className="inline-flex items-center gap-1 text-sm font-medium text-neu-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2 rounded"
                        >
                            Related hub guide
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    // Tools & communities — entire card is one link
    const safeUrl = resource.url?.trim() || '#';
    const displayHost = parseDisplayHost(safeUrl);
    const anchorPad = relatedGuideHref ? 'px-8 pt-8 pb-4' : 'px-8 pt-8 pb-8';

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 border-t-[3px] border-neu-red">
            <a
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2 ${anchorPad}`}
            >
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-neu-red text-white uppercase tracking-wide">
                    {resource.badge || 'External Link'}
                </span>

                <h4 className="text-2xl font-semibold mb-3 text-neu-black mt-4 pr-24 group-hover:text-neu-red transition-colors">
                    {resource.title}
                </h4>

                <p className="text-gray-600 mb-4 leading-relaxed">
                    {resource.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neu-red font-medium">
                            {displayHost}
                        </span>
                        <span className="text-2xl text-neu-red transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </div>
                    {renderFreshnessLine(resource.lastVerified, resource.lastUpdated)}
                </div>
            </a>
            {relatedGuideHref && (
                <div className="px-8 pb-8 pt-1 border-t border-gray-100">
                    <Link
                        href={relatedGuideHref}
                        className="inline-flex items-center gap-1 text-sm font-medium text-neu-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2 rounded"
                    >
                        Related hub guide
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

function buildRelatedGuideHref(raw?: string): string | null {
    const trimmed = raw?.trim();
    if (!trimmed) return null;
    const slashIndex = trimmed.indexOf('/');
    if (slashIndex <= 0 || slashIndex === trimmed.length - 1) return null;
    const category = trimmed.slice(0, slashIndex) as ResourceCategory;
    const slug = trimmed.slice(slashIndex + 1).trim();
    if (!slug || !ARTICLE_CATEGORY_SLUGS.has(category)) return null;
    return `/${category}/${slug}`;
}

function parseDisplayHost(url: string): string {
    try {
        const parsed = new URL(url);
        return parsed.hostname.replace(/^www\./, '');
    } catch {
        return 'External link';
    }
}

function hasAnyPill(audience?: boolean, boston?: boolean, risk?: RiskFlag): boolean {
    return Boolean(audience || boston || risk);
}

function riskFlagLabel(flag: RiskFlag): string {
    switch (flag) {
        case 'dei-rollback-risk':
            return 'DEI rollback risk';
        case 'deprecated-soon':
            return 'Deprecated soon';
        case 'verify-before-applying':
            return 'Verify before applying';
    }
}

function renderFreshnessLine(lastVerified?: string, lastUpdated?: string) {
    if (lastVerified) {
        const date = new Date(lastVerified);
        const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return <p className="text-xs text-gray-500 mt-2">Verified {month}</p>;
    }
    if (lastUpdated) {
        return <p className="text-xs text-gray-500 mt-2">Updated {formatDate(lastUpdated)}</p>;
    }
    return null;
}
