import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import CircuitPattern from '@/components/ui/CircuitPattern';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import ResourceCard from '@/components/ui/ResourceCard';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { resolveGuidesEmptyState } from '@/lib/guides-catalog';
import { getResourcesByCategory } from '@/lib/strapi';
import type { ResourceCategory } from '@/lib/types';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    const categoryData = CATEGORIES.find((cat) => cat.slug === category);
    if (!categoryData) {
        notFound();
    }

    const categoryCatalog = await getResourcesByCategory(category as ResourceCategory);
    const categoryResources = categoryCatalog.resources;
    const categoryEmptyState = resolveGuidesEmptyState(categoryCatalog.loadStatus, {
        title: `No guides in ${categoryData.label} yet`,
        body: 'We are still building this section. Browse other categories, check external tools, or suggest something we should add.',
        links: [
            { href: '/browse', label: 'Browse all guides' },
            { href: '/external-resources', label: 'External resources' },
            { href: '/suggest-resource', label: 'Suggest a resource' },
        ],
    });
    return (
        <>
            <Navbar />

            <main>
                <section className="mt-16 pt-16 pb-12 bg-[#AA0F15] relative overflow-hidden">
                    <CircuitPattern />
                    <div className="container-custom !py-0 relative z-10">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                            {categoryData.label}
                        </h1>
                        <p className="text-white/80 text-xl">{categoryData.description}</p>
                    </div>
                </section>

                <div className="container-custom">
                    <nav aria-label="Breadcrumb" className="text-gray-600 mb-8 text-sm">
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
                        <span className="text-brand-dark font-medium">{categoryData.label}</span>
                    </nav>

                    {categoryResources.length > 0 && (
                        <p className="text-gray-500 text-lg mb-8">
                            Showing {categoryResources.length} resources in {categoryData.label}
                        </p>
                    )}

                    {categoryEmptyState ? (
                        <EmptyResourceState {...categoryEmptyState} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {categoryResources.map((resource) => (
                                <ResourceCard
                                    key={`${resource.category}-${resource.slug}`}
                                    resource={resource}
                                    showCategory={false}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="container-custom !pt-0">
                    <p className="text-[#de0911] text-3xl md:text-4xl font-bold">&lt;/&gt;</p>
                </div>
            </main>

            <Footer />
        </>
    );
}
