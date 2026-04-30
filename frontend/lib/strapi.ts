/**
 * Strapi API client for Navigate Tech Hub
 *
 * Provides typed fetch functions for every data need in the frontend.
 * Query strings are built with URLSearchParams to avoid third-party
 * dependencies. All requests hit Strapi's default REST endpoints.
 *
 * Strapi 5 notes:
 *   - Response format is flattened (fields at top level, not under `attributes`)
 *   - `status=published` is the default -- omitting it returns only published entries
 *   - Media fields require `populate` to be included in responses
 */

import type {
    Resource,
    ExternalResource,
    OfficialStatus,
    StrapiListResponse,
    StrapiResource,
    StrapiExternalResource,
    ResourceCategory,
} from './types';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/** Fields to return for resource list views (everything except `content`). */
const RESOURCE_LIST_FIELDS = [
    'slug', 'category', 'title', 'description',
    'audienceStage', 'timeToReadMinutes', 'outcome', 'contentVolatility',
    'tags', 'difficulty', 'author', 'featured',
    'publishedAt', 'updatedAt', 'lastReviewedAt',
];
const RESOURCE_CATEGORIES: ResourceCategory[] = [
    'interview-prep',
    'classes',
    'projects',
    'hackathons',
    'community',
];
const AUDIENCE_STAGES = ['first-semester', 'first-year', 'underclassmen', 'all-levels'] as const;
const CONTENT_VOLATILITIES = ['high', 'medium', 'low'] as const;
const EXTERNAL_RESOURCE_TYPES = [
    'learning-platform',
    'opportunities-board',
    'scholarship-funding',
    'community-network',
    'events-conference',
    'career-tool',
    'documentation-reference',
] as const;
const OFFICIAL_STATUSES = ['official-org', 'community-vetted'] as const;

// ---------------------------------------------------------------------------
// Query string builder
// ---------------------------------------------------------------------------

/**
 * Builds a query string from key-value pairs using URLSearchParams.
 * Keys are left as-is so nested Strapi params like filters[category][$eq] work.
 */
function buildQuery(params: Array<[string, string]>): string {
    const searchParams = new URLSearchParams();
    for (const [key, value] of params) {
        searchParams.append(key, value);
    }
    return searchParams.toString();
}

function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

function isValidCategory(value: unknown): value is ResourceCategory {
    return typeof value === 'string' && RESOURCE_CATEGORIES.includes(value as ResourceCategory);
}

function isValidAudienceStage(value: unknown): boolean {
    return typeof value === 'string' && AUDIENCE_STAGES.includes(value as (typeof AUDIENCE_STAGES)[number]);
}

function isValidContentVolatility(value: unknown): boolean {
    return (
        typeof value === 'string'
        && CONTENT_VOLATILITIES.includes(value as (typeof CONTENT_VOLATILITIES)[number])
    );
}

function isValidExternalResourceType(value: unknown): boolean {
    return (
        typeof value === 'string'
        && EXTERNAL_RESOURCE_TYPES.includes(value as (typeof EXTERNAL_RESOURCE_TYPES)[number])
    );
}

function isValidOfficialStatus(value: unknown): value is OfficialStatus {
    return (
        typeof value === 'string'
        && OFFICIAL_STATUSES.includes(value as (typeof OFFICIAL_STATUSES)[number])
    );
}

function isPositiveNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

/** Returns query params for the standard resource list fields (no content). */
function resourceListFieldsParams(): Array<[string, string]> {
    return RESOURCE_LIST_FIELDS.map((f, i) => [`fields[${i}]`, f]);
}

/** Returns query params to populate image with url and alternativeText. */
function imagePopulateParams(): Array<[string, string]> {
    return [
        ['populate[image][fields][0]', 'url'],
        ['populate[image][fields][1]', 'alternativeText'],
    ];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Fetches a Strapi REST endpoint and returns the parsed JSON.
 * Throws a descriptive error on non-2xx responses.
 */
async function fetchStrapi<T>(path: string): Promise<T> {
    const url = `${STRAPI_URL}${path}`;
    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) {
        throw new Error(
            `Strapi request failed: ${response.status} ${response.statusText} — ${url}`
        );
    }

    return response.json() as Promise<T>;
}

/**
 * Maps a single Strapi resource object to the frontend Resource shape.
 * Converts `publishedAt` -> `publishedDate` and `updatedAt` -> `lastUpdated`.
 * Prepends the Strapi URL to relative image paths.
 */
function mapResource(raw: StrapiResource): Resource | null {
    if (
        !isNonEmptyString(raw.slug)
        || !isValidCategory(raw.category)
        || !isNonEmptyString(raw.title)
        || !isNonEmptyString(raw.description)
        || !isValidAudienceStage(raw.audienceStage)
        || !isPositiveNumber(raw.timeToReadMinutes)
        || !isNonEmptyString(raw.outcome)
        || !isValidContentVolatility(raw.contentVolatility)
    ) {
        console.warn('[strapi] Dropping invalid resource record', {
            documentId: raw.documentId,
            slug: raw.slug,
        });
        return null;
    }

    const image = raw.image
        ? { url: toAbsoluteUrl(raw.image.url), alternativeText: raw.image.alternativeText }
        : null;

    return {
        slug: raw.slug,
        category: raw.category,
        title: raw.title,
        description: raw.description,
        ...(raw.content != null && { content: raw.content }),
        audienceStage: raw.audienceStage,
        timeToReadMinutes: raw.timeToReadMinutes,
        outcome: raw.outcome,
        contentVolatility: raw.contentVolatility,
        tags: Array.isArray(raw.tags) ? raw.tags : [],
        difficulty: raw.difficulty ?? undefined,
        author: raw.author ?? undefined,
        publishedDate: raw.publishedAt ?? undefined,
        lastUpdated: raw.updatedAt,
        lastReviewedAt: raw.lastReviewedAt ?? undefined,
        featured: raw.featured ?? false,
        image,
    };
}

