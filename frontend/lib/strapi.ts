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

import { SAMPLE_ARTICLES, SAMPLE_EXTERNAL_RESOURCES } from '@/data/sample-resources';
import type {
    Resource,
    ResourceStub,
    ExternalResource,
    DirectoryTier,
    OfficialStatus,
    StrapiImage,
    StrapiListResponse,
    StrapiResource,
    StrapiResourceStub,
    StrapiExternalResource,
    ResourceCategory,
    ProgramType,
    RiskFlag,
    TypicalOpenSeason,
} from './types';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Server-only read token for Strapi when Public role does not grant `find` on resources.
 * Never use NEXT_PUBLIC_* for secrets — set `STRAPI_API_TOKEN` in `.env.local` (frontend) for local dev.
 */
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/** Sample data is for local dev only — production must not masquerade demo content as live CMS data. */
function useStrapiSampleFallback(): boolean {
    return process.env.NODE_ENV === 'development';
}

/** Fields to return for resource list views (everything except `content`). */
const RESOURCE_LIST_FIELDS = [
    'slug', 'category', 'title', 'description',
    'audienceStage', 'timeToReadMinutes', 'outcome', 'contentVolatility',
    'tags', 'difficulty', 'author', 'featured', 'startHere',
    'publishedAt', 'updatedAt', 'lastReviewedAt',
];
const RESOURCE_CATEGORIES: ResourceCategory[] = [
    'interview-prep',
    'classes',
    'projects',
    'hackathons',
    'community',
    'programs',
];
const PROGRAM_TYPES = [
    'early-career-program',
    'fellowship',
    'pre-internship',
    'insight-event',
    'conference',
] as const;
const DIRECTORY_TIERS = ['tools-and-communities', 'recurring-program'] as const;
const TYPICAL_OPEN_SEASONS = ['spring', 'summer', 'fall', 'winter', 'rolling', 'varies'] as const;
const RISK_FLAGS = [
    'dei-rollback-risk',
    'deprecated-soon',
    'verify-before-applying',
] as const;
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

function isValidProgramType(value: unknown): value is ProgramType {
    return typeof value === 'string' && PROGRAM_TYPES.includes(value as ProgramType);
}

function isValidDirectoryTier(value: unknown): value is DirectoryTier {
    return typeof value === 'string' && DIRECTORY_TIERS.includes(value as DirectoryTier);
}

function isValidTypicalOpenSeason(value: unknown): value is TypicalOpenSeason {
    return typeof value === 'string' && TYPICAL_OPEN_SEASONS.includes(value as TypicalOpenSeason);
}

function isValidRiskFlag(value: unknown): value is RiskFlag {
    return typeof value === 'string' && RISK_FLAGS.includes(value as RiskFlag);
}

function isIsoDateString(value: unknown): value is string {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value);
}

/** Returns query params for the standard resource list fields (no content). */
function resourceListFieldsParams(): Array<[string, string]> {
    return RESOURCE_LIST_FIELDS.map((f, i) => [`fields[${i}]`, f]);
}

/** Field whitelist for external-resource list responses (includes stable `documentId` for React keys). */
function externalResourceFieldsParams(): Array<[string, string]> {
    const fields = [
        'documentId',
        'title',
        'description',
        'url',
        'category',
        'directoryTier',
        'resourceType',
        'badge',
        'officialStatus',
        'updatedAt',
        'publishedAt',
        'programType',
        'seasonalNote',
        'typicalOpenSeason',
        'careersHubUrl',
        'programSearchHint',
        'audienceSpecific',
        'bostonLocal',
        'riskFlag',
        'lastVerified',
        'relatedArticleSlug',
    ];
    return fields.map((field, index) => [`fields[${index}]`, field]);
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
 * Strapi v4 REST nested `attributes`, proxies with `Strapi-Response-Format: v4`, or mixed plugins
 * return rows our mapper does not understand unless we flatten first.
 */
function flattenStrapiRestEntity(raw: unknown): Record<string, unknown> {
    if (raw === null || typeof raw !== 'object') return {};
    const row = raw as Record<string, unknown>;
    const attrs = row.attributes;
    if (attrs !== null && typeof attrs === 'object' && !Array.isArray(attrs)) {
        const base = attrs as Record<string, unknown>;
        const merged: Record<string, unknown> = { ...base };
        if ('id' in row) merged.id = row.id;
        if ('documentId' in row) merged.documentId = row.documentId;
        if ('locale' in row) merged.locale = row.locale;
        return merged;
    }
    return row;
}

/** Media may be flat (Strapi 5) or nested `{ data: { attributes } }` (v4 / populate). */
function normalizeStrapiImage(raw: unknown): StrapiImage | null {
    if (raw === null || raw === undefined) return null;
    if (typeof raw === 'object' && raw !== null && 'url' in raw) {
        const img = raw as StrapiImage;
        if (typeof img.url === 'string') {
            return {
                url: img.url,
                alternativeText: img.alternativeText ?? undefined,
            };
        }
    }
    const nested = raw as { data?: { attributes?: { url?: string; alternativeText?: string | null } } };
    const url = nested.data?.attributes?.url;
    if (typeof url === 'string') {
        return {
            url,
            alternativeText: nested.data?.attributes?.alternativeText ?? undefined,
        };
    }
    return null;
}

function coercePositiveInteger(value: unknown): number | undefined {
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
        return Math.max(1, Math.floor(value));
    }
    if (typeof value === 'string' && value.trim() !== '') {
        const n = Number.parseInt(value, 10);
        if (Number.isFinite(n) && n > 0) return n;
    }
    return undefined;
}

