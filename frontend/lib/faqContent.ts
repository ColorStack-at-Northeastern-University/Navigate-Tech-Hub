/**
 * FAQ copy — single source for /faq. Grouped by student intent, not org chart.
 */

export type FaqItem = {
    id: string;
    question: string;
    /** Plain-language answer; supports **bold** and [label](/path) or [email](mailto:...). */
    answer: string;
    link?: { href: string; label: string };
};

export type FaqSection = {
    id: string;
    title: string;
    items: FaqItem[];
};

export const FAQ_QUICK_ANSWERS: FaqItem[] = [
    {
        id: 'who-is-this-for',
        question: 'Who is Navigate Tech Hub for?',
        answer:
            'Primarily Black and Latinx computer science students at Northeastern, especially underclassmen figuring out recruiting, classes, and community. The guides and directory are written with that lens. If you are at another school or further along, much of the content still applies, but some links and context are NEU- and ColorStack-specific.',
        link: { href: '/about', label: 'About the project' },
    },
    {
        id: 'whats-the-point',
        question: 'What is the point? How do I actually use this?',
        answer:
            'Think of it as a curated map, not another link dump. Start with the [Start Here](/community/start-here-navigate-tech-hub) guide if you are new. Use [Browse](/browse) for student-written guides (interview prep, projects, hackathons, and more). Use [External Resources](/external-resources) for vetted tools, communities, and recurring programs. When you find a gap, [suggest a link](/suggest-resource) or see [Contributions](/contributions) to help fix the hub.',
        link: { href: '/browse', label: 'Browse guides' },
    },
    {
        id: 'human-written',
        question: 'Are the articles human-written?',
        answer:
            'Yes. Internal guides are researched and written (or heavily edited) by students, with editorial review before publish. We may use AI as a drafting or research aid on some pieces, but a human sets the structure, voice, and final call on what ships. If something reads off or outdated, report it via GitHub or email. We treat that as a content bug.',
        link: { href: '/contributions#fix-content', label: 'Report a content issue' },
    },
];

