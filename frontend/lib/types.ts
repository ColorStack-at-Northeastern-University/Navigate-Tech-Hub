/**
 * Core data types for Navigate Tech Hub
 * These interfaces define the shape of all resource data in the application.
 */

/**
 * Valid resource categories that match the app routing structure.
 *
 * `programs` is External-Resource only — there is no `/programs` article route.
 * It surfaces named, time-bounded opportunities (fellowships, early-career
 * programs, insight events) in the External Resources directory.
 */
export type ResourceCategory =
    | 'interview-prep'
    | 'classes'
    | 'projects'
    | 'hackathons'
    | 'community'
    | 'programs';

/**
 * Difficulty levels for resources.
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type AudienceStage = 'first-semester' | 'first-year' | 'underclassmen' | 'all-levels';
export type ContentVolatility = 'high' | 'medium' | 'low';
export type ExternalResourceType =
    | 'learning-platform'
    | 'opportunities-board'
    | 'scholarship-funding'
    | 'community-network'
    | 'events-conference'
    | 'career-tool'
    | 'documentation-reference';
export type OfficialStatus = 'official-org' | 'community-vetted';

/**
 * Sub-type of a Programs entry. Drives sub-headings and ordering inside
 * the Programs section of the External Resources page.
 */
export type ProgramType =
    | 'early-career-program'
    | 'fellowship'
    | 'pre-internship'
    | 'insight-event'
    | 'conference';

/**
 * Application status for Programs. Drives the colored badge and the
 * default ordering inside each programType bucket.
 *
 * `closed-this-cycle` entries are collapsed by default in the UI.
 */
export type ApplicationStatus =
    | 'apply-now'
    | 'closing-soon'
    | 'rolling'
    | 'opens-fall-2026'
    | 'uncertain-2026'
    | 'closed-this-cycle'
    | 'year-round';

/**
 * Reasons a Program needs human verification before a student commits to it.
 * Surfaces as a small warning pill on the card.
 */
export type RiskFlag =
    | 'dei-rollback-risk'
    | 'deprecated-soon'
    | 'verify-before-applying';

/**
 * Image data returned by Strapi's media field (populated with select fields).
 */
export interface StrapiImage {
    url: string;
    alternativeText?: string | null;
}

/**
 * Represents a single resource/article in the hub.
 *
 * On list views (homepage, browse, category pages), `content` is excluded
 * from the API response to reduce payload size. Only the article page
 * fetches the full content.
 */
export interface Resource {
    slug: string;
    category: ResourceCategory;
    title: string;
    description: string;
    content?: string;
    audienceStage: AudienceStage;
    timeToReadMinutes: number;
    outcome: string;
    contentVolatility: ContentVolatility;
    tags: string[];
    difficulty?: DifficultyLevel;
    author?: string;
    publishedDate?: string;
    lastUpdated?: string;
    lastReviewedAt?: string;
    featured?: boolean;
    image?: StrapiImage | null;
}

/**
 * Represents an external resource link.
 *
 * Program-specific fields (programType, applicationStatus, applicationDeadline,
 * audienceSpecific, bostonLocal, riskFlag, lastVerified, relatedArticleSlug)
 * are only populated when `category === 'programs'`. They default to undefined
 * for community/learning/etc. resources.
 */
export interface ExternalResource {
    title: string;
    description: string;
    url: string;
    category: ResourceCategory;
    resourceType: ExternalResourceType;
    badge?: string;
    officialStatus?: OfficialStatus;
    /** From Strapi updatedAt when present in API response */
    lastUpdated?: string;
    programType?: ProgramType;
    applicationStatus?: ApplicationStatus;
    /** ISO date string (YYYY-MM-DD) used for "closing-soon" detection and sorting */
    applicationDeadline?: string;
    audienceSpecific?: boolean;
    bostonLocal?: boolean;
    riskFlag?: RiskFlag;
    /** ISO date string (YYYY-MM-DD) — date a human last confirmed the program is live */
    lastVerified?: string;
    /** Slug of one internal article to pair with this resource (no Strapi relation; intentional decoupling) */
    relatedArticleSlug?: string;
}

/**
 * Props for the ResourceCard component.
 */
export interface ResourceCardProps {
    resource: Resource;
    showCategory: boolean;
}

/**
 * Props for the ExternalResourceCard component.
 */
export interface ExternalResourceCardProps {
    resource: ExternalResource;
}

// ---------------------------------------------------------------------------
// Strapi response shapes
// ---------------------------------------------------------------------------

/**
 * Wraps a Strapi 5 list response. The `data` array contains flattened objects
 * (fields at top level, not nested under `attributes`).
 */
export interface StrapiListResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

/**
 * Shape of a Resource as returned directly by Strapi's REST API.
 * Strapi uses `publishedAt` / `updatedAt` instead of the frontend's
 * `publishedDate` / `lastUpdated`.
 */
export interface StrapiResource {
    id: number;
    documentId: string;
    slug: string;
    category: ResourceCategory;
    title: string;
    description: string;
    content?: string;
    audienceStage: AudienceStage;
    timeToReadMinutes: number;
    outcome: string;
    contentVolatility: ContentVolatility;
    tags: string[] | null;
    difficulty?: DifficultyLevel | null;
    author?: string | null;
    lastReviewedAt?: string | null;
    featured?: boolean | null;
    image?: StrapiImage | null;
    publishedAt: string | null;
    updatedAt: string;
    createdAt: string;
}

/**
 * Shape of an External Resource as returned by Strapi's REST API.
 */
export interface StrapiExternalResource {
    id: number;
    documentId: string;
    title: string;
    description: string | null;
    url: string;
    category: ResourceCategory;
    resourceType: ExternalResourceType;
    badge?: string | null;
    officialStatus?: OfficialStatus | null;
    programType?: ProgramType | null;
    applicationStatus?: ApplicationStatus | null;
    applicationDeadline?: string | null;
    audienceSpecific?: boolean | null;
    bostonLocal?: boolean | null;
    riskFlag?: RiskFlag | null;
    lastVerified?: string | null;
    relatedArticleSlug?: string | null;
    publishedAt: string | null;
    updatedAt: string;
    createdAt: string;
}