function normalizeTags(raw: unknown): string[] {
    if (Array.isArray(raw)) {
        return raw.filter((t): t is string => typeof t === 'string');
    }
    if (typeof raw === 'string') {
        try {
            const parsed: unknown = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed.filter((t): t is string => typeof t === 'string');
            }
        } catch {
            return [];
        }
    }
    return [];
}

/**
 * Ensures `data` is an array and each row is flattened for mapping.
 */
function normalizeResourceRows(res: StrapiListResponse<StrapiResource>): StrapiResource[] {
    const { data } = res;
    if (data === null || data === undefined) return [];
    const rows = Array.isArray(data) ? data : [data as StrapiResource];
    return rows.map((row) => flattenStrapiRestEntity(row) as unknown as StrapiResource);
}

function normalizeExternalResourceRows(res: StrapiListResponse<StrapiExternalResource>): StrapiExternalResource[] {
    const { data } = res;
    if (data === null || data === undefined) return [];
    const rows = Array.isArray(data) ? data : [data as StrapiExternalResource];
    return rows.map((row) => flattenStrapiRestEntity(row) as unknown as StrapiExternalResource);
}

function strapiFetchInit(): RequestInit {
    const headers: HeadersInit = {};
    if (isNonEmptyString(STRAPI_API_TOKEN)) {
        headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    // Dev and CMS publish cycles: avoid serving 60s-stale resource metadata on browse cards.
    if (process.env.NODE_ENV === 'development' || process.env.STRAPI_CACHE === 'no-store') {
        return { headers, cache: 'no-store' };
    }

    const revalidateSeconds = Number(process.env.STRAPI_REVALIDATE_SECONDS ?? 60);
    if (!Number.isFinite(revalidateSeconds) || revalidateSeconds <= 0) {
        return { headers, cache: 'no-store' };
    }

    return { headers, next: { revalidate: revalidateSeconds } };
}

/**
 * Fetches a Strapi REST endpoint and returns the parsed JSON.
 * Throws a descriptive error on non-2xx responses.
 */
async function fetchStrapi<T>(path: string): Promise<T> {
    const url = `${STRAPI_URL}${path}`;
    const response = await fetch(url, strapiFetchInit());

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
 *
 * Accepts `unknown` so callers can pass flattened v4/v5/rest-plugin payloads safely.
 */
function mapResource(rawInput: unknown): Resource | null {
    const raw = flattenStrapiRestEntity(rawInput) as unknown as StrapiResource;

    const minutesCoerced = coercePositiveInteger(raw.timeToReadMinutes);
    const timeToReadMinutes = minutesCoerced ?? 5;
    if (minutesCoerced === undefined) {
        console.warn('[strapi] timeToReadMinutes missing or invalid; defaulting to 5 minutes', {
            documentId: raw.documentId,
            slug: raw.slug,
        });
    }

    if (
        !isNonEmptyString(raw.slug)
        || !isValidCategory(raw.category)
        || !isNonEmptyString(raw.title)
        || !isNonEmptyString(raw.description)
        || !isValidAudienceStage(raw.audienceStage)
        || !isNonEmptyString(raw.outcome)
        || !isValidContentVolatility(raw.contentVolatility)
    ) {
        console.warn('[strapi] Dropping invalid resource record', {
            documentId: raw.documentId,
            slug: raw.slug,
            category: raw.category,
            audienceStage: raw.audienceStage,
        });
        return null;
    }

    if (raw.category === 'programs') {
        console.warn(
            '[strapi] Dropping internal article with category "programs" — hub routes only support interview-prep, classes, projects, hackathons, community. Use External Resources for program listings.',
            { documentId: raw.documentId, slug: raw.slug },
        );
        return null;
    }

    const normalizedImage = normalizeStrapiImage(raw.image);
    const image = normalizedImage
        ? { url: toAbsoluteUrl(normalizedImage.url), alternativeText: normalizedImage.alternativeText }
        : null;

    return {
        slug: raw.slug,
        category: raw.category,
        title: raw.title,
        description: raw.description,
        ...(raw.content != null && {
            content: typeof raw.content === 'string' ? raw.content : String(raw.content),
        }),
        audienceStage: raw.audienceStage,
        timeToReadMinutes,
        outcome: raw.outcome,
        contentVolatility: raw.contentVolatility,
        tags: normalizeTags(raw.tags),
        difficulty: raw.difficulty ?? undefined,
        author: raw.author ?? undefined,
        publishedDate: raw.publishedAt ?? undefined,
        lastUpdated: raw.updatedAt,
        lastReviewedAt: raw.lastReviewedAt ?? undefined,
        featured: Boolean(raw.featured),
        startHere: Boolean(raw.startHere),
        image,
    };
}

/**
 * Strapi may return a relation as a flat array, or `{ data: [...] }`, or a single object.
 */
function extractRelatedArticleRows(raw: unknown): unknown[] {
    if (raw === null || raw === undefined) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'object' && 'data' in raw) {
        const data = (raw as { data?: unknown }).data;
        if (Array.isArray(data)) return data;
        if (data !== null && typeof data === 'object') return [data];
    }
    return [];
}

/**
 * Maps a populated related-article entry to a card stub. Returns null if invalid
 * (e.g. wrong shape or disallowed category for internal guides).
 */
function mapResourceStubFromStrapiEntity(rawInput: unknown): ResourceStub | null {
    const flat = flattenStrapiRestEntity(rawInput) as unknown as StrapiResourceStub;
    if (
        !isNonEmptyString(flat.slug)
        || !isNonEmptyString(flat.title)
        || !isNonEmptyString(flat.description)
        || !isValidCategory(flat.category)
    ) {
        return null;
    }
    if (flat.category === 'programs') {
        return null;
    }
    const minutes = coercePositiveInteger(flat.timeToReadMinutes) ?? 5;
    return {
        slug: flat.slug,
        category: flat.category,
        title: flat.title,
        description: flat.description,
        timeToReadMinutes: minutes,
        ...(flat.publishedAt ? { publishedDate: flat.publishedAt } : {}),
        ...(flat.updatedAt ? { lastUpdated: flat.updatedAt } : {}),
    };
}

/**
 * Maps a single Strapi external resource object to the frontend shape.
 */
function mapExternalResource(rawInput: unknown): ExternalResource | null {
    const raw = flattenStrapiRestEntity(rawInput) as unknown as StrapiExternalResource;
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
    const programType = isValidProgramType(raw.programType) ? raw.programType : undefined;
    const riskFlag = isValidRiskFlag(raw.riskFlag) ? raw.riskFlag : undefined;
    const lastVerified = isIsoDateString(raw.lastVerified) ? raw.lastVerified : undefined;
    const relatedArticleSlug = isNonEmptyString(raw.relatedArticleSlug)
        ? raw.relatedArticleSlug
        : undefined;
    const seasonalNote = isNonEmptyString(raw.seasonalNote) ? raw.seasonalNote : undefined;
    const typicalOpenSeason = isValidTypicalOpenSeason(raw.typicalOpenSeason)
        ? raw.typicalOpenSeason
        : undefined;
    const careersHubUrl = isNonEmptyString(raw.careersHubUrl) ? raw.careersHubUrl : undefined;
    const programSearchHint = isNonEmptyString(raw.programSearchHint) ? raw.programSearchHint : undefined;

    const directoryTier: DirectoryTier = isValidDirectoryTier(raw.directoryTier)
        ? raw.directoryTier
        : raw.category === 'programs' ? 'recurring-program' : 'tools-and-communities';

    return {
        ...(isNonEmptyString(raw.documentId) ? { documentId: raw.documentId } : {}),
        title: raw.title,
        description: raw.description,
        url: raw.url,
        category: raw.category,
        directoryTier,
        resourceType: raw.resourceType,
        badge: raw.badge ?? undefined,
        officialStatus,
        lastUpdated: raw.updatedAt,
        programType,
        seasonalNote,
        typicalOpenSeason,
        careersHubUrl,
        programSearchHint,
        audienceSpecific: raw.audienceSpecific === true,
        bostonLocal: raw.bostonLocal === true,
        riskFlag,
        lastVerified,
        relatedArticleSlug,
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
    try {
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

        return compactResources(normalizeResourceRows(res).map(mapResource));
    } catch (error) {
        console.error('[strapi] getFeaturedResources failed:', error);
        return useStrapiSampleFallback() ? SAMPLE_ARTICLES.filter((r) => r.featured) : [];
    }
}

/**
 * Fetches all published resources for the browse page.
 * The browse page handles search and category filtering client-side.
 */
export async function getAllResources(): Promise<Resource[]> {
    try {
        const pageSize = 100;
        let page = 1;
        let pageCount = 1;
        const aggregated: Resource[] = [];

        while (page <= pageCount) {
            const query = buildQuery([
                ['pagination[page]', String(page)],
                ['pagination[pageSize]', String(pageSize)],
                ['sort', 'publishedAt:desc'],
                ...resourceListFieldsParams(),
                ...imagePopulateParams(),
            ]);

            const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
                `/api/resources?${query}`
            );

            const rows = normalizeResourceRows(res);
            aggregated.push(...compactResources(rows.map(mapResource)));
            pageCount = res.meta?.pagination?.pageCount ?? 1;
            if (rows.length === 0) break;
            page += 1;
        }

        return aggregated;
    } catch (error) {
        console.error('[strapi] getAllResources failed:', error);
        return useStrapiSampleFallback() ? SAMPLE_ARTICLES : [];
    }
}

/**
 * Fetches all resources in a specific category.
 * Used by the dynamic `[category]/page.tsx` route.
 */
export async function getResourcesByCategory(category: ResourceCategory): Promise<Resource[]> {
    try {
        const pageSize = 100;
        let page = 1;
        let pageCount = 1;
        const aggregated: Resource[] = [];

        while (page <= pageCount) {
            const query = buildQuery([
                ['filters[category][$eq]', category],
                ['pagination[page]', String(page)],
                ['pagination[pageSize]', String(pageSize)],
                ['sort', 'publishedAt:desc'],
                ...resourceListFieldsParams(),
                ...imagePopulateParams(),
            ]);

            const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
                `/api/resources?${query}`
            );

            const rows = normalizeResourceRows(res);
            aggregated.push(...compactResources(rows.map(mapResource)));
            pageCount = res.meta?.pagination?.pageCount ?? 1;
            if (rows.length === 0) break;
            page += 1;
        }

        return aggregated;
    } catch (error) {
        console.error('[strapi] getResourcesByCategory failed:', error);
        return useStrapiSampleFallback()
            ? SAMPLE_ARTICLES.filter((r) => r.category === category)
            : [];
    }
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
    try {
        const relatedPopulate: Array<[string, string]> = [
            ['populate[relatedArticles][fields][0]', 'slug'],
            ['populate[relatedArticles][fields][1]', 'category'],
            ['populate[relatedArticles][fields][2]', 'title'],
            ['populate[relatedArticles][fields][3]', 'description'],
            ['populate[relatedArticles][fields][4]', 'timeToReadMinutes'],
            ['populate[relatedArticles][fields][5]', 'publishedAt'],
            ['populate[relatedArticles][fields][6]', 'updatedAt'],
        ];

        const queryWithRelated = buildQuery([
            ['filters[slug][$eq]', slug],
            ['filters[category][$eq]', category],
            ['pagination[pageSize]', '1'],
            ...imagePopulateParams(),
            ...relatedPopulate,
        ]);

        const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
            `/api/resources?${queryWithRelated}`
        );

        const rows = normalizeResourceRows(res);
        if (rows.length === 0) return null;
        const mapped = mapResource(rows[0]);
        if (!mapped) return null;
        const relatedRows = extractRelatedArticleRows(rows[0].relatedArticles);
        if (relatedRows.length > 0) {
            const stubs = relatedRows
                .slice(0, 3)
                .map((r) => mapResourceStubFromStrapiEntity(r))
                .filter((s): s is ResourceStub => s !== null);
            if (stubs.length > 0) {
                mapped.relatedArticles = stubs;
            }
        }
        return mapped;
    } catch (error) {
        console.error('[strapi] getResourceBySlug failed:', error);
        if (!useStrapiSampleFallback()) return null;
        return SAMPLE_ARTICLES.find((r) => r.slug === slug && r.category === category) ?? null;
    }
}

