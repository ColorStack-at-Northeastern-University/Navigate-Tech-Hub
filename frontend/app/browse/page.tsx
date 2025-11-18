'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ResourceCard from '@/components/ui/ResourceCard';
import ProgressTracker from '@/components/ui/ProgressTracker';
import { resources } from '@/data/resources';
import { useState } from 'react';

/**
 * [DEMO UI ENHANCEMENTS - Phase 2]
 * 
 * BrowsePage Component - Enhanced
 * 
 * Displays all available Navigate Tech Hub resources.
 * Includes enhanced search, filters, and better visual presentation.
 */
export default function BrowsePage() {
  // STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // CATEGORY BUTTON DATA
  const categories = [
    { value: 'all', label: 'All', count: resources.length },
    { value: 'interview-prep', label: 'Interview Prep', count: resources.filter(r => r.category === 'interview-prep').length },
    { value: 'classes', label: 'Classes', count: resources.filter(r => r.category === 'classes').length },
    { value: 'projects', label: 'Projects', count: resources.filter(r => r.category === 'projects').length },
    { value: 'hackathons', label: 'Hackathons', count: resources.filter(r => r.category === 'hackathons').length },
    { value: 'community', label: 'Community', count: resources.filter(r => r.category === 'community').length },
  ];

  // Filters the list based on both search query and category
  const filteredResources = resources.filter((r) =>
    (selectedCategory === 'all' || r.category === selectedCategory) &&
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="container-custom px-6 mt-40">
        {/* PAGE HEADER */}
        <div className="animate-fade-in">
          <h1 className="text-4xl mt-15 md:text-5xl font-bold text-neu-red mb-3 tracking-tight">
            Browse All Resources
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Explore our curated collection of guides, articles, and tools for CS students.
          </p>
          <div className="accent-bar max-w-md mb-10"></div>
        </div>

        {/* PROGRESS TRACKER - Mock Feature */}
        <ProgressTracker />

        {/* SEARCH BAR - Enhanced */}
        <div className="mb-10 animate-fade-in animation-delay-100">
          <div className="relative max-w-3xl">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search resources by title..."
              className="w-full pl-16 pr-6 py-4 text-base border-2 border-gray-300 rounded-2xl transition-all duration-300 focus:outline-none focus:border-colorstack-teal focus:shadow-[0_0_0_4px_rgba(61,163,155,0.1)] glass"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-neu-red transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER BUTTONS - Enhanced */}
        <div className="flex flex-wrap gap-3 mb-12 animate-fade-in animation-delay-200">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`
                group relative px-6 py-3 rounded-full text-sm border-2 font-medium transition-all duration-300 
                flex items-center gap-2
                ${selectedCategory === category.value
                  ? 'bg-colorstack-teal border-colorstack-teal text-white shadow-lg scale-105'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-colorstack-teal hover:scale-105 shadow-md'
                    }
                  `}
                >
                  <span>{category.label}</span>
              <span className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${selectedCategory === category.value
                  ? 'bg-white/20'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-colorstack-teal/10'
                }
              `}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Count with Clear Filters */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-bold text-colorstack-teal text-lg">{filteredResources.length}</span> of <span className="font-bold">{resources.length}</span> resources
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-sm text-colorstack-teal hover:text-colorstack-orange font-medium transition-colors underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* RESOURCE GRID */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
                showCategory={false}
              />
            ))}
          </div>
        ) : (
          // NO RESULTS MESSAGE
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-red-600 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
