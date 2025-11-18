/**
 * [MOCK FEATURE]
 * 
 * Resource Recommendations Engine
 * 
 * Simple tag-based recommendation algorithm for suggesting relevant resources.
 * 
 * NOTE: This is a basic mock implementation.
 * Production version would use:
 * - Machine learning models
 * - User behavior tracking
 * - Collaborative filtering
 * - Content similarity analysis
 */

import { Resource } from './types';
import { resources } from '@/data/resources';
import { externalResources } from '@/data/externalResources';

interface RecommendationWithReason {
  resource: Resource | any;
  reason: string;
  score: number;
  isExternal: boolean;
}

/**
 * Get recommended resources for a given resource
 * 
 * Algorithm:
 * 1. Find resources with shared tags
 * 2. Exclude same category (already in "Related Resources")
 * 3. Include relevant external resources
 * 4. Score by number of matching tags
 * 5. Return top N recommendations
 */
export function getRecommendations(
  currentResource: Resource,
  limit: number = 3
): RecommendationWithReason[] {
  const recommendations: RecommendationWithReason[] = [];

  // 1. Find internal resources with shared tags (different categories)
  resources.forEach((resource) => {
    // Skip current resource and same category
    if (
      resource.slug === currentResource.slug ||
      resource.category === currentResource.category
    ) {
      return;
    }

    // Calculate matching tags
    const matchingTags = resource.tags.filter((tag) =>
      currentResource.tags.includes(tag)
    );

    if (matchingTags.length > 0) {
      recommendations.push({
        resource,
        reason: `Shares ${matchingTags.length} tag${matchingTags.length > 1 ? 's' : ''}: ${matchingTags.slice(0, 2).join(', ')}`,
        score: matchingTags.length * 2, // Internal resources weighted higher
        isExternal: false,
      });
    }
  });

  // 2. Find external resources with similar themes
  externalResources.forEach((extResource) => {
    // Simple keyword matching for external resources
    const currentKeywords = [
      ...currentResource.tags,
      ...currentResource.title.toLowerCase().split(' '),
      ...currentResource.description.toLowerCase().split(' '),
    ];

    const extKeywords = [
      extResource.title.toLowerCase(),
      extResource.description.toLowerCase(),
    ].join(' ');

    let matchCount = 0;
    currentKeywords.forEach((keyword) => {
      if (keyword.length > 3 && extKeywords.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });

    if (matchCount > 1) {
      recommendations.push({
        resource: extResource,
        reason: 'Complements your learning path',
        score: matchCount, // External resources weighted lower
        isExternal: true,
      });
    }
  });

  // 3. Sort by score and return top N
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get trending resources (mock implementation)
 * 
 * NOTE: In production, this would query analytics for actual view counts
 */
export function getTrendingResources(limit: number = 5): Resource[] {
  // For now, just return first N resources
  // In production, this would be based on real view data
  return resources.slice(0, limit);
}

/**
 * Get popular external resources (mock implementation)
 */
export function getPopularExternalResources(limit: number = 3) {
  return externalResources.slice(0, limit);
}

