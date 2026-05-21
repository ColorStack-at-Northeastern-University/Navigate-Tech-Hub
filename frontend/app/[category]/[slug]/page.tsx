import DifficultyBadge from '@/components/ui/DifficultyBadge';
import ExternalResourceCard from '@/components/ui/ExternalResourceCard';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ArticleEngagementTracker from '@/components/analytics/ArticleEngagementTracker';
import ResourceCard from '@/components/ui/ResourceCard';
import Tag from '@/components/ui/Tag';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleProse from '@/components/articles/ArticleProse';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { CATEGORIES } from '@/lib/constants';
import { getExternalResourcesForArticle, getRelatedResources, getResourceBySlug } from '@/lib/strapi';
import { externalResourceListKey, formatDate } from '@/lib/utils';
import type { Resource, ResourceCategory } from '@/lib/types';

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;

    const categoryData = CATEGORIES.find((cat) => cat.slug === category);
    if (!categoryData) {
        notFound();
    }

    const resource = await getResourceBySlug(category as ResourceCategory, slug);
    if (!resource) {
        notFound();
    }

    const linkedExternalResources = await getExternalResourcesForArticle(
        category as ResourceCategory,
        slug,
    );

    const continueReading = await resolveContinueReading(resource, category as ResourceCategory, slug);
    return (
        <>
            <Navbar />

            <main className="container-custom mt-16">
                <ArticleEngagementTracker category={category} slug={slug} />
                <nav aria-label="Breadcrumb" className="text-gray-600 mb-6 text-sm">
                    <Link href="/" className="hover:text-neu-red transition-colors">
                        Home
                    </Link>
                    <span className="mx-2" aria-hidden="true">
                        &rsaquo;
                    </span>
                    <Link href="/browse" className="hover:text-neu-red transition-colors">
                        Browse
                    </Link>
                    <span className="mx-2" aria-hidden="true">
                        &rsaquo;
                    </span>
                    <Link
                        href={`/${category}`}
                        className="hover:text-neu-red transition-colors"
                    >
                        {categoryData.label}
                    </Link>
                    <span className="mx-2">&rsaquo;</span>
                    <span className="text-brand-dark font-medium">
                        {resource.title}
                    </span>
                </nav>

                <Link
                    href={`/${category}`}
                    className="inline-block mb-8 px-6 py-2 bg-neu-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                    &larr; Back to {categoryData.label}
                </Link>

                <article className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[3px] border-neu-red mb-16">
                    <h1 className="font-display text-4xl font-bold text-brand-dark mb-6">
                        {resource.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                        {resource.publishedDate && (
                            <span className="text-gray-600 text-sm">
                                Published: {formatDate(resource.publishedDate)}
                            </span>
                        )}
                        {resource.lastUpdated && (
                            <span className="text-gray-600 text-sm">
                                Last updated: {formatDate(resource.lastUpdated)}
                            </span>
                        )}
                        {resource.author && (
                            <span className="text-gray-600 text-sm">
                                By {resource.author}
                            </span>
                        )}
                        {resource.difficulty && (
                            <DifficultyBadge difficulty={resource.difficulty} />
                        )}
                        <div className="flex flex-wrap gap-2">
                            {(resource.tags ?? []).map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </div>
                    </div>

                    <ArticleProse
                        rawMarkdown={resource.content ?? ''}
                        articleTitle={resource.title}
                    />
                </article>

                <NewsletterSignup
                    source={`article-${category}-${slug}`}
                    compact
                    className="mb-16 max-w-3xl"
                />

                {linkedExternalResources.length > 0 && (
                    <section className="mb-16" aria-labelledby="linked-external-heading">
                        <h2 id="linked-external-heading" className="font-display text-3xl font-bold text-brand-dark mb-4">
                            Related external links &amp; programs
                        </h2>
                        <p className="text-gray-600 text-sm max-w-3xl mb-4">
                            Opportunities and tools paired with this guide in the external directory. Opens in a new tab.
                        </p>
                        <div className="accent-bar" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {linkedExternalResources.map((external) => (
                                <ExternalResourceCard
                                    key={externalResourceListKey(external)}
                                    resource={external}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {continueReading.length > 0 && (
                    <section className="mb-16">
                        <h2 className="font-display text-3xl font-bold text-brand-dark mb-4">Continue reading</h2>
                        <div className="accent-bar" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {continueReading.map((related) => (
                                <ResourceCard
                                    key={`${related.category}-${related.slug}`}
                                    resource={related}
                                    showCategory={false}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}

/**
 * Resolves "Continue reading" articles for an article page.
 *
 * Priority:
 *   1. Editorial `relatedArticles` set in Strapi (manyToMany) — max 3, curated.
 *   2. Fallback: 3 most recent articles from the same category (excluding self).
 *
 * The fallback keeps the section visible for articles without manual curation.
 */
async function resolveContinueReading(
    resource: Resource,
    category: ResourceCategory,
    slug: string,
): Promise<Resource[]> {
    if (resource.relatedArticles && resource.relatedArticles.length > 0) {
        return resource.relatedArticles.slice(0, 3).map((stub) => ({
            slug: stub.slug,
            category: stub.category,
            title: stub.title,
            description: stub.description,
            timeToReadMinutes: stub.timeToReadMinutes,
            audienceStage: 'all-levels' as const,
            outcome: '',
            contentVolatility: 'low' as const,
            tags: [],
            ...(stub.publishedDate ? { publishedDate: stub.publishedDate } : {}),
            ...(stub.lastUpdated ? { lastUpdated: stub.lastUpdated } : {}),
        }));
    }
    return getRelatedResources(category, slug);
}
