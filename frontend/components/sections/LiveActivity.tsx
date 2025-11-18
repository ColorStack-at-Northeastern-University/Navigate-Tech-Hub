/**
 * [MOCK FEATURE]
 * 
 * Live Activity Section
 * 
 * Displays platform engagement metrics and trending resources.
 * 
 * NOTE: This is a preview feature using mock data.
 * Production version would connect to real analytics API.
 */

'use client';

import Link from 'next/link';
import { mockLiveStats } from '@/data/mockActivity';
import { useState, useEffect } from 'react';

export default function LiveActivity() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const rankBadges = ['#1', '#2', '#3'];

  return (
    <section className="container-custom">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="section-title mb-0">Live Activity</h3>
        {/* Live indicator with pulse */}
        <div className="flex items-center gap-2 bg-neu-red text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          <span>LIVE</span>
        </div>
        {/* Preview badge */}
        <span className="text-xs bg-colorstack-orange/20 text-colorstack-orange px-3 py-1 rounded-full font-semibold">
          Preview Feature
        </span>
      </div>

      <div className="accent-bar"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Views Today */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover-lift border-l-4 border-neu-red">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Views Today</span>
              </div>
              <div className="text-4xl font-bold text-neu-red">
                {isVisible ? <CountUp end={mockLiveStats.viewsToday} duration={1500} /> : 0}
              </div>
            </div>

            {/* Bookmarks This Week */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover-lift border-l-4 border-colorstack-teal">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Bookmarks</span>
              </div>
              <div className="text-4xl font-bold text-colorstack-teal">
                {isVisible ? <CountUp end={mockLiveStats.bookmarksThisWeek} duration={1500} /> : 0}
              </div>
            </div>

            {/* Pending Contributions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover-lift border-l-4 border-colorstack-orange">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Contributions</span>
              </div>
              <div className="text-4xl font-bold text-colorstack-orange">
                {isVisible ? <CountUp end={mockLiveStats.pendingContributions} duration={1500} /> : 0}
              </div>
            </div>
          </div>

          {/* Trending This Week */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h4 className="text-2xl font-bold text-neu-black mb-6">
              Trending This Week
            </h4>
            <div className="space-y-4">
              {mockLiveStats.trending.map((item) => (
                <Link
                  key={item.slug}
                  href={`/interview-prep/${item.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-colorstack-teal"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-colorstack-teal">{rankBadges[item.rank - 1]}</span>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-colorstack-teal transition-colors">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">{item.views} views</div>
                    </div>
                  </div>
                  <span className="text-colorstack-teal opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="bg-white rounded-xl p-8 shadow-md h-fit">
          <h4 className="text-xl font-bold text-neu-black mb-6">
            Recently Viewed
          </h4>
          <div className="space-y-4">
            {mockLiveStats.recentActivity.map((item, index) => (
              <div
                key={item.slug}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-colorstack-teal rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{item.resourceTitle}</div>
                  <div className="text-xs text-gray-500">{item.timeAgo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note about mock data */}
      <div className="mt-8 p-4 bg-colorstack-teal/10 rounded-lg border border-colorstack-teal/20">
        <p className="text-sm text-gray-700 text-center">
          <strong>Demo Mode:</strong> This data is simulated to showcase the vision. 
          In production, this would display real-time platform analytics.
        </p>
      </div>
    </section>
  );
}

/**
 * Simple count-up animation component
 */
function CountUp({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(startCount + (end - startCount) * easeOutQuad(progress));

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
}

