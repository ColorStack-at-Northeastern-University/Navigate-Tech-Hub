/**
 * [MOCK FEATURE]
 * 
 * useProgress Hook
 * 
 * Manages user progress tracking for resources.
 * 
 * NOTE: This uses localStorage for demo purposes.
 * Production version would sync with backend API.
 */

'use client';

import { useLocalStorage } from './useLocalStorage';

export interface UserProgress {
  completedResources: string[]; // array of resource slugs
  bookmarkedResources: string[]; // array of resource slugs
  lastVisited: Record<string, string>; // slug → ISO timestamp
}

const INITIAL_PROGRESS: UserProgress = {
  completedResources: [],
  bookmarkedResources: [],
  lastVisited: {},
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    'navigate-tech-hub-progress',
    INITIAL_PROGRESS
  );

  // Mark a resource as completed
  const markCompleted = (slug: string) => {
    if (!progress.completedResources.includes(slug)) {
      setProgress({
        ...progress,
        completedResources: [...progress.completedResources, slug],
      });
    }
  };

  // Unmark a resource as completed
  const unmarkCompleted = (slug: string) => {
    setProgress({
      ...progress,
      completedResources: progress.completedResources.filter((s) => s !== slug),
    });
  };

  // Toggle completion status
  const toggleCompleted = (slug: string) => {
    if (progress.completedResources.includes(slug)) {
      unmarkCompleted(slug);
    } else {
      markCompleted(slug);
    }
  };

  // Bookmark a resource
  const bookmark = (slug: string) => {
    if (!progress.bookmarkedResources.includes(slug)) {
      setProgress({
        ...progress,
        bookmarkedResources: [...progress.bookmarkedResources, slug],
      });
    }
  };

  // Unbookmark a resource
  const unbookmark = (slug: string) => {
    setProgress({
      ...progress,
      bookmarkedResources: progress.bookmarkedResources.filter((s) => s !== slug),
    });
  };

  // Toggle bookmark status
  const toggleBookmark = (slug: string) => {
    if (progress.bookmarkedResources.includes(slug)) {
      unbookmark(slug);
    } else {
      bookmark(slug);
    }
  };

  // Record last visit
  const recordVisit = (slug: string) => {
    setProgress({
      ...progress,
      lastVisited: {
        ...progress.lastVisited,
        [slug]: new Date().toISOString(),
      },
    });
  };

  // Check if resource is completed
  const isCompleted = (slug: string): boolean => {
    return progress.completedResources.includes(slug);
  };

  // Check if resource is bookmarked
  const isBookmarked = (slug: string): boolean => {
    return progress.bookmarkedResources.includes(slug);
  };

  // Get completion percentage for a category
  const getCategoryProgress = (categoryResources: any[]) => {
    const total = categoryResources.length;
    if (total === 0) return 0;
    const completed = categoryResources.filter((r) =>
      progress.completedResources.includes(r.slug)
    ).length;
    return Math.round((completed / total) * 100);
  };

  // Get overall progress
  const getOverallProgress = (allResources: any[]) => {
    const total = allResources.length;
    if (total === 0) return 0;
    const completed = allResources.filter((r) =>
      progress.completedResources.includes(r.slug)
    ).length;
    return {
      percentage: Math.round((completed / total) * 100),
      completed,
      total,
    };
  };

  return {
    progress,
    markCompleted,
    unmarkCompleted,
    toggleCompleted,
    bookmark,
    unbookmark,
    toggleBookmark,
    recordVisit,
    isCompleted,
    isBookmarked,
    getCategoryProgress,
    getOverallProgress,
  };
}