/**
 * Maps a single Strapi external resource object to the frontend shape.
 */
function mapExternalResource(raw: StrapiExternalResource): ExternalResource | null {
    if (
        !isNonEmptyString(raw.title)
        || !isNonEmptyString(raw.description)
        || !isNonEmptyString(raw.url)
        || !isValidCategory(raw.category)
        || !isValidExternalResourceType(raw.resourceType)
    ) {
        console.warn('[strapi] Dropping invalid external resource record', {
            documentId: raw.documentId,
            title: raw.title,
        });
        return null;
    }

    const officialStatus = isValidOfficialStatus(raw.officialStatus)
        ? raw.officialStatus
        : undefined;

    return {
        title: raw.title,
        description: raw.description,
        url: raw.url,
        category: raw.category,
        resourceType: raw.resourceType,
        badge: raw.badge ?? undefined,
        officialStatus,
        lastUpdated: raw.updatedAt,
    };
}

/**
 * Converts a Strapi-relative URL (e.g. `/uploads/img.jpg`) into an absolute URL.
 * If the URL is already absolute, returns it unchanged.
 */
function toAbsoluteUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${STRAPI_URL}${path}`;
}

function compactResources(records: Array<Resource | null>): Resource[] {
    return records.filter((record): record is Resource => record !== null);
}

function compactExternalResources(records: Array<ExternalResource | null>): ExternalResource[] {
    return records.filter((record): record is ExternalResource => record !== null);
}

// ---------------------------------------------------------------------------
// Public API — Resources
// ---------------------------------------------------------------------------

/**
 * Fetches resources marked as featured for the homepage grid.
 * Returns up to 6 results sorted by most recent first.
 */
export async function getFeaturedResources(): Promise<Resource[]> {
    const query = buildQuery([
        ['filters[featured][$eq]', 'true'],
        ['pagination[pageSize]', '6'],
        ['sort', 'publishedAt:desc'],
        ...resourceListFieldsParams(),
        ...imagePopulateParams(),
    ]);

    const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
        `/api/resources?${query}`
    );

    return compactResources(res.data.map(mapResource));
}

/**
 * Fetches all published resources for the browse page.
 * The browse page handles search and category filtering client-side.
 */
export async function getAllResources(): Promise<Resource[]> {
    const query = buildQuery([
        ['pagination[pageSize]', '25'],
        ['sort', 'publishedAt:desc'],
        ...resourceListFieldsParams(),
        ...imagePopulateParams(),
    ]);

    const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
        `/api/resources?${query}`
    );

    return compactResources(res.data.map(mapResource));
}

/**
 * Fetches all resources in a specific category.
 * Used by the dynamic `[category]/page.tsx` route.
 */
export async function getResourcesByCategory(category: ResourceCategory): Promise<Resource[]> {
    const query = buildQuery([
        ['filters[category][$eq]', category],
        ['sort', 'publishedAt:desc'],
        ...resourceListFieldsParams(),
        ...imagePopulateParams(),
    ]);

    const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
        `/api/resources?${query}`
    );

    return compactResources(res.data.map(mapResource));
}

/**
 * Fetches a single resource by slug and category.
 * Returns `null` if no matching resource is found (caller should 404).
 *
 * Uses the filter approach (not a custom route) so no backend code is needed.
 * The response is always an array -- we take the first item.
 */
export async function getResourceBySlug(
    category: ResourceCategory,
    slug: string,
): Promise<Resource | null> {
    const query = buildQuery([
        ['filters[slug][$eq]', slug],
        ['filters[category][$eq]', category],
        ['pagination[pageSize]', '1'],
        ...imagePopulateParams(),
    ]);

    const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
        `/api/resources?${query}`
    );

    if (res.data.length === 0) return null;
    return mapResource(res.data[0]);
}

/**
 * Fetches up to 3 related resources from the same category, excluding
 * the current article. Used in the "Related Resources" section.
 */
export async function getRelatedResources(
    category: ResourceCategory,
    excludeSlug: string,
): Promise<Resource[]> {
    const query = buildQuery([
        ['filters[category][$eq]', category],
        ['filters[slug][$ne]', excludeSlug],
        ['sort', 'publishedAt:desc'],
        ['pagination[pageSize]', '3'],
        ...resourceListFieldsParams(),
        ...imagePopulateParams(),
    ]);

    const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
        `/api/resources?${query}`
    );

    return compactResources(res.data.map(mapResource));
}

// ---------------------------------------------------------------------------
// Public API — External Resources
// ---------------------------------------------------------------------------

/**
 * Fetches all external resources sorted by category then title.
 * The frontend groups these by category for display.
 */
export async function getExternalResources(): Promise<ExternalResource[]> {
    const query = buildQuery([
        ['pagination[pageSize]', '100'],
        ['sort[0]', 'category:asc'],
        ['sort[1]', 'title:asc'],
        ['fields[0]', 'title'],
        ['fields[1]', 'description'],
        ['fields[2]', 'url'],
        ['fields[3]', 'category'],
        ['fields[4]', 'resourceType'],
        ['fields[5]', 'badge'],
        ['fields[6]', 'officialStatus'],
        ['fields[7]', 'updatedAt'],
        ['fields[8]', 'publishedAt'],
    ]);

    const res = await fetchStrapi<StrapiListResponse<StrapiExternalResource>>(
        `/api/external-resources?${query}`
    );

    return compactExternalResources(res.data.map(mapExternalResource));
}
