import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { getResourceBySlug, getRelatedResources } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';
import type { ResourceCategory } from '@/lib/types';
import DifficultyBadge from '@/components/ui/DifficultyBadge';
import ResourceCard from '@/components/ui/ResourceCard';
import Tag from '@/components/ui/Tag';
import ReactMarkdown from 'react-markdown';

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

    const relatedResources = await getRelatedResources(
        category as ResourceCategory,
        slug,
    );

    return (
        <>
            <Navbar />

            <main className="container-custom mt-16">
                <div className="text-gray-600 mb-6 text-sm">
                    <Link href="/" className="hover:text-neu-red transition-colors">
                        Home
                    </Link>
                    <span className="mx-2">&rsaquo;</span>
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
                </div>

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

                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown>{resource.content ?? ''}</ReactMarkdown>
                    </div>
                </article>

                {relatedResources.length > 0 && (
                    <section className="mb-16">
                        <h2 className="font-display text-3xl font-bold text-brand-dark mb-4">Related Resources</h2>
                        <div className="accent-bar" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedResources.map((relatedResource) => (
                                <ResourceCard
                                    key={relatedResource.slug}
                                    resource={relatedResource}
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
