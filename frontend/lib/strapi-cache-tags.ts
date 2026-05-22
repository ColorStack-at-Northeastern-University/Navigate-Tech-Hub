/** Next.js fetch cache tags for Strapi-backed data (used with `revalidateTag`). */

export const STRAPI_TAG_GUIDES = 'strapi-guides';
export const STRAPI_TAG_EXTERNALS = 'strapi-externals';

export function strapiArticleTag(category: string, slug: string): string {
    return `strapi-article:${category}/${slug}`;
}
