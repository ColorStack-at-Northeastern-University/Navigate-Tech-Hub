'use client';

import { useState } from 'react';
import type { ApplicationStatus, ExternalResource, ProgramType } from '@/lib/types';
import ExternalResourceCard from './ExternalResourceCard';

interface ProgramTypeBucketProps {
    programType: ProgramType;
    label: string;
    blurb: string;
    resources: ExternalResource[];
}

const INITIAL_VISIBLE = 12;

/**
 * Renders one programType sub-section with three IA refinements:
 *
 * 1. **Sort by application status** — apply-now/closing-soon surface first
 *    so a student scrolling sees actionable programs before parked ones.
 * 2. **Default-collapse closed-this-cycle entries** — they still have value
 *    (next-cycle awareness) but should not dominate first paint.
 * 3. **Cap initial render to {INITIAL_VISIBLE} cards** with a "Show all"
 *    expander to keep large buckets (e.g. early-career-program at scale)
 *    from creating a wall.
 *
 * Everything is client-side disclosure — no extra fetches, no URL state.
 * If a bucket only has a handful of cards, no expanders render at all.
 */
export default function ProgramTypeBucket({
    programType,
    label,
    blurb,
    resources,
}: ProgramTypeBucketProps) {
    const { active, closed } = partitionByActivity(resources);
    const sortedActive = sortByStatusPriority(active);
    const sortedClosed = sortByStatusPriority(closed);

    const [showAllActive, setShowAllActive] = useState(false);
    const [showClosed, setShowClosed] = useState(false);

    if (resources.length === 0) return null;

    const visibleActive = showAllActive ? sortedActive : sortedActive.slice(0, INITIAL_VISIBLE);
    const hiddenActiveCount = sortedActive.length - visibleActive.length;

    return (
        <div className="mb-12" id={`programs-${programType}`}>
            <div className="mb-5">
                <h3 className="font-display text-2xl font-semibold text-brand-dark mb-1">
                    {label}
                    <span className="ml-2 text-sm font-normal text-gray-500">({resources.length})</span>
                </h3>
                <p className="text-sm text-gray-600">{blurb}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleActive.map((resource) => (
                    <ExternalResourceCard key={resource.url} resource={resource} />
                ))}
            </div>

            {hiddenActiveCount > 0 && (
                <button
                    type="button"
                    onClick={() => setShowAllActive(true)}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-neu-red border border-neu-red/30 hover:bg-neu-red/5 transition-colors"
                >
                    Show all {sortedActive.length} {label.toLowerCase()} →
                </button>
            )}

            {sortedClosed.length > 0 && (
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => setShowClosed((prev) => !prev)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors"
                        aria-expanded={showClosed}
                    >
                        <span>
                            {showClosed ? 'Hide' : 'Show'} {sortedClosed.length} closed (reopens next cycle)
                        </span>
                        <span className={`transition-transform ${showClosed ? 'rotate-180' : ''}`}>▾</span>
                    </button>

                    {showClosed && (
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90">
                            {sortedClosed.map((resource) => (
                                <ExternalResourceCard key={resource.url} resource={resource} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const STATUS_PRIORITY: Record<ApplicationStatus, number> = {
    'apply-now': 0,
    'closing-soon': 1,
    'rolling': 2,
    'year-round': 3,
    'opens-fall-2026': 4,
    'uncertain-2026': 5,
    'closed-this-cycle': 6,
};

function statusPriority(status?: ApplicationStatus): number {
    if (!status) return 99;
    return STATUS_PRIORITY[status] ?? 50;
}

function sortByStatusPriority(resources: ExternalResource[]): ExternalResource[] {
    return [...resources].sort((a, b) => {
        const diff = statusPriority(a.applicationStatus) - statusPriority(b.applicationStatus);
        if (diff !== 0) return diff;
        return a.title.localeCompare(b.title);
    });
}

/**
 * Splits a bucket into "active" (rendered first) and "closed" (collapsed).
 * Closed-this-cycle is the only status hidden by default — `uncertain-2026`
 * stays visible because the user might still want to act on it.
 */
function partitionByActivity(resources: ExternalResource[]): {
    active: ExternalResource[];
    closed: ExternalResource[];
} {
    const active: ExternalResource[] = [];
    const closed: ExternalResource[] = [];
    for (const resource of resources) {
        if (resource.applicationStatus === 'closed-this-cycle') {
            closed.push(resource);
        } else {
            active.push(resource);
        }
    }
    return { active, closed };
}
