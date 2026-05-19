/**
 * Shared copy for the About page.
 */

export const ABOUT_HERO = {
    heading: 'About Navigate Tech Hub',
    subhead:
        'A student-built platform for Black and Latinx CS students at Northeastern: guides, curated programs, and community in one place.',
} as const;

export const ABOUT_PILLARS = [
    {
        number: '01',
        label: 'Internal guides',
        description:
            'Student-written articles on interview prep, courses, projects, hackathons, and community. Browse by category or search the full library.',
        href: '/browse',
        cta: 'Browse guides',
    },
    {
        number: '02',
        label: 'External directory',
        description:
            'Curated links to tools, communities, and named recurring programs with honest seasonal notes.',
        href: '/external-resources',
        cta: 'See directory',
    },
    {
        number: '03',
        label: 'Open to contribute',
        description:
            'Suggest resources, report broken links, or open a pull request. Student-led means it improves when students add to it.',
        href: '/contributions',
        cta: 'Contribute',
    },
] as const;

export const ABOUT_VALUES = [
    {
        title: 'Student-Led',
        body: 'Built by students who have navigated the same gaps. Peer-to-peer means the content stays relevant and honest.',
    },
    {
        title: 'Open Source',
        body: 'Every line of code is public. See something broken or missing? Help us fix it! The Contributions page explains how.',
    },
    {
        title: 'Community-Driven',
        body: 'Knowledge compounds. Every resource added and every correction made helps the next person skip the part where you wasted two weeks.',
    },
    {
        title: 'Inclusive',
        body: 'Built with particular focus on Black and Latinx technologists, the students most likely to be navigating without a roadmap.',
    },
] as const;

export const ABOUT_STORY = {
    bodyShort:
        'Navigate Tech Hub was founded by Adesola Odubiyi, Software Project Lead at ColorStack @ Northeastern. I cared about ColorStack and wanted to contribute in my own way, so I carved out this project role and built a launchpad for students who do not know where to start in CS.',
    bodyLaunchpad:
        'CS splits into different worlds: community and networks, classes, interviews, projects, real job experience, research, and more. Each lane needs different skills. Resources exist for each slice (NeetCode for interviews, ColorStack and NSBE for community), but nothing pointed people to all of it in one place. Students with no prior experience were stuck Googling scattered advice. This hub is that starting point so you spend less time hunting and more time doing.',
    founderName: 'Adesola Odubiyi',
    founderUrl: 'https://www.linkedin.com/in/adesola-odubiyi/',
    founderTitle: 'Software Project Lead, ColorStack @ Northeastern',
    contributors: [
        { name: 'Taniya', url: 'https://www.linkedin.com/in/taniya-vaughns/' },
        { name: 'Bryce', url: 'https://www.linkedin.com/in/bryceblaylock/' },
        { name: 'Branden', url: 'https://www.linkedin.com/in/branden-smith-5968442b9/' },
        { name: 'Ayaan', url: 'https://www.linkedin.com/in/ayaan-imtiaz-506a93356/' },
    ],
    colorstackWebsite: 'https://www.colorstack.org',
} as const;

export const ABOUT_CTAS = [
    { label: 'Browse guides', href: '/browse', primary: true },
    { label: 'External directory', href: '/external-resources', primary: false },
    { label: 'Contribute', href: '/contributions', primary: false },
] as const;

export const ABOUT_STAT_CHIPS = [
    { label: 'Northeastern University' },
    { label: 'ColorStack chapter' },
    { label: 'Open source' },
    { label: 'Student-maintained' },
] as const;
