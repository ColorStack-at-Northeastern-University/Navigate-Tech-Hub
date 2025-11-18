/**
 * [MOCK FEATURE]
 * 
 * ProgressButtons Component
 * 
 * Interactive buttons for marking resources as completed or bookmarked.
 * Must be client component for localStorage interaction.
 */

'use client';

import { useProgress } from '@/hooks/useProgress';
import { useEffect, useState } from 'react';

interface ProgressButtonsProps {
  slug: string;
}

export default function ProgressButtons({ slug }: ProgressButtonsProps) {
  const { isCompleted, isBookmarked, toggleCompleted, toggleBookmark, recordVisit } = useProgress();
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Initialize from progress state (client-side only)
  useEffect(() => {
    setCompleted(isCompleted(slug));
    setBookmarked(isBookmarked(slug));
    recordVisit(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleToggleCompleted = () => {
    toggleCompleted(slug);
    setCompleted(!completed);
  };

  const handleToggleBookmark = () => {
    toggleBookmark(slug);
    setBookmarked(!bookmarked);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={handleToggleCompleted}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-full font-semibold
          transition-all duration-200 shadow-md hover:shadow-lg
          ${completed
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-colorstack-teal hover:text-colorstack-teal'
          }
        `}
      >
        <span className="text-xl">{completed ? '\u2713' : '\u25CB'}</span>
        <span>{completed ? 'Completed' : 'Mark as Complete'}</span>
      </button>

      <button
        onClick={handleToggleBookmark}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-full font-semibold
          transition-all duration-200 shadow-md hover:shadow-lg
          ${bookmarked
            ? 'bg-colorstack-orange text-white hover:bg-colorstack-orange/90'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-colorstack-orange hover:text-colorstack-orange'
          }
        `}
      >
        <span className="text-xl">{bookmarked ? '\u2605' : '\u2606'}</span>
        <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>

      <span className="text-xs bg-colorstack-teal/20 text-colorstack-teal px-3 py-1 rounded-full font-semibold self-center">
        Preview Feature
      </span>
    </div>
  );
}

