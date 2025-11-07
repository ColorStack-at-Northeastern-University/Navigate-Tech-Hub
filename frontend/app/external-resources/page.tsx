/**
 * External Resources Page
 * 
 * Directory of external tools, platforms, and resources.
 * Organized by category with direct links to external sites.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ExternalResourceCard from '@/components/ui/ExternalResourceCard';
import { externalResources } from '@/data/externalResources';

/**
 * External Resources page component
 * Displays curated external links organized by category
 */
export default function ExternalResourcesPage() {
    // Filter resources by category
    const interviewPrepResources = externalResources.filter(r => r.category === 'interview-prep');
    const projectsResources = externalResources.filter(r => r.category === 'projects');
    const communityResources = externalResources.filter(r => r.category === 'community');
    const hackathonResources = externalResources.filter(r => r.category === 'hackathons');
    const learningResources = externalResources.filter(r => r.category === 'classes');

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

                {/* Interview Prep Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Interview Prep
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {interviewPrepResources.map((resource) => (
                            <ExternalResourceCard key={resource.url} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* Projects & Portfolio Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Projects & Portfolio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsResources.map((resource) => (
                            <ExternalResourceCard key={resource.url} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* Community & Networking Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Community & Networking
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {communityResources.map((resource) => (
                            <ExternalResourceCard key={resource.url} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* Hackathons Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Hackathons
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hackathonResources.map((resource) => (
                            <ExternalResourceCard key={resource.url} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* Learning Platforms Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Learning Platforms
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {learningResources.map((resource) => (
                            <ExternalResourceCard key={resource.url} resource={resource} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}