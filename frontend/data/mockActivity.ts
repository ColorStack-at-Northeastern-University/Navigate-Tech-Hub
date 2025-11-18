/**
 * [MOCK FEATURE DATA]
 * 
 * Mock activity data for Live Stats & Activity section
 * 
 * NOTE: This is demo data for showcasing platform vision.
 * In production, this would come from backend analytics API.
 */

export interface LiveStats {
  viewsToday: number;
  bookmarksThisWeek: number;
  pendingContributions: number;
  trending: Array<{
    title: string;
    slug: string;
    views: number;
    rank: number;
  }>;
  recentActivity: Array<{
    resourceTitle: string;
    slug: string;
    action: string;
    timeAgo: string;
  }>;
}

export const mockLiveStats: LiveStats = {
  viewsToday: 127,
  bookmarksThisWeek: 45,
  pendingContributions: 3,
  trending: [
    {
      title: 'LeetCode Patterns Guide',
      slug: 'leetcode-patterns-guide',
      views: 89,
      rank: 1,
    },
    {
      title: 'Resume Building Guide',
      slug: 'resume-building-guide',
      views: 67,
      rank: 2,
    },
    {
      title: 'How to Hackathon',
      slug: 'how-to-hackathon',
      views: 54,
      rank: 3,
    },
  ],
  recentActivity: [
    {
      resourceTitle: 'Behavioral Interview Prep',
      slug: 'behavioral-interview-prep',
      action: 'viewed',
      timeAgo: '5m ago',
    },
    {
      resourceTitle: 'Project Ideas Generator',
      slug: 'project-ideas-generator',
      action: 'viewed',
      timeAgo: '12m ago',
    },
    {
      resourceTitle: 'Networking Guide',
      slug: 'cold-emailing-networking',
      action: 'viewed',
      timeAgo: '23m ago',
    },
  ],
};

