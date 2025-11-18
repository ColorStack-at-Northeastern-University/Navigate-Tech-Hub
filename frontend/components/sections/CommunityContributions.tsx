/**
 * [MOCK FEATURE]
 * 
 * Community Contributions Section
 * 
 * Displays recent community contributions showcasing the collaborative nature.
 * 
 * NOTE: This is a preview feature using mock data.
 * Production version would connect to a contribution management system.
 */

'use client';

import Link from 'next/link';
import { mockContributions } from '@/data/mockContributions';

export default function CommunityContributions() {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'added':
        return '+';
      case 'updated':
        return 'EDIT';
      case 'suggested':
        return 'IDEA';
      default:
        return 'OK';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'added':
        return 'text-colorstack-teal';
      case 'updated':
        return 'text-colorstack-orange';
      case 'suggested':
        return 'text-neu-red';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section className="container-custom">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="section-title mb-0">Community Contributions</h3>
        {/* Preview badge */}
        <span className="text-xs bg-colorstack-teal/20 text-colorstack-teal px-3 py-1 rounded-full font-semibold">
          Preview Feature
        </span>
      </div>

      <div className="accent-bar"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contributions Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-md">
          <h4 className="text-2xl font-bold text-neu-black mb-6">
            Recent Contributions
          </h4>

          <div className="space-y-4">
            {mockContributions.map((contribution, index) => (
              <div
                key={contribution.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-3xl ${getActionColor(contribution.action)}`}>
                  {getActionIcon(contribution.action)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {contribution.contributorName}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {contribution.action}
                    </span>
                  </div>
                  <div className="text-gray-700 font-medium mb-1">
                    "{contribution.resourceTitle}"
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{contribution.relativeTime}</span>
                    {contribution.status === 'published' && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        Published
                      </span>
                    )}
                    {contribution.status === 'pending' && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">
              Want to share your knowledge?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:navigatetechhub@northeastern.edu?subject=Resource Contribution"
                className="inline-block text-center bg-colorstack-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-colorstack-orange transition-colors shadow-md hover:shadow-lg"
              >
                Suggest a Resource
              </a>
              <a
                href="mailto:navigatetechhub@northeastern.edu?subject=Join as Contributor"
                className="inline-block text-center bg-white text-colorstack-teal border-2 border-colorstack-teal px-6 py-3 rounded-full font-semibold hover:bg-colorstack-teal hover:text-white transition-colors"
              >
                Join as Contributor
              </a>
            </div>
          </div>
        </div>

        {/* How to Contribute */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-colorstack-teal to-colorstack-teal/80 text-white rounded-xl p-6 shadow-md">
            <h4 className="text-xl font-bold mb-4">
              How to Contribute
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-white/80 mt-1">•</span>
                <span className="text-sm">Share resources that helped you succeed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/80 mt-1">•</span>
                <span className="text-sm">Update existing guides with your experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/80 mt-1">•</span>
                <span className="text-sm">Suggest external tools you find valuable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/80 mt-1">•</span>
                <span className="text-sm">Fix errors or add clarity to articles</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-neu-red">
            <h4 className="text-lg font-bold mb-3 text-neu-black">
              Why Contribute?
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">\u2713</span>
                Help future students succeed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">\u2713</span>
                Build your portfolio
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">\u2713</span>
                Get credited on the platform
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">\u2713</span>
                Shape the community
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Note about mock data */}
      <div className="mt-8 p-4 bg-colorstack-teal/10 rounded-lg border border-colorstack-teal/20">
        <p className="text-sm text-gray-700 text-center">
          <strong>Demo Mode:</strong> These are simulated contributions. 
          In production, this would show real community activity and contributions.
        </p>
      </div>
    </section>
  );
}

