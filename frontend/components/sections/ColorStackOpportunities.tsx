/**
 * [MOCK FEATURE]
 * 
 * ColorStack Opportunities Section
 * 
 * Displays opportunities from ColorStack's #opportunities Slack channel.
 * 
 * NOTE: This is a preview feature using mock data.
 * Production version would integrate with ColorStack Slack API.
 * 
 * PHILOSOPHY: Navigate Tech Hub works WITH ColorStack, not in competition.
 * We amplify ColorStack opportunities, bringing them directly to students.
 */

'use client';

import Link from 'next/link';
import { mockOpportunities } from '@/data/mockOpportunities';
import { useState } from 'react';

export default function ColorStackOpportunities() {
  const [showAll, setShowAll] = useState(false);
  const displayedOpportunities = showAll ? mockOpportunities : mockOpportunities.slice(0, 3);

  return (
    <section className="container-custom">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="section-title mb-0">ColorStack Opportunities</h3>
          {/* Preview badge */}
          <span className="text-xs bg-colorstack-teal/20 text-colorstack-teal px-3 py-1 rounded-full font-semibold">
            Preview Feature
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Live from <strong className="text-colorstack-teal">#opportunities</strong> channel</span>
        </div>
      </div>

      <p className="text-lg text-gray-600 mb-6 max-w-3xl">
        Navigate Tech Hub integrates with ColorStack to bring opportunities directly to you. 
        <strong className="text-colorstack-teal"> We're better together.</strong>
      </p>

      <div className="accent-bar"></div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedOpportunities.map((opp, index) => (
          <div
            key={opp.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-colorstack-teal card-hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-bold text-lg text-neu-black mb-1 leading-tight">
                  {opp.title}
                </h4>
                <p className="text-colorstack-teal font-semibold text-sm">{opp.company}</p>
              </div>
            </div>

            {/* Posted By */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <span>Posted by <strong>{opp.postedBy}</strong></span>
              <span className="text-gray-400">•</span>
              <span>{opp.relativeTime}</span>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-600">Comp:</span>
                <span className="font-medium text-gray-700">{opp.compensation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-600">Location:</span>
                <span className="font-medium text-gray-700">{opp.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-600">Deadline:</span>
                <span className="font-medium text-gray-700">{opp.deadline}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {opp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Apply Button */}
            <a
              href={opp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-colorstack-teal text-white py-2 rounded-lg font-semibold hover:bg-colorstack-orange transition-colors"
            >
              View Careers Page
            </a>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      {mockOpportunities.length > 3 && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-block bg-white text-colorstack-teal border-2 border-colorstack-teal px-8 py-3 rounded-full font-semibold hover:bg-colorstack-teal hover:text-white transition-colors shadow-md"
          >
            {showAll ? 'Show Less' : `View All ${mockOpportunities.length} Opportunities`}
          </button>
        </div>
      )}

      {/* Call to Action - Join ColorStack */}
      <div className="bg-gradient-to-r from-colorstack-teal to-colorstack-teal/80 text-white rounded-xl p-8 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-3">
            Want access to all opportunities?
          </h4>
          <p className="text-lg mb-6 opacity-95">
            This is just a preview. Join ColorStack Slack for full access to the #opportunities channel
            and connect with thousands of Black and Latinx tech professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.colorstack.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-colorstack-teal px-8 py-3 rounded-full font-semibold hover:bg-neu-black hover:text-white transition-colors shadow-md"
            >
              Join ColorStack
            </a>
            <a
              href="https://www.colorstack.org/slack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-colorstack-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-neu-red transition-colors shadow-md"
            >
              View All in Slack
            </a>
          </div>
        </div>
      </div>

      {/* Note about integration philosophy */}
      <div className="mt-8 p-4 bg-colorstack-teal/10 rounded-lg border border-colorstack-teal/20">
        <p className="text-sm text-gray-700 text-center">
          <strong>Our Philosophy:</strong> Navigate Tech Hub works WITH ColorStack resources, not in competition. 
          We're building infrastructure for collective success by bringing opportunities directly to you.
        </p>
      </div>
    </section>
  );
}

