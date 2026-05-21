import { track } from '@vercel/analytics';

export type AssetDownloadName =
    | 'navigate_template'
    | 'resume_sample_1'
    | 'resume_sample_2'
    | 'resume_sample_3'
    | 'resume_sample_4'
    | 'opportunities_csv'
    | 'program_reminders_ics';

export type ContributionAnalyticsLane =
    | 'suggest-resource'
    | 'fix-content'
    | 'code-ui'
    | 'propose-guide'
    | 'first-contributions'
    | 'github-repo'
    | 'contact-email';

export type ValueEventProperties = {
    opportunity_outbound_click: {
        opportunity_id: number;
    };
    external_resource_outbound_click: {
        resource_id: string;
        surface: 'card' | 'careers_hub';
    };
    outbound_click:
        | {
            resource_id: string;
            destination: 'google_calendar';
        }
        | {
            asset: 'jakes_resume_overleaf';
        };
    meta_strip_outbound_click: {
        section: 'job_boards' | 'conferences';
        label: string;
    };
    article_engaged_60s: {
        article: string;
    };
    asset_download: {
        asset: AssetDownloadName;
    };
    contribution_cta_click: {
        lane: ContributionAnalyticsLane;
    };
    suggest_resource_submit: undefined;
    newsletter_signup_success: {
        source: string;
    };
};

export type ValueEventName = keyof ValueEventProperties;

export function trackValueEvent<Name extends ValueEventName>(
    name: Name,
    properties?: ValueEventProperties[Name],
): void {
    if (process.env.NODE_ENV === 'test') return;

    if (properties === undefined) {
        track(name);
        return;
    }

    track(name, properties);
}

export function toAnalyticsSlug(value: string): string {
    const slug = value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);

    return slug || 'unknown';
}

export function analyticsResourceId(documentId: string | undefined, title: string): string {
    return documentId ?? toAnalyticsSlug(title);
}
