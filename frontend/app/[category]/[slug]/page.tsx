/**
 * Article Page (Skeleton) AYAAN
 *
 * Dynamic route that displays full article content for individual resources.
 * Handles: /[category]/[slug] (e.g., /interview-prep/leetcode-patterns-guide)
 */

//layout components
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
// for the 404 page
import { notFound } from 'next/navigation';
// data, articles, category info, etc
import { resources } from '@/data/resources';
import { CATEGORIES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
// display components
import DifficultyBadge from '@/components/ui/DifficultyBadge';
import Tag from '@/components/ui/Tag';
import ResourceCard from '@/components/ui/ResourceCard';

import ReactMarkdown from 'react-markdown';


/**
 * Article page component
 * Displays full resource content with metadata and related resources
 */
export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
    /**
     * TODO: Find the Resource
     *
     * Description: Find the resource that matches both category and slug
     * Acceptance Criteria:
     * - [ ] Use array.find() to search resources
     * - [ ] Match both resource.category === params.category AND resource.slug === params.slug
     * - [ ] Store in resource variable
     * - [ ] Call notFound() if resource doesn't exist
     *
     * Hint: const resource = resources.find(r => r.category === params.category && r.slug === params.slug)
     * Then: if (!resource) notFound()
     */
    const resource = resources.find((r) =>
        r.category === params.category && r.slug === params.slug
    );
    // 404 page handling
        if (!resource) {
        notFound();
    }


    /**
     * TODO: Get Category Metadata
     *
     * Description: Find category info for breadcrumb and back button
     * Acceptance Criteria:
     * - [ ] Find category from CATEGORIES that matches params.category
     * - [ ] Store in categoryData variable
     *
     * Hint: const categoryData = CATEGORIES.find(cat => cat.slug === params.category)
     */

    const categoryData = CATEGORIES.find((cat) => cat.slug === params.category);

    /**
     * TODO: Get Related Resources
     *
     * Description: Find 3 most recent resources from same category (exclude current)
     * Acceptance Criteria:
     * - [ ] Filter resources by same category
     * - [ ] Exclude current resource (slug doesn't match)
     * - [ ] Sort by publishedDate (most recent first)
     * - [ ] Take first 3 results
     *
     * Hint:
     * resources
     *   .filter(r => r.category === params.category && r.slug !== params.slug)
     *   .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
     *   .slice(0, 3)
     */
    const relatedResources = resources
        .filter((r) => {
            const sameCategory = r.category === params.category;
            const notCurrentArticle = r.slug !== params.slug;
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
                {/**
         * TODO: Breadcrumb Navigation
         *
         * Description: Show navigation path (Home › Category › Article)
         * Acceptance Criteria:
         * - [ ] "Home" links to "/"
         * - [ ] Category name links to category page
         * - [ ] Article title is plain text (not clickable)
         * - [ ] Use › as separator
         *
         * Hint:
         * <Link href="/">Home</Link> ›
         * <Link href={`/${params.category}`}>{categoryData?.label}</Link> ›
         * <span>{resource.title}</span>
         */}
                <div className="text-gray-600 mb-6 text-sm">
                    <Link href="/" className="hover:text-colorstack-teal">
                        Home
                    </Link>
                    {/* these are separators*/}
                    <span className="mx-2">›</span>

                    <Link
                        href={`/${params.category}`}
                        className="hover:text-colorstack-teal"
                    >
                        {categoryData?.label}
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-neu-black font-medium">
                        {resource.title}
                    </span>
                </div>

                {/**
         * TODO: Back Button
         *
         * Description: Button that returns to category page
         * Acceptance Criteria:
         * - [ ] Link to category page (e.g., /interview-prep)
         * - [ ] Text: "← Back to [Category Name]"
         * - [ ] Teal background, white text
         * - [ ] Rounded pill shape
         * - [ ] Hover effect (changes to orange)
         *
         * Hint: <Link href={`/${params.category}`}>← Back to {categoryData?.label}</Link>
         */}
                <Link
                    href={`/${params.category}`}
                    className="inline-block mb-8 px-6 py-2 bg-colorstack-teal text-white rounded-full font-semibold hover:bg-colorstack-orange transition-colors"
                >
                    ← Back to {categoryData?.label}
                </Link>

                {/* Article Container */}
                <article className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[5px] border-neu-red mb-16">
                    {/**
           * TODO: Article Title
           *
           * Description: Display article title
           * Acceptance Criteria:
           * - [ ] Use h1 element
           * - [ ] Large font size (text-4xl)
           * - [ ] Bold weight
           * - [ ] Margin bottom
           *
           * Hint: {resource.title}
           */}
                    <h1 className="text-4xl font-bold text-neu-black mb-6">
                        {resource.title}
                    </h1>

                    {/**
           * TODO: Meta Info Section
           *
           * Description: Display article metadata (date, author, difficulty, tags)
           * Acceptance Criteria:
           * - [ ] Flex container with gap
           * - [ ] Display publishedDate (use formatDate() utility)
           * - [ ] Display author name
           * - [ ] Display DifficultyBadge component (if difficulty exists)
           * - [ ] Display tags using Tag component
           * - [ ] Add bottom border separator
           *
           * Hint:
           * {resource.publishedDate && <span>Published: {formatDate(resource.publishedDate)}</span>}
           * {resource.difficulty && <DifficultyBadge difficulty={resource.difficulty} />}
           */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                        {resource.publishedDate && (
                            <span className="text-gray-600 text-sm">
                                Published: {formatDate(resource.publishedDate)}
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
                            {resource.tags.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </div>
                    </div>

                    {/**
           * TODO: Article Content (Markdown)
           *
           * Description: Render the markdown content
           * Acceptance Criteria:
           * - [ ] Import ReactMarkdown component
           * - [ ] Wrap in div with proper styling
           * - [ ] Pass resource.content to ReactMarkdown
           * - [ ] Add prose class for nice typography
           *
           * Hint: <ReactMarkdown>{resource.content}</ReactMarkdown>
           */}
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown>{resource.content}</ReactMarkdown>
                    </div>
                </article>

                {/**
         * TODO: Related Resources Section
         *
         * Description: Show related resources from same category
         * Acceptance Criteria:
         * - [ ] Only show if relatedResources.length > 0
         * - [ ] Section title: "Related Resources"
         * - [ ] Accent bar
         * - [ ] Grid of ResourceCards (responsive)
         * - [ ] Map over relatedResources
         * - [ ] Pass showCategory={false}
         *
         * Hint: Conditional rendering - {relatedResources.length > 0 && (...)}
         */}
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
                            ))}                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}