/**
 * Fetches up to 3 related resources from the same category, excluding
 * the current article. Used in the "Related Resources" section.
 */
export async function getRelatedResources(
    category: ResourceCategory,
    excludeSlug: string,
): Promise<Resource[]> {
    try {
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

        return compactResources(normalizeResourceRows(res).map(mapResource));
    } catch (error) {
        console.error('[strapi] getRelatedResources failed:', error);
        if (!useStrapiSampleFallback()) return [];
        return SAMPLE_ARTICLES.filter((r) => r.category === category && r.slug !== excludeSlug).slice(0, 3);
    }
}

// ---------------------------------------------------------------------------
// Public API — External Resources
// ---------------------------------------------------------------------------

/**
 * Fetches all external resources sorted by category then title.
 * The frontend groups these by category for display.
 */
export async function getExternalResources(): Promise<ExternalResource[]> {
    try {
        const query = buildQuery([
            ['pagination[pageSize]', '250'],
            ['sort[0]', 'category:asc'],
            ['sort[1]', 'title:asc'],
            ...externalResourceFieldsParams(),
        ]);

        const res = await fetchStrapi<StrapiListResponse<StrapiExternalResource>>(
            `/api/external-resources?${query}`
        );

        return compactExternalResources(normalizeExternalResourceRows(res).map(mapExternalResource));
    } catch (error) {
        console.error('[strapi] getExternalResources failed:', error);
        return useStrapiSampleFallback() ? SAMPLE_EXTERNAL_RESOURCES : [];
    }
}

