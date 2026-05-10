import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import CategoryAnchorNav from '@/components/ui/CategoryAnchorNav';
import CircuitPattern from '@/components/ui/CircuitPattern';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import ExternalResourceCard from '@/components/ui/ExternalResourceCard';
import ProgramsSection from '@/components/ui/ProgramsSection';
import { getSubmitResourceUrl } from '@/lib/constants';
import { getExternalResources } from '@/lib/strapi';
import type { ExternalResource, ResourceCategory } from '@/lib/types';

const CATEGORY_LABELS: Record<Exclude<ResourceCategory, 'programs'>, string> = {
    'interview-prep': 'Interview Prep',
    'projects': 'Projects & Portfolio',
    'community': 'Community & Networking',
    'hackathons': 'Hackathons',
    'classes': 'Learning Platforms',
};

const SECTION_ORDER: Array<Exclude<ResourceCategory, 'programs'>> = [
    'interview-prep',
    'projects',
    'community',
    'hackathons',
    'classes',
];

function CategorySection({ label, resources, id }: { label: string; resources: ExternalResource[]; id: string }) {
    if (resources.length === 0) return null;

    return (
        <section className="mb-16" id={id}>
            <h2 className="font-display text-3xl font-bold text-brand-dark mb-6 pb-2 border-b-[3px] border-neu-red inline-block">
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

export default async function ExternalResourcesPage() {
    const allResources = await getExternalResources();
    const submitUrl = getSubmitResourceUrl();

    const programs = allResources.filter((r) => r.category === 'programs');
    const others = allResources.filter((r) => r.category !== 'programs');
    const grouped = Object.groupBy(others, (r) => r.category);

    return (
        <>
            <Navbar />

            <main>
                <section className="mt-16 pt-16 pb-12 bg-[#AA0F15] relative overflow-hidden">
                    <CircuitPattern />
                    <div className="container-custom !py-0 relative z-10">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                            External Resources Directory
                        </h1>
                        <p className="text-white/80 text-xl max-w-3xl">
                            Quick links to external tools, platforms, and named programs curated for CS students.
                            All links open in a new tab.
                        </p>
                    </div>
                </section>

                <CategoryAnchorNav />

                <div className="container-custom">
                    <p className="text-[#de0911] text-4xl md:text-5xl font-bold mb-8">&lt;&gt;</p>

                    {allResources.length === 0 ? (
                        <EmptyResourceState
                            title="No external links yet"
                            body="Curated tools and platforms will appear here once they are added in Strapi."
                            links={[
                                { href: '/browse', label: 'Browse guides' },
                                { href: submitUrl, label: 'Suggest a link', external: true },
                            ]}
                        />
                    ) : (
                        <>
                            <ProgramsSection resources={programs} />
                            {SECTION_ORDER.map((cat) => (
                                <CategorySection
                                    key={cat}
                                    id={cat}
                                    label={CATEGORY_LABELS[cat]}
                                    resources={grouped[cat] ?? []}
                                />
                            ))}
                        </>
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
