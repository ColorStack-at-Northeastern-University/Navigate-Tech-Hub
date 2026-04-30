/**
 * Browse Page
 *
 * Server component that fetches all resources from Strapi, then passes
 * them to the BrowseContent client component for interactive search
 * and category filtering.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import BrowseContent from '@/components/sections/BrowseContent';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import { getSubmitResourceUrl } from '@/lib/constants';
import { getAllResources } from '@/lib/strapi';

/**
 * Browse page component
 * Displays all available Navigate Tech Hub resources with search and filter.
 */
export default async function BrowsePage() {
    const resources = await getAllResources();
    const submitUrl = getSubmitResourceUrl();

    return (
        <>
            <Navbar />

            <main className="container-custom px-6 mt-40">
                {/* Page Header */}
                <h1 className="text-4xl mt-15 md:text-5xl font-bold text-red-600 mb-3">
                    Browse All Resources
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Explore our curated collection of guides, articles, and tools for CS students.
                </p>

                {/* Accent Bar */}
                <div className="h-1 bg-gradient-to-r from-red-600 via-teal-500 to-amber-400 rounded-full mb-10"></div>

                {resources.length === 0 ? (
                    <EmptyResourceState
                        title="No guides published yet"
                        body="Once editors add articles in Strapi, they’ll show up here. You can still explore external links or suggest content."
                        links={[
                            { href: '/external-resources', label: 'External resources' },
                            { href: submitUrl, label: 'Suggest a resource', external: true },
                        ]}
                    />
                ) : (
                    <BrowseContent resources={resources} />
                )}
            </main>

            <Footer />
        </>
    );
}
