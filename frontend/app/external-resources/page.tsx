/**
 * External Resources Page
 *
 * Directory of external tools, platforms, and resources.
 * Fetches all external resources from Strapi, then groups by category.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ExternalResourceCard from '@/components/ui/ExternalResourceCard';
import { getExternalResources } from '@/lib/strapi';
import type { ExternalResource, ResourceCategory } from '@/lib/types';

/** Maps category slugs to the display labels used in section headings. */
const CATEGORY_LABELS: Record<ResourceCategory, string> = {
    'interview-prep': 'Interview Prep',
    'projects': 'Projects & Portfolio',
    'community': 'Community & Networking',
    'hackathons': 'Hackathons',
    'classes': 'Learning Platforms',
};

/** Ordered list of categories for consistent section rendering. */
const SECTION_ORDER: ResourceCategory[] = [
    'interview-prep',
    'projects',
    'community',
    'hackathons',
    'classes',
];

/**
 * Renders a single category section with its grid of external resource cards.
 */
function CategorySection({ label, resources }: { label: string; resources: ExternalResource[] }) {
    if (resources.length === 0) return null;

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                {label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => (
                    <ExternalResourceCard key={resource.url} resource={resource} />
                ))}
            </div>
        </section>
    );
}

/**
 * External Resources page component
 * Fetches from Strapi and groups by category for display.
 */
export default async function ExternalResourcesPage() {
    const allResources = await getExternalResources();

    const grouped = Object.groupBy(allResources, (r) => r.category);

    return (
        <>
            <Navbar />

            <main className="container-custom mt-16">
                {/* Page Header */}
                <div className="text-center mb-12 mt-12">
                    <h1 className="page-title">External Resources Directory</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Quick links to external tools, platforms, and resources curated for CS students.
                        All links open in a new tab.
                    </p>
                    <div className="accent-bar max-w-md mx-auto"></div>
                </div>

                {SECTION_ORDER.map((cat) => (
                    <CategorySection
                        key={cat}
                        label={CATEGORY_LABELS[cat]}
                        resources={grouped[cat] ?? []}
                    />
                ))}
            </main>

            <Footer />
        </>
    );
}
