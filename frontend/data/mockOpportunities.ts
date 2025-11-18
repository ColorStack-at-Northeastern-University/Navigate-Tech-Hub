/**
 * [MOCK FEATURE DATA]
 * 
 * Mock ColorStack Opportunities data
 * 
 * NOTE: This showcases integration with ColorStack's #opportunities Slack channel.
 * In production, this would connect to the ColorStack Slack API.
 * 
 * Philosophy: We work WITH ColorStack, not in competition.
 * Navigate Tech Hub amplifies opportunities from the ColorStack community.
 */

export interface ColorStackOpportunity {
  id: string;
  title: string;
  company: string;
  postedBy: string;
  postedAt: string;
  relativeTime: string;
  compensation: string;
  location: string;
  deadline: string;
  link: string;
  tags: string[];
}

export const mockOpportunities: ColorStackOpportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Intern - Summer 2026',
    company: 'Amazon',
    postedBy: 'John Martinez',
    postedAt: '2025-11-18T08:00:00',
    relativeTime: '2 hours ago',
    compensation: '$50/hr',
    location: 'Remote',
    deadline: 'Dec 1, 2025',
    link: 'https://www.amazon.jobs/en/teams/internships-for-students',
    tags: ['Internship', 'Backend', 'Cloud'],
  },
  {
    id: '2',
    title: 'Microsoft Explore Program',
    company: 'Microsoft',
    postedBy: 'Sarah Chen',
    postedAt: '2025-11-18T05:00:00',
    relativeTime: '5 hours ago',
    compensation: 'Paid',
    location: 'Redmond, WA',
    deadline: 'Dec 15, 2025',
    link: 'https://careers.microsoft.com/students/us/en',
    tags: ['First-Year', 'Sophomore', 'Program'],
  },
  {
    id: '3',
    title: 'Frontend Engineering Intern',
    company: 'Meta',
    postedBy: 'Alex Johnson',
    postedAt: '2025-11-17T18:30:00',
    relativeTime: '13 hours ago',
    compensation: '$55/hr',
    location: 'Menlo Park, CA',
    deadline: 'Nov 30, 2025',
    link: 'https://www.metacareers.com/careerprograms/students',
    tags: ['Internship', 'Frontend', 'React'],
  },
  {
    id: '4',
    title: 'Data Science Intern',
    company: 'Netflix',
    postedBy: 'Maria Rodriguez',
    postedAt: '2025-11-17T14:00:00',
    relativeTime: '18 hours ago',
    compensation: '$52/hr',
    location: 'Los Gatos, CA',
    deadline: 'Dec 10, 2025',
    link: 'https://jobs.netflix.com/university',
    tags: ['Internship', 'Data Science', 'ML'],
  },
  {
    id: '5',
    title: 'Site Reliability Engineering Intern',
    company: 'Google',
    postedBy: 'David Kim',
    postedAt: '2025-11-17T10:00:00',
    relativeTime: '22 hours ago',
    compensation: '$60/hr',
    location: 'Mountain View, CA',
    deadline: 'Dec 5, 2025',
    link: 'https://www.google.com/about/careers/applications/students/',
    tags: ['Internship', 'SRE', 'Infrastructure'],
  },
];

