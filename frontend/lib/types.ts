/**
 * Core data types for Navigate Tech Hub
 * These interfaces define the shape of all resource data in the application.
 */

/**
 * Valid resource categories that match the app routing structure.
 *
 * `programs` is External-Resource only — there is no `/programs` article route.
 * It surfaces named recurring programs (fellowships, early-career pipelines,
 * insight events) in the External Resources directory.
 */
export type ResourceCategory =
    | 'interview-prep'
    | 'classes'
    | 'projects'
    | 'hackathons'
    | 'community'
    | 'programs';

/**
 * Two-tier directory classification for external resources.
 *
 * `tools-and-communities` — stable homepages that rarely change URL
 * (e.g. NeetCode, NSBE, MLH, ColorStack). Link to the homepage.
 *
 * `recurring-program` — named programs that run every cycle; links point to
 * the permanent program page (never a job-posting URL). Seasonal guidance
 * replaces deadline tracking.
 */
export type DirectoryTier = 'tools-and-communities' | 'recurring-program';

/** When a recurring program typically opens applications or registration. */
export type TypicalOpenSeason = 'spring' | 'summer' | 'fall' | 'winter' | 'rolling' | 'varies';

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
 * the Recurring Programs section of the External Resources page.
 */
export type ProgramType =
    | 'early-career-program'
    | 'fellowship'
    | 'pre-internship'
    | 'insight-event'
    | 'conference';

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
    /** One-sentence card blurb for browse/home cards (from `article-card-summaries.json` at publish time). */
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
    /** When true, this article is pinned on the homepage as the "Start Here" entry point. */
    startHere?: boolean;
    /** Up to 3 articles to show in the "Continue reading" block at the end of this article. */
    relatedArticles?: ResourceStub[];
    image?: StrapiImage | null;
}

/**
 * Minimal article reference used in "Continue reading" blocks.
 * Avoids loading full content for sibling articles on an article page.
 */
export interface ResourceStub {
    slug: string;
    /** Hub article category only — not `programs` (that is external directory only). */
    category: ResourceCategory;
    title: string;
    description: string;
    timeToReadMinutes: number;
    /** From Strapi `publishedAt` when populated — improves card “freshness” line. */
    publishedDate?: string;
    lastUpdated?: string;
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

/**
 * Represents an external resource link.
 *
 * `directoryTier` determines which section of the External Resources page
 * the entry appears in:
 *   - `tools-and-communities` → "Tools & Communities" grids
 *   - `recurring-program` → "Recurring Programs" section (programType buckets)
 *
 * Program-specific fields (programType, seasonalNote, audienceSpecific,
 * bostonLocal, riskFlag, lastVerified, relatedArticleSlug) are only populated
 * when `directoryTier === 'recurring-program'`. They default to undefined
 * for tools/community resources.
 */
export interface ExternalResource {
    /** Strapi document id — stable key for list rendering (URLs may repeat across entries). */
    documentId?: string;
    title: string;
    description: string;
    url: string;
    category: ResourceCategory;
    directoryTier: DirectoryTier;
    resourceType: ExternalResourceType;
    badge?: string;
    officialStatus?: OfficialStatus;
    /** From Strapi updatedAt when present in API response */
    lastUpdated?: string;
    programType?: ProgramType;
    /**
     * Seasonal guidance shown instead of deadline tracking.
     * E.g. "Typically opens in October — visit this page or search [program name] on [company] careers."
     */
    seasonalNote?: string;
    /** Typical application window — drives UI badge and calendar reminder. */
    typicalOpenSeason?: TypicalOpenSeason;
    /** Stable careers / students URL when `url` is a rotating program landing page. */
    careersHubUrl?: string;
    /** Phrase to search on the careers site, e.g. "UberSTAR". */
    programSearchHint?: string;
    audienceSpecific?: boolean;
    bostonLocal?: boolean;
    riskFlag?: RiskFlag;
    /** ISO date string (YYYY-MM-DD) — date a human last confirmed the program page is live */
    lastVerified?: string;
    /**
     * Internal guide to pair with this resource (no Strapi relation; intentional decoupling).
     * Format: `{category}/{slug}` where category is a hub route segment (e.g. interview-prep), not `programs`.
     */
    relatedArticleSlug?: string;
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
    startHere?: boolean | null;
    relatedArticles?: StrapiResourceStub[] | null;
    image?: StrapiImage | null;
    publishedAt: string | null;
    updatedAt: string;
    createdAt: string;
}

/**
 * Minimal shape returned when populating `relatedArticles` on a resource.
 */
export interface StrapiResourceStub {
    documentId?: string;
    slug: string;
    category: ResourceCategory;
    title: string;
    description: string;
    timeToReadMinutes: number;
    publishedAt?: string | null;
    updatedAt?: string | null;
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
    directoryTier: DirectoryTier;
    resourceType: ExternalResourceType;
    badge?: string | null;
    officialStatus?: OfficialStatus | null;
    programType?: ProgramType | null;
    seasonalNote?: string | null;
    typicalOpenSeason?: TypicalOpenSeason | null;
    careersHubUrl?: string | null;
    programSearchHint?: string | null;
    audienceSpecific?: boolean | null;
    bostonLocal?: boolean | null;
    riskFlag?: RiskFlag | null;
    lastVerified?: string | null;
    relatedArticleSlug?: string | null;
    publishedAt: string | null;
    updatedAt: string;
    createdAt: string;
}
