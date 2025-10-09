/**
 * Utility functions for Navigate Tech Hub
 * Reusable helper functions for formatting, string manipulation, and data processing
 */

import { ResourceCategory } from './types';

/**
 * Formats an ISO date string into a human-readable format.
 * 
 * @param {string} dateString - ISO date string (e.g., "2025-01-15")
 * @returns {string} Formatted date (e.g., "January 15, 2025")
 * 
 * @example
 * formatDate('2025-01-15') => 'January 15, 2025'
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Converts text into a URL-safe slug.
 * Removes special characters, converts spaces to hyphens, and lowercases.
 * 
 * @param {string} text - Text to convert into a slug
 * @returns {string} URL-safe slug
 * 
 * @example
 * slugify('LeetCode Patterns Guide') => 'leetcode-patterns-guide'
 * slugify('Building the Perfect Resume!') => 'building-the-perfect-resume'
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/**
 * Returns the appropriate Tailwind border color class for a given category.
 * Used for styling cards and category indicators.
 * 
 * @param {ResourceCategory} category - The resource category
 * @returns {string} Tailwind border color class
 * 
 * @example
 * getCategoryColor('interview-prep') => 'border-neu-red'
 * getCategoryColor('classes') => 'border-colorstack-teal'
 */
export function getCategoryColor(category: ResourceCategory): string {
    const colorMap: Record<ResourceCategory, string> = {
        'interview-prep': 'border-neu-red',
        'classes': 'border-colorstack-teal',
        'projects': 'border-colorstack-orange',
        'hackathons': 'border-neu-black',
        'community': 'border-neu-gray',
    };

    return colorMap[category];
}

/**
 * Truncates text to a maximum length and adds ellipsis if needed.
 * Ensures the text doesn't cut off in the middle of a word.
 * 
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum character length
 * @returns {string} Truncated text with ellipsis if needed
 * 
 * @example
 * truncateText('This is a very long description', 20) 
 * // => 'This is a very long...'
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }

    // Truncate and find the last space to avoid cutting words
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > 0
        ? truncated.slice(0, lastSpace) + '...'
        : truncated + '...';
}