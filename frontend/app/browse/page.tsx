import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import BrowseContent from '@/components/sections/BrowseContent';
import CircuitPattern from '@/components/ui/CircuitPattern';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import { getSubmitResourceUrl } from '@/lib/constants';
import { getAllResources } from '@/lib/strapi';

export default async function BrowsePage() {
    const resources = await getAllResources();
    const submitUrl = getSubmitResourceUrl();

    return (
        <>
            <Navbar />

            <main>
                <section className="mt-16 pt-16 pb-12 bg-[#AA0F15] relative overflow-hidden">
                    <CircuitPattern />
                    <div className="container-custom !py-0 relative z-10">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                            Browse All Resources
                        </h1>
                        <p className="text-white/80 text-lg">
                            Explore our curated collection of guides, articles, and tools for CS students.
                        </p>
                    </div>
                </section>

                <div className="container-custom">
                    <p className="text-[#de0911] text-4xl md:text-5xl font-bold mb-8">&lt;&gt;</p>

                    {resources.length === 0 ? (
                        <EmptyResourceState
                            title="No guides published yet"
                            body="Once editors add articles in Strapi, they'll show up here. You can still explore external links or suggest content."
                            links={[
                                { href: '/external-resources', label: 'External resources' },
                                { href: submitUrl, label: 'Suggest a resource', external: true },
                            ]}
                        />
                    ) : (
                        <BrowseContent resources={resources} />
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
