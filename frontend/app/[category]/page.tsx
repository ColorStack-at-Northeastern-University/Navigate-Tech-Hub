/**
 * Category Page
 *
 * Dynamic route that displays all resources for a specific category.
 * Handles: /interview-prep, /classes, /projects, /hackathons, /community
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import ResourceCard from '@/components/ui/ResourceCard';
import { notFound } from 'next/navigation';
import { CATEGORIES, getSubmitResourceUrl } from '@/lib/constants';
import { getResourcesByCategory } from '@/lib/strapi';
import type { ResourceCategory } from '@/lib/types';
import Link from 'next/link';

/**
 * Category page component
 * Fetches and displays all resources filtered by category from Strapi.
 */
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    const categoryData = CATEGORIES.find((cat) => cat.slug === category);
    if (!categoryData) {
        notFound();
    }

    const categoryResources = await getResourcesByCategory(category as ResourceCategory);
    const submitUrl = getSubmitResourceUrl();

    return (
        <>
            <Navbar />

            <main>
                <section className="mt-16 gradient-brand text-white py-16 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4">{categoryData.label}</h1>
                        <p className="text-xl">{categoryData.description}</p>
                    </div>
                </section>

                <div className="container-custom">
                    <div className="text-gray-600 mb-8 text-sm">
                        <Link href="/" className="hover:text-colorstack-teal">
                            Home
                        </Link>
                        <span className="mx-2">›</span>
                        <span className="text-neu-black font-medium">{categoryData.label}</span>
                    </div>

                    {categoryResources.length > 0 && (
                        <p className="text-gray-600 text-lg mb-8">
                            Showing {categoryResources.length} resources in {categoryData.label}
                        </p>
                    )}

                    {categoryResources.length === 0 ? (
                        <EmptyResourceState
                            title={`No guides in ${categoryData.label} yet`}
                            body="We are still building this section. Browse other categories, check external tools, or suggest something we should add."
                            links={[
                                { href: '/browse', label: 'Browse all guides' },
                                { href: '/external-resources', label: 'External resources' },
                                { href: submitUrl, label: 'Suggest a resource', external: true },
                            ]}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {categoryResources.map((resource) => (
                                <ResourceCard
                                    key={resource.slug}
                                    resource={resource}
                                    showCategory={false}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
