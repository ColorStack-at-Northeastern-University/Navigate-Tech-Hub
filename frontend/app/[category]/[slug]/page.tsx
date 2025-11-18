/**
 * [DEMO UI ENHANCEMENTS - Phase 1]
 * 
 * Article Page
 *
 * Dynamic route that displays full article content for individual resources.
 * Handles: /[category]/[slug] (e.g., /interview-prep/leetcode-patterns-guide)
 * 
 * Quick visual improvements for demo presentation.
 * Production implementation would require:
 * - Comprehensive accessibility audit
 * - Design system integration (shadcn/ui, Radix, etc.)
 * - User research and A/B testing
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resources } from '@/data/resources';
import { CATEGORIES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import DifficultyBadge from '@/components/ui/DifficultyBadge';
import ResourceCard from '@/components/ui/ResourceCard';
import Tag from '@/components/ui/Tag';
import ProgressButtons from '@/components/ui/ProgressButtons';
import ReactMarkdown from 'react-markdown';


/**
 * Article page component
 * Displays full resource content with metadata and related resources
 */
export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    
    const resource = resources.find((r) =>
        r.category === category && r.slug === slug
    );

    if (!resource) {
        notFound();
    }

    const categoryData = CATEGORIES.find((cat) => cat.slug === category);

    const relatedResources = resources
        .filter((r) => {
            const sameCategory = r.category === category;
            const notCurrentArticle = r.slug !== slug;
            return sameCategory && notCurrentArticle;
        })
        .sort((a, b) => {
            if (!a.publishedDate) return 1;
            if (!b.publishedDate) return -1;
            const dateA = new Date(a.publishedDate).getTime();
            const dateB = new Date(b.publishedDate).getTime();
            return dateB - dateA;
        })
        .slice(0, 3);

    return (
        <>
            <Navbar />

            <main className="container-custom mt-16">
                <div className="text-gray-600 mb-6 text-sm">
                    <Link href="/" className="hover:text-colorstack-teal">
                        Home
                    </Link>
                    <span className="mx-2">›</span>
                    <Link
                        href={`/${category}`}
                        className="hover:text-colorstack-teal"
                    >
                        {categoryData?.label}
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-neu-black font-medium">
                        {resource.title}
                    </span>
                </div>

                <Link
                    href={`/${category}`}
                    className="inline-block mb-8 px-6 py-3 bg-colorstack-teal text-white rounded-full font-semibold hover:bg-colorstack-orange hover:scale-105 hover:shadow-lg transition-all duration-200 ease-out active:scale-100"
                >
                    ← Back to {categoryData?.label}
                </Link>

                <article className="bg-white rounded-xl p-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 border-t-[5px] border-neu-red mb-16 animate-fade-in">
                    <h1 className="text-4xl font-bold text-neu-black mb-6 tracking-tight">
                        {resource.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b-2 border-gray-100">
                        {resource.publishedDate && (
                            <span className="text-gray-600 text-sm font-medium">
                                Published: {formatDate(resource.publishedDate)}
                            </span>
                        )}
                        {resource.author && (
                            <span className="text-gray-600 text-sm font-medium">
                                By {resource.author}
                            </span>
                        )}
                        {resource.difficulty && (
                            <DifficultyBadge difficulty={resource.difficulty} />
                        )}
                        <div className="flex flex-wrap gap-2">
                            {resource.tags.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </div>
                    </div>

                    {/* Progress Tracking Buttons - Mock Feature */}
                    <div className="mb-8 pb-8 border-b-2 border-gray-100">
                        <ProgressButtons slug={resource.slug} />
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown>{resource.content}</ReactMarkdown>
                    </div>
                </article>

                {relatedResources.length > 0 && (
                    <section className="mb-16">
                        <h2 className="section-title">Related Resources</h2>
                        <div className="accent-bar"></div>
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