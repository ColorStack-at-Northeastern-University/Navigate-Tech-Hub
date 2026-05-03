export interface Opportunity {
    id: number;
    title: string;
    company: string;
    postedBy: string;
    compensation: string;
    location: string;
    deadline: string;
    tags: string[];
    url: string;
}

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
    {
        id: 1,
        title: 'Software Engineering Intern - Summer 2026',
        company: 'Amazon',
        postedBy: 'John Martinez',
        compensation: '$45/hr',
        location: 'Remote',
        deadline: 'Dec 1, 2025',
        tags: ['Internship', 'Backend', 'Cloud'],
        url: '#',
    },
    {
        id: 2,
        title: 'Software Engineering Intern - Summer 2026',
        company: 'Amazon',
        postedBy: 'John Martinez',
        compensation: '$45/hr',
        location: 'Remote',
        deadline: 'Dec 1, 2025',
        tags: ['Internship', 'Backend', 'Cloud'],
        url: '#',
    },
    {
        id: 3,
        title: 'Software Engineering Intern - Summer 2026',
        company: 'Amazon',
        postedBy: 'John Martinez',
        compensation: '$45/hr',
        location: 'Remote',
        deadline: 'Dec 1, 2025',
        tags: ['Internship', 'Backend', 'Cloud'],
        url: '#',
    },
    {
        id: 4,
        title: 'Software Engineering Intern - Summer 2026',
        company: 'Amazon',
        postedBy: 'John Martinez',
        compensation: '$45/hr',
        location: 'Remote',
        deadline: 'Dec 1, 2025',
        tags: ['Internship', 'Backend', 'Cloud'],
        url: '#',
    },
    {
        id: 5,
        title: 'Software Engineering Intern - Summer 2026',
        company: 'Amazon',
        postedBy: 'John Martinez',
        compensation: '$45/hr',
        location: 'Remote',
        deadline: 'Dec 1, 2025',
        tags: ['Internship', 'Backend', 'Cloud'],
        url: '#',
    },
];
