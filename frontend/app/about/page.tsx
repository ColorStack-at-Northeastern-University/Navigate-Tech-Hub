import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AboutHero from '@/components/about/AboutHero';
import AboutStartHereCard from '@/components/about/AboutStartHereCard';
import {
    ABOUT_CTAS,
    ABOUT_HERO,
    ABOUT_PILLARS,
    ABOUT_STAT_CHIPS,
    ABOUT_STORY,
    ABOUT_VALUES,
} from '@/components/about/aboutContent';
import { getStartHereArticle } from '@/lib/strapi';
import Link from 'next/link';

export default async function AboutPage() {
    const startHereArticle = await getStartHereArticle();

    return (
        <>
            <Navbar />
            <main className="mt-16">
                <AboutHero heading={ABOUT_HERO.heading} subhead={ABOUT_HERO.subhead} compact />

                {/* Mission — display type, not a card */}
                <section className="container-custom" aria-labelledby="mission-heading">
                    <p id="mission-heading" className="font-display text-3xl md:text-4xl font-bold text-brand-dark max-w-3xl leading-snug mb-6">
                        A curated map for underclassmen ColorStack students navigating CS at NEU and nationwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-0 mt-8 mb-2 border-t border-gray-200">
                        {ABOUT_PILLARS.map((pillar, idx) => (
                            <Link
                                key={pillar.href}
                                href={pillar.href}
                                className={`
                                    group flex-1 pt-6 pb-5
                                    ${idx < ABOUT_PILLARS.length - 1 ? 'sm:pr-8 sm:border-r border-b sm:border-b-0 border-gray-200' : ''}
                                    ${idx > 0 ? 'sm:pl-8' : ''}
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2 rounded
                                `}
                            >
                                <p className="font-display text-xl font-bold text-brand-dark group-hover:text-neu-red transition-colors mb-2">
                                    {pillar.label}
                                    <span className="ml-2 text-neu-red opacity-0 group-hover:opacity-100 transition-opacity text-base">→</span>
                                </p>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                                    {pillar.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Values — vertical timeline */}
                <section className="container-custom" aria-labelledby="values-heading">
                    <h2 id="values-heading" className="font-display text-2xl font-bold text-brand-dark mb-8">
                        What we stand for
                    </h2>
                    <div className="max-w-2xl space-y-0">
                        {ABOUT_VALUES.map((value, idx) => (
                            <div
                                key={value.title}
                                className={`flex gap-6 ${idx < ABOUT_VALUES.length - 1 ? 'pb-8' : ''}`}
                            >
                                <div className="flex flex-col items-center shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-neu-red mt-1.5" />
                                    {idx < ABOUT_VALUES.length - 1 && (
                                        <div className="w-0.5 bg-neu-red/20 flex-1 mt-1" />
                                    )}
                                </div>
                                <div className="pb-2">
                                    <h3 className="font-bold text-brand-dark mb-1">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{value.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Story — two-column: text + at-a-glance sidebar */}
                <section className="container-custom mb-16" aria-labelledby="story-heading">
                    <h2 id="story-heading" className="font-display text-2xl font-bold text-brand-dark mb-6">
                        Our story
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-4">
                            <p className="text-gray-700 leading-relaxed">{ABOUT_STORY.bodyShort}</p>
                            <p className="text-gray-700 leading-relaxed">{ABOUT_STORY.bodyLaunchpad}</p>
                            <p className="text-gray-700 leading-relaxed">
                                Through the partnership between ColorStack and Northeastern University, Navigate Tech Hub grew from a small collection of links into a platform built alongside students like{' '}
                                {ABOUT_STORY.contributors.map((c, i) => (
                                    <span key={c.name}>
                                        <a
                                            href={c.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-brand-dark hover:text-neu-red underline underline-offset-2 transition-colors"
                                        >
                                            {c.name}
                                        </a>
                                        {i < ABOUT_STORY.contributors.length - 2 ? ', ' : i === ABOUT_STORY.contributors.length - 2 ? ', and ' : ''}
                                    </span>
                                ))}
                                . The platform continues to evolve by being open source, student-maintained, and deliberately small so it stays useful.
                            </p>
                            <p className="text-sm text-gray-500">
                                <a
                                    href={ABOUT_STORY.founderUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-brand-dark hover:text-neu-red underline underline-offset-2 transition-colors"
                                >
                                    {ABOUT_STORY.founderName}
                                </a>
                                {', '}{ABOUT_STORY.founderTitle}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                {ABOUT_CTAS.map((cta) =>
                                    cta.primary ? (
                                        <Link key={cta.href} href={cta.href}
                                            className="px-6 py-2.5 bg-neu-red text-white rounded-full font-semibold text-sm hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2">
                                            {cta.label} →
                                        </Link>
                                    ) : (
                                        <Link key={cta.href} href={cta.href}
                                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full font-semibold text-sm hover:border-neu-red hover:text-neu-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2">
                                            {cta.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>

                        <aside className="bg-gray-50 rounded-xl p-6 border border-gray-200 self-start">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">At a glance</p>
                            <ul className="space-y-3">
                                {ABOUT_STAT_CHIPS.map((chip) => (
                                    <li key={chip.label} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neu-red shrink-0" />
                                        {chip.label}
                                    </li>
                                ))}
                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neu-red shrink-0" />
                                    <a href={ABOUT_STORY.colorstackWebsite} target="_blank" rel="noopener noreferrer"
                                        className="text-neu-red hover:underline">
                                        colorstack.org ↗
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </section>

                {startHereArticle && <AboutStartHereCard article={startHereArticle} />}

                <div className="container-custom pt-0! pb-8">
                    <p className="text-[#de0911] text-3xl md:text-4xl font-bold">&lt;/&gt;</p>
                </div>
            </main>
            <Footer />
        </>
    );
}
