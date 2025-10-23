/**
 * Browse Page (Skeleton)
 * 
 * Displays all resources with search and category filtering functionality.
 * Allows users to browse the full resource library with interactive filters.
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { resources } from '@/data/resources';
import { useState } from 'react';

/**
 * Browse page component
 * Shows all resources with search and category filtering
 */
export default function BrowsePage() {
    /**
     * TODO: Initialize State Variables
     * 
     * Description: Set up state for search input and category filter
     * Acceptance Criteria:
     * - [ ] Create searchQuery state (string, default empty)
     * - [ ] Create selectedCategory state (string, default 'all')
     * 
     * Hint: const [searchQuery, setSearchQuery] = useState('')
     */
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    /**
     * TODO: Filter Resources
     * 
     * Description: Filter resources based on search query and selected category
     * Acceptance Criteria:
     * - [ ] Filter by category (if not 'all')
     * - [ ] Filter by search query (case-insensitive title search)
     * - [ ] Store result in filteredResources variable
     * 
     * Hint: Use array.filter() method
     * Example: resources.filter(r => 
     *   (selectedCategory === 'all' || r.category === selectedCategory) &&
     *   r.title.toLowerCase().includes(searchQuery.toLowerCase())
     * )
     */
    const filteredResources = resources; // Replace with actual filter logic

    // Category options for filter buttons
    const categories = [
        { value: 'all', label: 'All' },
        { value: 'interview-prep', label: 'Interview Prep' },
        { value: 'classes', label: 'Classes' },
        { value: 'projects', label: 'Projects' },
        { value: 'hackathons', label: 'Hackathons' },
        { value: 'community', label: 'Community' },
    ];

    return (
        <>
            <Navbar />

            <main className="container-custom mt-16">
                {/* Page Header */}
                <h1 className="page-title">Browse All Resources</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Explore our curated collection of guides, articles, and tools for CS students.
                </p>
                <div className="accent-bar"></div>

                {/**
         * TODO: Search Bar
         * 
         * Description: Create search input that filters resources by title
         * Acceptance Criteria:
         * - [ ] Input element with placeholder "Search resources by title..."
         * - [ ] Full width on mobile, max-width on desktop
         * - [ ] Rounded pill shape (rounded-full)
         * - [ ] Border changes to teal on focus
         * - [ ] Updates searchQuery state on change
         * 
         * Hint: onChange={(e) => setSearchQuery(e.target.value)}
         * Styling: w-full max-w-2xl px-6 py-3 border-2 border-gray-300 rounded-full
         * Focus: focus:outline-none focus:border-colorstack-teal
         */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search resources by title..."
                        className="w-full max-w-2xl px-6 py-3 text-base border-2 border-gray-300 rounded-full font-sans transition-all duration-300 focus:outline-none focus:border-colorstack-teal focus:shadow-[0_0_0_3px_rgba(61,163,155,0.1)]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/**
         * TODO: Category Filter Buttons
         * 
         * Description: Create buttons to filter resources by category
         * Acceptance Criteria:
         * - [ ] Map over categories array
         * - [ ] Render button for each category
         * - [ ] Active button has teal background and white text
         * - [ ] Inactive buttons have white background and gray border
         * - [ ] Clicking button updates selectedCategory state
         * - [ ] Buttons wrap on mobile
         * 
         * Hint: onClick={() => setSelectedCategory(category.value)}
         * Active check: selectedCategory === category.value
         * Active styles: bg-colorstack-teal border-colorstack-teal text-white
         * Inactive styles: bg-white border-gray-300 text-neu-black hover:border-colorstack-teal
         */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {/* Map over categories and render buttons here */}
                </div>

                {/**
         * TODO: Resources Grid
         * 
         * Description: Display filtered resources in responsive grid
         * Acceptance Criteria:
         * - [ ] Grid with 1 col on mobile, 2 on tablet, 3 on desktop
         * - [ ] Map over filteredResources array
         * - [ ] Render ResourceCard for each resource
         * - [ ] Pass resource prop and showCategory={false}
         * - [ ] Use resource.slug as key
         * 
         * Hint: {filteredResources.map((resource) => (
         *   <ResourceCard key={resource.slug} resource={resource} showCategory={false} />
         * ))}
         */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Map filteredResources here */}
                </div>

                {/**
         * TODO: No Results Message
         * 
         * Description: Show message when no resources match filters
         * Acceptance Criteria:
         * - [ ] Only show when filteredResources.length === 0
         * - [ ] Centered text with padding
         * - [ ] Display "No resources found" heading (h3)
         * - [ ] Display "Try adjusting your search or filter criteria" subtitle
         * 
         * Hint: {filteredResources.length === 0 && (
         *   <div className="text-center py-16">...</div>
         * )}
         */}
                {/* Conditional no results message here */}
            </main>

            <Footer />
        </>
    );
}