'use client';

/**
 * BrowseContent Component
 *
 * Client component that handles search and category filtering for the
 * browse page. Receives pre-fetched resources from the server component
 * and filters them client-side.
 */

import { useState } from 'react';
import ResourceCard from '@/components/ui/ResourceCard';
import type { Resource } from '@/lib/types';

const CATEGORIES = [
    { value: 'all', label: 'All' },
    { value: 'interview-prep', label: 'Interview Prep' },
    { value: 'classes', label: 'Classes' },
    { value: 'projects', label: 'Projects' },
    { value: 'hackathons', label: 'Hackathons' },
    { value: 'community', label: 'Community' },
];

interface BrowseContentProps {
    resources: Resource[];
}

/**
 * Renders the search bar, category filter buttons, and the filtered
 * resource card grid. All filtering happens client-side for instant UX.
 */
function resourceMatchesSearch(resource: Resource, queryNormalized: string): boolean {
    if (!queryNormalized) return true;
    const title = (resource.title ?? '').toLowerCase();
    const description = (resource.description ?? '').toLowerCase();
    const tags = (resource.tags ?? []).map((t) => t.toLowerCase()).join(' ');
    return (
        title.includes(queryNormalized)
        || description.includes(queryNormalized)
        || tags.includes(queryNormalized)
    );
}

export default function BrowseContent({ resources }: BrowseContentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const queryNormalized = searchQuery.trim().toLowerCase();

    const filteredResources = resources.filter(
        (r) =>
            (selectedCategory === 'all' || r.category === selectedCategory)
            && resourceMatchesSearch(r, queryNormalized),
    );

    const countsByCategory = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
        if (cat.value === 'all') return acc;
        acc[cat.value] = resources.filter((r) => r.category === cat.value).length;
        return acc;
    }, {});

    return (
        <>
            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search by title, description, or tags..."
                    aria-label="Search guides by title, description, or tags"
                    className="w-full max-w-2xl px-6 py-3 text-base border-2 border-gray-300 rounded-full transition-all duration-300 focus:outline-none focus:border-neu-red focus:shadow-[0_0_0_3px_rgba(212,27,44,0.1)]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Filter by category">
                {CATEGORIES.map((category) => (
                    <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        aria-pressed={selectedCategory === category.value}
                        className={`px-5 py-2 rounded-full text-sm border-2 font-medium transition-all duration-200 ${
                            selectedCategory === category.value
                                ? 'bg-neu-red border-neu-red text-white'
                                : 'bg-white border-gray-300 text-black hover:border-neu-red'
                        }`}
                    >
                        {category.label}
                        {category.value !== 'all' && (
                            <span className="ml-1.5 tabular-nums opacity-80">
                                ({countsByCategory[category.value] ?? 0})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Resource Grid */}
            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredResources.map((resource) => (
                        <ResourceCard
                            key={`${resource.category}-${resource.slug}`}
                            resource={resource}
                            showCategory={false}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold text-red-600 mb-2">
                        No guides match your filters
                    </h3>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Try clearing the search box, choose “All”, or pick a category that lists at least one guide
                        (counts are shown on each category pill).
                    </p>
                </div>
            )}
        </>
    );
}
