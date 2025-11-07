/** 
 * External Resources Page (Skeleton)
 *
 * Directory of external tools, platforms, and resources.
 * Organized by category with direct links to external sites.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
// where even is this twin
import ExternalResourceCard from '@/components/ui/ExternalResourceCard';
import { externalResources } from '@/data/externalResources';

/**
 * External Resources page component
 * Displays curated external links organized by category
 */


export default function ExternalResourcesPage() {
    /**
     * TODO: Filter Resources by Category
     *
     * Description: Create separate arrays for each category of resources
     * Acceptance Criteria:
     * - [ ] Filter externalResources by category 'interview-prep'
     * - [ ] Store in interviewPrepResources variable
     * - [ ] Repeat for: projects, community, hackathons, classes
     *
     * Hint: const interviewPrepResources = externalResources.filter(r => r.category === 'interview-prep')
     */
    const interviewPrepResources = externalResources.filter(
        (r) => r.category === 'interview-prep'
    );
    const projectsResources = externalResources.filter(
        (r) => r.category === 'projects'
    );
    const communityResources = externalResources.filter(
        (r) => r.category === 'community'
    );
    const hackathonResources = externalResources.filter(
        (r) => r.category === 'hackathons'
    );
    const learningResources = externalResources.filter(
        (r) => r.category === 'classes'
    );

    return (
        <>
            <Navbar />

            <main className="container-custom mt-16">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="page-title">External Resources Directory</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Quick links to external tools, platforms, and resources curated for CS students.
                        All links open in a new tab.
                    </p>
                    <div className="accent-bar max-w-md mx-auto"></div>
                </div>

                {/**
         * TODO: Interview Prep Section
         *
         * Description: Display interview prep resources in a category section
         * Acceptance Criteria:
         * - [ ] Section with margin-bottom for spacing
         * - [ ] Category title (h2) - "Interview Prep"
         * - [ ] Grid of ExternalResourceCards
         * - [ ] Grid responsive: 1 col mobile, 2 col tablet, 3 col desktop
         * - [ ] Map over interviewPrepResources
         * - [ ] Use resource.url as key
         *
         * Hint: Grid classes same as browse page
         */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Interview Prep
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {interviewPrepResources.map((resource) => (
                        <ExternalResourceCard
                            key={resource.url}
                            resource={resource}
                        />
                        ))}
                    </div>
                </section>

                {/**
         * TODO: Projects & Portfolio Section
         *
         * Description: Display project and portfolio resources
         * Acceptance Criteria:
         * - [ ] Same structure as Interview Prep section
         * - [ ] Category title - "Projects & Portfolio"
         * - [ ] Map over projectsResources
         */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Projects and Portfolio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsResources.map((resource) => (
                        <ExternalResourceCard
                        key={resource.url}
                        resource={resource}
                        />
                    ))}
                    </div>
                </section>

                {/**
         * TODO: Community & Networking Section
         *
         * Description: Display community and networking resources
         * Acceptance Criteria:
         * - [ ] Same structure as previous sections
         * - [ ] Category title - "Community & Networking"
         * - [ ] Map over communityResources
         */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Community and Networking
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {communityResources.map((resource) => (
                        <ExternalResourceCard
                        key={resource.url}
                        resource={resource}
                        />
                    ))}
                    </div>
                </section>

                {/**
         * TODO: Hackathons Section
         *
         * Description: Display hackathon resources
         * Acceptance Criteria:
         * - [ ] Same structure as previous sections
         * - [ ] Category title - "Hackathons"
         * - [ ] Map over hackathonResources
         */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Hackathons
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hackathonResources.map((resource) => (
                        <ExternalResourceCard
                        key={resource.url}
                        resource={resource}
                        />
                    ))}
                    </div>
                </section>

                {/**
         * TODO: Learning Platforms Section
         *
         * Description: Display learning platform resources
         * Acceptance Criteria:
         * - [ ] Same structure as previous sections
         * - [ ] Category title - "Learning Platforms"
         * - [ ] Map over learningResources
         */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neu-black mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
                        Learning Platforms
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {learningResources.map((resource) => (
                        <ExternalResourceCard
                        key={resource.url}
                        resource={resource}
                        />
                    ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}