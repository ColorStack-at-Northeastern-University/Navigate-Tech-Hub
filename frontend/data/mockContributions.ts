/**
 * [MOCK FEATURE DATA]
 * 
 * Mock community contributions data
 * 
 * NOTE: This is demo data showcasing the community-driven nature of the platform.
 * In production, this would come from a contribution tracking system.
 */

export interface Contribution {
  id: string;
  contributorName: string;
  action: 'added' | 'updated' | 'suggested';
  resourceTitle: string;
  timestamp: string;
  relativeTime: string;
  status: 'approved' | 'pending' | 'published';
}

export const mockContributions: Contribution[] = [
  {
    id: '1',
    contributorName: 'Maria Chen',
    action: 'added',
    resourceTitle: 'Behavioral Interview Prep Guide',
    timestamp: '2025-11-16T10:30:00',
    relativeTime: '2 days ago',
    status: 'published',
  },
  {
    id: '2',
    contributorName: 'James Wilson',
    action: 'updated',
    resourceTitle: 'LeetCode Patterns Guide',
    timestamp: '2025-11-14T15:45:00',
    relativeTime: '4 days ago',
    status: 'published',
  },
  {
    id: '3',
    contributorName: 'Aisha Patel',
    action: 'suggested',
    resourceTitle: 'Figma for Beginners Tutorial',
    timestamp: '2025-11-11T09:20:00',
    relativeTime: '1 week ago',
    status: 'approved',
  },
  {
    id: '4',
    contributorName: 'Carlos Rodriguez',
    action: 'added',
    resourceTitle: 'System Design Interview Prep',
    timestamp: '2025-11-09T14:10:00',
    relativeTime: '1 week ago',
    status: 'published',
  },
  {
    id: '5',
    contributorName: 'Destiny Johnson',
    action: 'updated',
    resourceTitle: 'Resume Building Guide',
    timestamp: '2025-11-08T11:00:00',
    relativeTime: '10 days ago',
    status: 'published',
  },
];

// Contribution guidelines for students
export const contributionGuidelines = {
  howToContribute: [
    'Share resources that helped you succeed',
    'Update existing guides with your experience',
    'Suggest external tools you find valuable',
    'Fix errors or add clarity to articles',
  ],
  process: [
    'Submit your contribution via the form',
    'Our team reviews for quality and accuracy',
    'Approved contributions get published',
    'Your name is credited on the platform',
  ],
};

