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
 * Represents a single resource/article in the hub.
 */
export interface Resource {
    slug: string;                  // URL-friendly identifier (e.g., "leetcode-patterns")
    category: ResourceCategory;    // Which category this belongs to
    title: string;                 // Display title
    description: string;           // Short summary (for cards)
    content: string;               // Full article content (Markdown or HTML)
    tags: string[];                // Tags for filtering (e.g., ["LeetCode", "Interview"])
    difficulty?: DifficultyLevel;  // Optional difficulty badge
    author?: string;               // Optional author name
    publishedDate?: string;        // Optional publish date (ISO format)
    lastUpdated?: string;          // Optional last updated date
}

/**
 * Represents an external resource link.
 */
export interface ExternalResource {
    title: string;
    description: string;
    url: string;
    category: ResourceCategory;
    badge?: string;                // e.g., "External Link", "Paid" ??
}

/**
 * Props for the ResourceCard component.
 */
export interface ResourceCardProps {
    resource: Resource;
    showCategory: boolean;        // Whether to display category badge
}

/**
 * Props for the ExternalResourceCard component.
 */
export interface ExternalResourceCardProps {
    resource: ExternalResource;
}