/**
 * External resources whose `relatedArticleSlug` matches `{category}/{slug}` for this guide.
 */
export async function getExternalResourcesForArticle(
    category: ResourceCategory,
    slug: string,
): Promise<ExternalResource[]> {
    const composite = `${category}/${slug}`;
    try {
        const query = buildQuery([
            ['filters[relatedArticleSlug][$eq]', composite],
            ['pagination[pageSize]', '25'],
            ['sort', 'title:asc'],
            ...externalResourceFieldsParams(),
        ]);

        const res = await fetchStrapi<StrapiListResponse<StrapiExternalResource>>(
            `/api/external-resources?${query}`
        );

        return compactExternalResources(normalizeExternalResourceRows(res).map(mapExternalResource));
    } catch (error) {
        console.error('[strapi] getExternalResourcesForArticle failed:', error);
        if (!useStrapiSampleFallback()) return [];
        return SAMPLE_EXTERNAL_RESOURCES.filter((r) => r.relatedArticleSlug === composite);
    }
}

/**
 * Returns the single article flagged as `startHere: true`, used for the
 * "Start Here" homepage slot. Returns null when none is published yet.
 */
export async function getStartHereArticle(): Promise<Resource | null> {
    try {
        const query = buildQuery([
            ['filters[startHere][$eq]', 'true'],
            /** Only published entries — avoids draft picks surfacing on the homepage. */
            ['filters[publishedAt][$notNull]', 'true'],
            ['pagination[pageSize]', '1'],
            ['sort', 'publishedAt:desc'],
            ...resourceListFieldsParams(),
            ...imagePopulateParams(),
        ]);

        const res = await fetchStrapi<StrapiListResponse<StrapiResource>>(
            `/api/resources?${query}`
        );

        const rows = normalizeResourceRows(res);
        return rows.length > 0 ? (mapResource(rows[0]) ?? null) : null;
    } catch (error) {
        console.error('[strapi] getStartHereArticle failed:', error);
        return null;
    }
}

export interface HeroStats {
    resourceCount: number;
    externalCount: number;
}

/**
 * Fetches live counts for hero stat badges.
 * Uses pageSize=1 requests — we only need `meta.pagination.total`.
 */
export async function getHeroStats(): Promise<HeroStats> {
    try {
        const [resourceRes, externalRes] = await Promise.all([
            fetchStrapi<StrapiListResponse<unknown>>(
                `/api/resources?pagination[pageSize]=1&pagination[page]=1&fields[0]=id`
            ),
            fetchStrapi<StrapiListResponse<unknown>>(
                `/api/external-resources?pagination[pageSize]=1&pagination[page]=1&fields[0]=id`
            ),
        ]);
        return {
            resourceCount: resourceRes.meta.pagination.total,
            externalCount: externalRes.meta.pagination.total,
        };
    } catch (error) {
        console.error('[strapi] getHeroStats failed:', error);
        return { resourceCount: 30, externalCount: 102 };
    }
}
