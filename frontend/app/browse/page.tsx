'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ResourceCard from '@/components/ui/ResourceCard';
import { resources } from '@/data/resources';
import { useState } from 'react';

/**
 * BrowsePage Component
 * 
 * Displays all available Navigate Tech Hub resources.
 * Includes search and category filter functionality for easy browsing.
 */
export default function BrowsePage() {
  // STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  console.log("Resources loaded:", resources.length); // Debugging helper

  // CATEGORY BUTTON DATA
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'interview-prep', label: 'Interview Prep' },
    { value: 'classes', label: 'Classes' },
    { value: 'projects', label: 'Projects' },
    { value: 'hackathons', label: 'Hackathons' },
    { value: 'community', label: 'Community' },
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
        <h1 className="text-4xl mt-15 md:text-5xl font-bold text-red-600 mb-3">
          Browse All Resources
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Explore our curated collection of guides, articles, and tools for CS students.
        </p>

        {/* ACCENT BAR */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-teal-500 to-amber-400 rounded-full mb-10"></div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search resources by title..."
            className="w-full max-w-2xl px-6 py-3 text-base border-2 border-gray-300 rounded-full transition-all duration-300 focus:outline-none focus:border-colorstack-teal focus:shadow-[0_0_0_3px_rgba(61,163,155,0.1)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-5 py-2 rounded-full text-sm border-2 font-medium transition-all duration-200 ${selectedCategory === category.value
                ? 'bg-colorstack-teal border-colorstack-teal text-white'
                : 'bg-white border-gray-300 text-black hover:border-colorstack-teal'
                }`}
            >
              {category.label}
            </button>
          ))}
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
