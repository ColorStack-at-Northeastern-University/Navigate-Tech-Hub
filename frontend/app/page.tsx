/**
 * Home Page
 *
 * Landing page featuring hero section, featured resources, and about section.
 * Fetches featured resources from Strapi (editor-curated via the `featured` boolean).
 */

import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import EmptyResourceState from '../components/ui/EmptyResourceState';
import ResourceCard from '../components/ui/ResourceCard';
import { NATIONAL_COLORSTACK, getSubmitResourceUrl } from '@/lib/constants';
import { getFeaturedResources } from '@/lib/strapi';

/**
 * Home page component
 * Entry point for the Navigate Tech Hub application
 */
export default async function Home() {
    const featuredResources = await getFeaturedResources();
    const submitUrl = getSubmitResourceUrl();

    return (
        <>
            <Navbar />

            <main>
                <Hero />

                {/* Featured Resources Section */}
                <section className="container-custom">
                    <h3 className="section-title">
                        Featured Resources
                    </h3>
                    <p className="text-gray-600 max-w-3xl mb-6">
                        Curated by the team—toggle &quot;Featured&quot; in Strapi to pin guides here.
                    </p>

                    <div className="accent-bar"></div>

                    {featuredResources.length === 0 ? (
                        <EmptyResourceState
                            title="No featured guides yet"
                            body="Editors can mark entries as featured in Strapi, or explore everything in Browse while we add picks."
                            links={[
                                { href: '/browse', label: 'Browse all guides' },
                                { href: '/external-resources', label: 'External resources' },
                                { href: submitUrl, label: 'Suggest a resource', external: true },
                            ]}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredResources.map((resource) => (
                                <ResourceCard
                                    key={resource.slug}
                                    resource={resource}
                                    showCategory={false}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* About Section */}
                <section className="container-custom">
                    <h3 className="section-title" id="about">
                        About Navigate Tech Hub
                    </h3>

                    <div className="accent-bar"></div>

                    <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[5px] border-colorstack-teal">
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            <strong className="text-neu-red font-semibold">Navigate Tech Hub</strong> is a student-led initiative created by Adesola Odubiyi to support
                            Black and Latinx computer science students at Northeastern University. Our mission is simple: centralize
                            resources, share knowledge, and build community.
                        </p>

                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Whether you&apos;re preparing for technical interviews, looking for project ideas, navigating course registration,
                            or seeking career advice, Navigate Tech Hub is your single source of truth. We&apos;ve compiled insights from{' '}
                            <a
                                href={NATIONAL_COLORSTACK.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neu-red font-semibold underline hover:opacity-80"
                            >
                               National ColorStack
                            </a>
                            {' '},{' '}
                            <strong className="text-neu-red font-semibold">Code: Black</strong>, and experienced students who&apos;ve been where you are.
                        </p>

                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            This platform is built{' '}
                            <strong className="text-neu-red font-semibold">by students, for students</strong>. All content is open-source and continuously
                            updated by our community.{' '}
                            <a
                                href={submitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-colorstack-teal font-semibold underline hover:opacity-80"
                            >
                                Suggest a resource
                            </a>
                            {' '}and we&apos;ll review it for the hub.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            <strong className="text-neu-red font-semibold">Let&apos;s navigate this journey together.</strong>
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
