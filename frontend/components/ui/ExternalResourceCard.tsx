import { ApplicationStatus, ExternalResourceCardProps, RiskFlag } from '@/lib/types';
import { formatDate } from '@/lib/utils';

/**
 * ExternalResourceCard
 *
 * Renders a clickable external-link card with two visual modes:
 *   - **Standard resource** (interview-prep, community, classes, etc.) —
 *     uses the legacy "External Link" / `badge` field treatment.
 *   - **Program** (`category === 'programs'`) — replaces the badge with an
 *     `applicationStatus`-driven colored badge, surfaces audience and
 *     locality pills, and shows `lastVerified` instead of `lastUpdated`.
 *
 * The card itself is a single `<a>` to the external URL. Inner pills are
 * presentational only — no nested links — to keep the whole card a single
 * click target with predictable focus behavior.
 */
export default function ExternalResourceCard({ resource }: ExternalResourceCardProps) {
    const safeUrl = resource.url?.trim() || '#';
    const displayHost = parseDisplayHost(safeUrl);
    const isProgram = resource.category === 'programs';
    const statusBadge = isProgram ? renderStatusBadge(resource.applicationStatus, resource.applicationDeadline) : null;

    return (
        <a
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 border-t-[3px] border-neu-red cursor-pointer"
        >
            {statusBadge ?? (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-neu-red text-white uppercase tracking-wide">
                    {resource.badge || 'External Link'}
                </span>
            )}

            <h4 className="text-2xl font-semibold mb-3 text-neu-black mt-4 pr-24">
                {resource.title}
            </h4>

            <p className="text-gray-600 mb-4 leading-relaxed">
                {resource.description}
            </p>

            {isProgram && hasAnyPill(resource.audienceSpecific, resource.bostonLocal, resource.riskFlag) && (
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
    );
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

/**
 * Shows the most authoritative freshness signal available.
 * Programs surface `lastVerified` (a human confirmed it's live);
 * other resources fall back to Strapi's `updatedAt`.
 */
function renderFreshnessLine(lastVerified?: string, lastUpdated?: string) {
    if (lastVerified) {
        const date = new Date(lastVerified);
        const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return (
            <p className="text-xs text-gray-500 mt-2">
                Verified {month}
            </p>
        );
    }
    if (lastUpdated) {
        return (
            <p className="text-xs text-gray-500 mt-2">
                Updated {formatDate(lastUpdated)}
            </p>
        );
    }
    return null;
}

interface StatusBadgeStyle {
    label: string;
    bg: string;
    fg: string;
}

function renderStatusBadge(status?: ApplicationStatus, deadline?: string) {
    if (!status) return null;
    const style = applicationStatusStyle(status, deadline);
    return (
        <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${style.bg} ${style.fg}`}
        >
            {style.label}
        </span>
    );
}

/**
 * Status -> visual treatment. Colors map to user intent:
 * green = act now, amber = act soon, blue = passive, gray = parked.
 * Deadline (when present) is appended to "closing-soon" to give the user
 * a concrete date instead of a vague label.
 */
function applicationStatusStyle(status: ApplicationStatus, deadline?: string): StatusBadgeStyle {
    switch (status) {
        case 'apply-now':
            return { label: 'Apply Now', bg: 'bg-green-600', fg: 'text-white' };
        case 'closing-soon':
            return {
                label: deadline ? `Closes ${formatShortDate(deadline)}` : 'Closing Soon',
                bg: 'bg-amber-500',
                fg: 'text-white',
            };
        case 'rolling':
            return { label: 'Rolling Apps', bg: 'bg-blue-600', fg: 'text-white' };
        case 'opens-fall-2026':
            return { label: 'Opens Fall 2026', bg: 'bg-gray-200', fg: 'text-gray-700' };
        case 'uncertain-2026':
            return { label: 'Verify First', bg: 'bg-yellow-100', fg: 'text-yellow-800' };
        case 'closed-this-cycle':
            return { label: 'Reopens Next Cycle', bg: 'bg-gray-300', fg: 'text-gray-700' };
        case 'year-round':
            return { label: 'Year-Round', bg: 'bg-blue-100', fg: 'text-blue-800' };
    }
}

function formatShortDate(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
