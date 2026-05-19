'use client';

import { useState } from 'react';
import type { ExternalResource, ProgramType } from '@/lib/types';
import { externalResourceListKey } from '@/lib/utils';
import ExternalResourceCard from './ExternalResourceCard';

interface ProgramTypeBucketProps {
    programType: ProgramType;
    label: string;
    blurb: string;
    resources: ExternalResource[];
}

const INITIAL_VISIBLE = 12;

/**
 * Renders one programType sub-section within the Recurring Programs section.
 *
 * Entries are sorted alphabetically (no status-based ordering in the two-tier
 * model — seasonal notes replace deadline/status tracking).
 *
 * Large buckets cap at INITIAL_VISIBLE with a "Show all" expander to avoid
 * a wall of cards on first paint.
 */
export default function ProgramTypeBucket({
    programType,
    label,
    blurb,
    resources,
}: ProgramTypeBucketProps) {
    const sorted = sortAlphabetically(resources);
    const [showAll, setShowAll] = useState(false);

    if (resources.length === 0) return null;

    const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE);
    const hiddenCount = sorted.length - visible.length;

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
                {visible.map((resource) => (
                    <ExternalResourceCard key={externalResourceListKey(resource)} resource={resource} />
                ))}
            </div>

            {hiddenCount > 0 && (
                <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-neu-red border border-neu-red/30 hover:bg-neu-red/5 transition-colors"
                >
                    Show all {sorted.length} {label.toLowerCase()} →
                </button>
            )}
        </div>
    );
}

function sortAlphabetically(resources: ExternalResource[]): ExternalResource[] {
    return [...resources].sort((a, b) => a.title.localeCompare(b.title));
}
