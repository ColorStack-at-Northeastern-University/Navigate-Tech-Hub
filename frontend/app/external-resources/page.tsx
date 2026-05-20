import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import CategoryAnchorNav from '@/components/ui/CategoryAnchorNav';
import CircuitPattern from '@/components/ui/CircuitPattern';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import ExternalResourceCard from '@/components/ui/ExternalResourceCard';
import MetaSourcesStrip from '@/components/ui/MetaSourcesStrip';
import ProgramsSection from '@/components/ui/ProgramsSection';
import { getExternalResources } from '@/lib/strapi';
import type { ExternalResource, ResourceCategory } from '@/lib/types';
import { externalResourceListKey } from '@/lib/utils';
import Link from 'next/link';

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
                    <ExternalResourceCard key={externalResourceListKey(resource)} resource={resource} />
                ))}
            </div>
        </section>
    );
}

export default async function ExternalResourcesPage() {
    const allResources = await getExternalResources();
    const recurringPrograms = allResources.filter((r) => r.directoryTier === 'recurring-program');
    const toolsAndCommunities = allResources.filter((r) => r.directoryTier === 'tools-and-communities');
    const grouped = Object.groupBy(toolsAndCommunities, (r) => r.category);

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
                            Curated links to tools, communities, and recurring programs.
                            All links open in a new tab.
                        </p>
                    </div>
                </section>

                <CategoryAnchorNav />

                {/* Meta-sources pointer strip */}
                <MetaSourcesStrip />

                <div className="container-custom">
                    <p className="text-[#de0911] text-4xl md:text-5xl font-bold mb-2">&lt;&gt;</p>

                    {/* Honest-expectations disclaimer */}
                    <p className="text-sm text-gray-500 max-w-3xl mb-10">
                        This directory is curated, not exhaustive. We point to the tools and programs
                        that matter most, with honest seasonal context for programs.
                        Links verified by a human; last-verified dates shown on each card.{' '}
                        <Link href="/suggest-resource" className="text-neu-red underline underline-offset-2 hover:opacity-80">
                            Know something broken or missing?
                        </Link>
                    </p>

                    {allResources.length === 0 ? (
                        <EmptyResourceState
                            title="No external links yet"
                            body="Curated tools and platforms will appear here once they are added in Strapi."
                            links={[
                                { href: '/browse', label: 'Browse guides' },
                                { href: '/suggest-resource', label: 'Suggest a link' },
                            ]}
                        />
                    ) : (
                        <>
                            {/* Tier 2 — Recurring programs (programType buckets) */}
                            <ProgramsSection resources={recurringPrograms} />

                            {/* Tier 1 — Tools & communities (category grids) */}
                            {toolsAndCommunities.length > 0 && (
                                <section className="mb-8" id="tools-and-communities">
                                    <h2 className="font-display text-3xl font-bold text-brand-dark mb-2 pb-2 border-b-[3px] border-neu-red inline-block">
                                        Tools &amp; Communities
                                    </h2>
                                    <p className="text-gray-600 mb-8 max-w-3xl">
                                        Stable links to platforms and communities. Permanent homepages that don&apos;t change with recruiting seasons.
                                    </p>
                                    {SECTION_ORDER.map((cat) => (
                                        <CategorySection
                                            key={cat}
                                            id={cat}
                                            label={CATEGORY_LABELS[cat]}
                                            resources={grouped[cat] ?? []}
                                        />
                                    ))}
                                </section>
                            )}
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
