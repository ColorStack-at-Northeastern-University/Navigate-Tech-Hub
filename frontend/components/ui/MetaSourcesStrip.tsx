/**
 * MetaSourcesStrip  -  pointers to directories and student conferences outside the hub.
 * External Resources page only; distinct from ColorStack Opportunities on home.
 */

interface MetaLink {
    label: string;
    description: string;
    url: string;
}

const JOB_BOARDS: MetaLink[] = [
    {
        label: 'Pitt CSC Internships',
        description: 'Community-maintained internship list on GitHub, updated each recruiting season.',
        url: 'https://github.com/pittcsc/Summer2026-Internships',
    },
    {
        label: 'Simplify  -  Summer 2026 Internships',
        description: 'Aggregated internship repo with application links and timelines.',
        url: 'https://github.com/SimplifyJobs/Summer2026-Internships',
    },
    {
        label: 'Levels.fyi Internships',
        description: 'Internship listings with compensation signals from reported offers.',
        url: 'https://www.levels.fyi/internships/',
    },
    {
        label: 'NSBE Career Center',
        description: 'Job board from National Society of Black Engineers corporate partners.',
        url: 'https://jobs.nsbe.org',
    },
    {
        label: 'Rewriting the Code  -  Opportunities',
        description: 'Community job board for women in tech.',
        url: 'https://rewritingthecode.org',
    },
];

/** Recruiting-adjacent conferences  -  verify URLs periodically with scripts/verify-external-urls.mjs */
const STUDENT_CONFERENCES: MetaLink[] = [
    {
        label: 'AfroTech',
        description: 'Large Black tech conference with recruiting fair and community programming.',
        url: 'https://afrotech.com',
    },
    {
        label: 'NSBE Annual Convention',
        description: 'National Society of Black Engineers convention  -  career fair and professional development.',
        url: 'https://www.nsbe.org',
    },
    {
        label: 'NSBE Regional Conferences',
        description: 'Six NSBE regions each hold leadership conferences in fall  -  check nsbe.org for your region.',
        url: 'https://www.nsbe.org',
    },
    {
        label: 'ColorStack Stacked Up',
        description: 'Annual ColorStack summit connecting Black and Latinx CS students with top tech companies. Typically summer.',
        url: 'https://www.colorstack.org',
    },
    {
        label: 'Grace Hopper Celebration',
        description: 'AnitaB.org flagship event for women and non-binary technologists.',
        url: 'https://ghc.anitab.org',
    },
    {
        label: 'ACM Richard Tapia Conference',
        description: 'Diversity in computing conference with student and faculty participation.',
        url: 'https://tapiaconference.org',
    },
    {
        label: 'SHPE National Convention',
        description: 'Society of Hispanic Professional Engineers national gathering  -  late October/November.',
        url: 'https://shpe.org',
    },
    {
        label: 'SWE Annual Conference',
        description: 'Society of Women Engineers conference (14K+ attendees). Check swe.org for yearly dates.',
        url: 'https://swe.org',
    },
    {
        label: 'oSTEM Annual Conference',
        description: 'Conference for LGBTQ+ individuals in STEM  -  typically October.',
        url: 'https://conference.ostem.org',
    },
    {
        label: 'Lesbians Who Tech Summit',
        description: 'Summit for queer women and non-binary technologists  -  typically October.',
        url: 'https://lwtsquad.com',
    },
    {
        label: 'Out in Tech',
        description: 'LGBTQ+ tech community  -  conferences, mentorship, and job resources.',
        url: 'https://outintech.com',
    },
];

function LinkGrid({ items }: { items: MetaLink[] }) {
    return (
        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-4" role="list">
            {items.map((source) => (
                <li key={source.url} className="flex-1 min-w-[220px] max-w-xs">
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-1 p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
                    >
                        <span className="text-sm font-semibold text-brand-dark group-hover:text-neu-red transition-colors">
                            {source.label}
                            <span className="ml-1 text-gray-400 font-normal text-xs" aria-hidden="true">
                                ↗
                            </span>
                        </span>
                        <span className="text-xs text-gray-500 leading-snug">{source.description}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function MetaSourcesStrip() {
    return (
        <section className="bg-gray-50 border-y border-gray-200">
            <div className="container-custom py-6 space-y-8">
                <section aria-labelledby="meta-job-boards-heading">
                    <p
                        id="meta-job-boards-heading"
                        className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4"
                    >
                        Community-maintained directories
                    </p>
                    <LinkGrid items={JOB_BOARDS} />
                </section>

                <section aria-labelledby="meta-conferences-heading">
                    <p
                        id="meta-conferences-heading"
                        className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4"
                    >
                        Student conferences &amp; recruiting events
                    </p>
                    <p className="text-xs text-gray-500 mb-4 max-w-3xl">
                        These are organization homepages  -  confirm dates and registration on the official site each cycle.
                    </p>
                    <LinkGrid items={STUDENT_CONFERENCES} />
                </section>
            </div>
        </section>
    );
}