export const FAQ_SECTIONS: FaqSection[] = [
    {
        id: 'start-here',
        title: 'Getting oriented',
        items: [
            {
                id: 'official-neu',
                question: 'Is this an official Northeastern or ColorStack website?',
                answer:
                    'It is a **student-led** project affiliated with ColorStack @ Northeastern. It is not the university career center, not Handshake, and not the national ColorStack org’s main site. We link out to official sources when it matters; this hub is maintained by students in the chapter.',
                link: { href: 'https://www.colorstack.org', label: 'ColorStack (national)' },
            },
            {
                id: 'free-to-use',
                question: 'Is it free?',
                answer:
                    'Yes. Reading guides and using the directory costs nothing. External links may have their own sign-up fees (courses, conferences, etc.). We try to say that upfront on program cards when we know.',
            },
            {
                id: 'not-at-neu',
                question: 'I am not at NEU. Can I still use this?',
                answer:
                    'Absolutely for general CS career and interview content. Some community links, course references, and chapter-specific notes are NEU-tilted. National ColorStack and many external programs are open to students elsewhere.',
            },
            {
                id: 'vs-google',
                question: 'How is this different from searching Google or Reddit?',
                answer:
                    'We save you from rebuilding the same “what should I do freshman year?” thread every semester. Guides are ordered and scoped for our audience; the directory is **curated** (roughly 20–30 high-signal tools and programs), not an exhaustive scrape. You trade completeness for signal and honest seasonal notes.',
            },
        ],
    },
    {
        id: 'guides',
        title: 'Internal guides',
        items: [
            {
                id: 'guide-categories',
                question: 'What do the guide categories mean?',
                answer:
                    '**Interview Prep**, **Classes**, **Projects**, **Hackathons**, and **Community** map to how students actually plan a term, not every CS topic in existence. Open [Browse](/browse) to search across all guides or pick a category hub from the menu.',
                link: { href: '/browse', label: 'Browse all guides' },
            },
            {
                id: 'ai-policy',
                question: 'Do you use AI to write guides?',
                answer:
                    'Sometimes in the **drafting** phase: research synthesis, outlining, or checking gaps. Published guides are student-voiced and fact-checked against real sources (company pages, NEU norms, chapter knowledge). We do not publish raw AI output without human edit. Guides that depend on fast-changing facts (recruiting timelines, tool ToS) get reviewed when things shift.',
            },
            {
                id: 'guide-outdated',
                question: 'A guide looks outdated. What should I do?',
                answer:
                    'Open a GitHub issue with the guide name and what changed, or use the fix-content path on [Contributions](/contributions). Small fixes often ship within a few days; bigger rewrites get scheduled like any content project.',
                link: { href: '/contributions#fix-content', label: 'Fix or flag content' },
            },
        ],
    },
    {
        id: 'directory',
        title: 'External directory',
        items: [
            {
                id: 'guides-vs-directory',
                question: 'What is the difference between guides and external resources?',
                answer:
                    '**Guides** are articles we host (how-to, strategy, NEU-specific navigation). **External resources** are links to other sites: tools, communities, fellowships, insight programs, with short context and seasonal notes. Some guides link to matching directory entries when a program pairs with an article.',
                link: { href: '/external-resources', label: 'Open directory' },
            },
            {
                id: 'directory-complete',
                question: 'Is the directory every program and tool out there?',
                answer:
                    'No, and that is intentional. We list high-signal, student-relevant links and recurring programs, not every internship board. For breadth, we point you to better-maintained aggregators inside the directory itself.',
            },
            {
                id: 'program-dates',
                question: 'Are application dates and seasons always accurate?',
                answer:
                    'We add **seasonal notes** and last-verified hints where we can, but companies change windows. Treat dates as a starting point. Always confirm on the official program page before you plan around a deadline.',
            },
            {
                id: 'suggest-link',
                question: 'How do I suggest a tool or program for the directory?',
                answer:
                    'Use the [Suggest a resource](/suggest-resource) form. It creates a GitHub issue the team triages weekly. Include who it helps and why it belongs in a curated hub (not just “this is cool”).',
                link: { href: '/suggest-resource', label: 'Suggest a resource' },
            },
        ],
    },
    {
        id: 'contribute',
        title: 'Contributing',
        items: [
            {
                id: 'need-to-code',
                question: 'Do I need to code to contribute?',
                answer:
                    'Not at all. You can suggest links, report typos, suggest features and improvements, or pitch a guide topic without touching the repo. Code and UI changes go through GitHub pull requests. See [Contributions](/contributions) for step-by-step lanes.',
                link: { href: '/contributions', label: 'Ways to contribute' },
            },
            {
                id: 'after-suggest',
                question: 'What happens after I submit a suggestion?',
                answer:
                    'Suggestions become GitHub issues labeled for triage. Maintainers decide accept / needs info / not a fit. Accepted external links get added in Strapi; guide pitches may become outlines or draft folders in the repo. You can watch the issue for updates.',
            },
            {
                id: 'pitch-guide',
                question: 'How do I propose a new internal guide topic?',
                answer:
                    'Use [Pitch a topic](/contributions#propose-guide) on the [Contributions](/contributions) page (GitHub issue with the internal-resource-suggestion label) or email us with a working title, audience, and 2–3 outcomes the reader should have after reading.',
                link: { href: '/contributions#propose-guide', label: 'Pitch a guide' },
            },
        ],
    },
    {
        id: 'help',
        title: 'Still stuck?',
        items: [
            {
                id: 'contact-human',
                question: 'How do I reach a real person?',
                answer:
                    'Email me at [odubiyi.a@northeastern.edu](mailto:odubiyi.a@northeastern.edu). Or open a GitHub issue for bugs or content, or talk to ColorStack @ NEU at chapter events.',
                link: { href: '/contributions', label: 'Contributions & contact' },
            },
            {
                id: 'privacy-suggest',
                question: 'What do you do with my data when I use the suggestion form?',
                answer:
                    'The form sends what you type into a **GitHub issue** in our public repo (resource name, URL, your optional contact). Do not submit secrets. We do not sell data; there is no ad tracking on the hub itself.',
            },
            {
                id: 'resume-help',
                question: 'Where do I go for resume help?',
                answer:
                    'See the dedicated [Resume](/resume) page for sample resumes, templates, and a path you can follow without internship experience.',
                link: { href: '/resume', label: 'Resume resources' },
            },
        ],
    },
];

export const FAQ_JUMP_LINKS = [
    { id: 'quick-answers', label: 'Quick answers' },
    ...FAQ_SECTIONS.map((s) => ({ id: s.id, label: s.title })),
];
