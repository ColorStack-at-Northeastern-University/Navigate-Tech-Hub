/**
 * [MOCK FEATURE]
 * 
 * ProgressTracker Component
 * 
 * Dashboard showing user progress across all resources and categories.
 */

'use client';

import { useProgress } from '@/hooks/useProgress';
import { resources } from '@/data/resources';
import { CATEGORIES } from '@/lib/constants';
import ProgressBar from './ProgressBar';

export default function ProgressTracker() {
  const { getOverallProgress, getCategoryProgress } = useProgress();

  const overall = getOverallProgress(resources);

  // Calculate progress by category
  const categoryProgress = CATEGORIES.map((cat) => {
    const categoryResources = resources.filter((r) => r.category === cat.slug);
    return {
      ...cat,
      resources: categoryResources,
      progress: getCategoryProgress(categoryResources),
      completed: categoryResources.filter((r) =>
        overall.completed > 0 ? true : false // Simplified for demo
      ).length,
      total: categoryResources.length,
    };
  });

  return (
    <div className="bg-white rounded-xl p-8 shadow-md mb-12 border-l-4 border-colorstack-teal animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-bold text-neu-black">Your Learning Progress</h3>
        <span className="text-xs bg-colorstack-teal/20 text-colorstack-teal px-3 py-1 rounded-full font-semibold">
          Preview Feature
        </span>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 pb-8 border-b-2 border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-700">Overall Progress</span>
          <span className="text-2xl font-bold text-colorstack-teal">
            {overall.completed} of {overall.total}
          </span>
        </div>
        <ProgressBar percentage={overall.percentage} color="teal" height="lg" />
      </div>

      {/* By Category */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-4">By Category</h4>
        <div className="space-y-4">
          {categoryProgress.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{cat.label}</span>
                  <span className="text-sm text-gray-600">
                    {cat.progress}% ({cat.total} resources)
                  </span>
                </div>
                <ProgressBar
                  percentage={cat.progress}
                  color={cat.slug === 'interview-prep' ? 'teal' : cat.slug === 'projects' ? 'orange' : 'red'}
                  showLabel={false}
                  height="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Note */}
      <div className="mt-6 p-4 bg-colorstack-teal/10 rounded-lg border border-colorstack-teal/20">
        <p className="text-xs text-gray-700 text-center">
          <strong>Demo Mode:</strong> Progress tracking uses localStorage. 
          Click "Mark as Complete" on any resource to see it in action!
        </p>
      </div>
    </div>
  );
}

