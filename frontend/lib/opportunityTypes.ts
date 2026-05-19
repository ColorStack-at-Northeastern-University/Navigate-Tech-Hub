export type OpportunityType =
    | 'internship'
    | 'co-op'
    | 'new-grad'
    | 'program'
    | 'scholarship'
    | 'other';

export type PostedAtSource = 'slack' | 'inferred' | 'paste-order' | 'override';

export interface ColorStackOpportunity {
    id: number;
    title: string;
    company: string;
    url: string;
    description?: string;
    type: OpportunityType;
    location?: string;
    deadline?: string;
    tags: string[];
    /** ISO date (YYYY-MM-DD) when the Slack post was shared, when known. */
    postedAt?: string;
    postedAtSource?: PostedAtSource;
    /** Monotonic order from parse (higher = newer in paste). Fallback when postedAt is missing. */
    pasteIndex?: number;
}
