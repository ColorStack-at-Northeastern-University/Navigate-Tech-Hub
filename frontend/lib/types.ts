/**
 * Core data types for Navigate Tech Hub
 * These interfaces define the shape of all resource data in the application.
 */

/**
 * Valid resource categories that match the app routing structure.
 */
export type ResourceCategory =
    | 'interview-prep'
    | 'classes'
    | 'projects'
    | 'hackathons'
    | 'community';

/**
 * Difficulty levels for resources.
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

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
    tags: string[];
    difficulty?: DifficultyLevel;
    author?: string;
    publishedDate?: string;
    lastUpdated?: string;
    featured?: boolean;
    image?: StrapiImage | null;
}

/**
 * Represents an external resource link.
 */
export interface ExternalResource {
    title: string;
    description: string;
    url: string;
    category: ResourceCategory;
    badge?: string;
    /** From Strapi updatedAt when present in API response */
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
    tags: string[] | null;
    difficulty?: DifficultyLevel | null;
    author?: string | null;
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
    badge?: string | null;
    publishedAt: string | null;
    updatedAt: string;
    createdAt: string;
}
