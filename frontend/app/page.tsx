import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ColorStackOpportunities from '../components/sections/ColorStackOpportunities';
import EmptyResourceState from '@/components/ui/EmptyResourceState';
import FeaturedGuideCarousel from '@/components/ui/FeaturedGuideCarousel';
import { NATIONAL_COLORSTACK } from '@/lib/constants';
import { getFeaturedResources, getHeroStats, getStartHereArticle } from '@/lib/strapi';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const [featuredResources, startHereArticle, heroStats] = await Promise.all([
        getFeaturedResources(),
        getStartHereArticle(),
        getHeroStats(),
    ]);

    return (
        <>
            <Navbar />
            <main>
                <Hero stats={heroStats} />
                <ColorStackOpportunities />

                <div className="flex flex-col items-center gap-20 py-8 px-4">
                    {startHereArticle && (
                        <section className="w-full max-w-2xl text-center">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-neu-red mb-4">New here?</p>
                            <Link
                                href={`/${startHereArticle.category}/${startHereArticle.slug}`}
                                className="group block bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[3px] border-neu-red hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
                            >
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neu-red text-white uppercase tracking-wide mb-4">
                                    Start Here
                                </span>
                                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3 group-hover:text-neu-red transition-colors">
                                    {startHereArticle.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">{startHereArticle.description}</p>
                                <span className="text-sm font-medium text-neu-red">
                                    Read guide · {startHereArticle.timeToReadMinutes} min →
                                </span>
                            </Link>
                        </section>
                    )}

                    <section className="w-full max-w-4xl">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center mb-6">Featured guides</p>
                        {featuredResources.length === 0 ? (
                            <EmptyResourceState
                                title="No featured guides yet"
                                body="Editors can mark entries as featured in Strapi."
                                links={[{ href: '/browse', label: 'Browse all guides' }]}
                            />
                        ) : (
                            <FeaturedGuideCarousel resources={featuredResources} />
                        )}
                        <div className="text-center mt-6">
                            <Link href="/browse" className="text-sm font-semibold text-neu-red hover:underline">
                                Browse all guides →
                            </Link>
                        </div>
                    </section>

                    <section className="w-full max-w-2xl text-center py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 mb-3">
                            Confused about your resume? No internship required.
                        </p>
                        <Link
                            href="/resume"
                            className="inline-flex px-6 py-2.5 bg-neu-red text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
                        >
                            Resume roadmap & samples →
                        </Link>
                    </section>

                    <section className="w-full max-w-2xl text-center" id="about">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-6">About</p>
                        <p className="font-display text-2xl md:text-3xl font-bold text-brand-dark leading-snug mb-5">
                            One place for the guides, tools, and programs that actually matter for Black and Latinx CS students at NEU.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Built by students, maintained by the{' '}
                            <a href={NATIONAL_COLORSTACK.website} target="_blank" rel="noopener noreferrer"
                                className="text-neu-red font-semibold underline underline-offset-2 hover:opacity-80">
                                ColorStack
                            </a>
                            {' '}chapter. No paywalls, no signups.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/browse"
                                className="px-6 py-2.5 bg-neu-red text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2">
                                Browse guides →
                            </Link>
                            <Link href="/about"
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:border-neu-red hover:text-neu-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2">
                                Learn more
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
