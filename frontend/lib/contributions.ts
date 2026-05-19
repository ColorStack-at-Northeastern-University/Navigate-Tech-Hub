import { SITE_CONFIG } from '@/lib/constants';

export type ContributionLaneId =
    | 'suggest-resource'
    | 'fix-content'
    | 'code-ui'
    | 'propose-guide';

export type ContributionLane = {
    id: ContributionLaneId;
    anchor: string;
    title: string;
    summary: string;
    steps: string[];
    afterSubmit: string;
    primaryCta: { label: string; href: string; external?: boolean };
};

const GITHUB_REPO = SITE_CONFIG.social.github;

function githubNewIssue(params: { title?: string; labels?: string }): string {
    const search = new URLSearchParams();
    if (params.title) search.set('title', params.title);
    if (params.labels) search.set('labels', params.labels);
    const query = search.toString();
    return query ? `${GITHUB_REPO}/issues/new?${query}` : `${GITHUB_REPO}/issues/new`;
}

export const CONTRIBUTION_LANES: ContributionLane[] = [
    {
        id: 'suggest-resource',
        anchor: 'suggest-resource',
        title: 'Suggest a link or program',
        summary:
            'Found a tool, community, or recurring program that belongs in the directory? Use the form  -  we review submissions weekly before anything goes live.',
        steps: [
            'Open the suggestion form and fill in the name, URL, and category.',
            'Explain who it helps and why it fits a curated student hub (not a generic link dump).',
            'Submit  -  you get a GitHub issue link you can track while we triage.',
        ],
        afterSubmit: 'We triage weekly. Your issue stays open until a maintainer accepts or asks for more detail.',
        primaryCta: { label: 'Open suggestion form', href: '/suggest-resource' },
    },
    {
        id: 'fix-content',
        anchor: 'fix-content',
        title: 'Fix or flag content',
        summary:
            'Dead link, outdated program dates, typo in a guide, or something misleading? Tell us so we can fix it.',
        steps: [
            'Open a GitHub issue with a short title (e.g. "Dead link on Interview Prep guide").',
            'Include the page or article name and what is wrong vs what it should say.',
            'Add the URL if it is an external resource  -  screenshots help but are optional.',
        ],
        afterSubmit: 'A maintainer labels and schedules the fix; small content fixes often ship within a few days.',
        primaryCta: {
            label: 'Report an issue',
            href: githubNewIssue({ title: '[Content] ', labels: 'bug' }),
            external: true,
        },
    },
    {
        id: 'code-ui',
        anchor: 'code-ui',
        title: 'Code or UI',
        summary:
            'Bug fixes, layout improvements, accessibility, or small features  -  all through pull requests on our public repo.',
        steps: [
            'Fork the repo on GitHub and clone your fork locally.',
            'Create a branch (`fix/nav-label`, `feat/browse-filter`, etc.).',
            'Make your change, run the app locally if you can, then open a PR against `develop`.',
            'Describe what changed and why in the PR  -  link an issue if one exists.',
            'Wait for review; maintainers may request edits before merge.',
        ],
        afterSubmit: 'PRs are reviewed by student maintainers. Focused, small PRs merge faster than large rewrites.',
        primaryCta: {
            label: 'View repository',
            href: GITHUB_REPO,
            external: true,
        },
    },
    {
        id: 'propose-guide',
        anchor: 'propose-guide',
        title: 'Propose a guide topic',
        summary:
            'Have an idea for an internal article (recruiting timeline, OA strategy, portfolio tips)? Pitch the topic  -  we pair you with editorial review before anything publishes.',
        steps: [
            'Open a GitHub issue or email us with a working title and who the guide is for.',
            'Include 2–3 bullet points on what the reader should be able to do after reading.',
            'If you want to draft it yourself, say so  -  we will point you at the repo folder and style guide.',
        ],
        afterSubmit: 'We reply when the topic fits the roadmap; not every pitch becomes an article immediately.',
        primaryCta: {
            label: 'Pitch a topic',
            href: githubNewIssue({
                title: '[Guide idea] ',
                labels: 'internal-resource-suggestion,triage',
            }),
            external: true,
        },
    },
];

export const CONTRIBUTIONS_FIRST_CONTRIBUTION_URL = 'https://github.com/firstcontributions/first-contributions';

export const CONTRIBUTIONS_CONTACT_EMAIL = SITE_CONFIG.directContact.email;
