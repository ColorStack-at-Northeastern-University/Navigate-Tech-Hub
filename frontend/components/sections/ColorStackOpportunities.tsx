'use client';

import { useRef } from 'react';
import { COLORSTACK_OPPORTUNITIES, type ColorStackOpportunity } from '@/data/opportunities';

const TYPE_LABELS: Record<ColorStackOpportunity['type'], string> = {
    internship: 'Internship',
    'co-op': 'Co-op',
    'new-grad': 'New Grad',
    program: 'Program',
    scholarship: 'Scholarship',
    other: 'Opportunity',
};

const TYPE_COLORS: Record<ColorStackOpportunity['type'], string> = {
    internship: 'bg-blue-100 text-blue-700',
    'co-op': 'bg-purple-100 text-purple-700',
    'new-grad': 'bg-green-100 text-green-700',
    program: 'bg-amber-100 text-amber-700',
    scholarship: 'bg-pink-100 text-pink-700',
    other: 'bg-gray-100 text-gray-600',
};

function OpportunityCard({ opportunity }: { opportunity: ColorStackOpportunity }) {
    return (
        <div className="bg-white rounded-xl p-6 min-w-[320px] max-w-[340px] shrink-0 snap-start flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${TYPE_COLORS[opportunity.type]}`}>
                    {TYPE_LABELS[opportunity.type]}
                </span>
                {opportunity.deadline && (
                    <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full shrink-0">
                        Due {opportunity.deadline}
                    </span>
                )}
            </div>

            <h3 className="text-base font-bold text-brand-dark mb-1 leading-snug mt-2">
                {opportunity.title}
            </h3>
            <p className="text-neu-red font-semibold text-sm mb-2">
                {opportunity.company}
            </p>

            {opportunity.location && (
                <p className="text-xs text-gray-400 mb-2">{opportunity.location}</p>
            )}

            {opportunity.description && (
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {opportunity.description}
                </p>
            )}

            <div className="flex flex-wrap gap-1.5 mb-4">
                {opportunity.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <a
                href={opportunity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block text-center bg-neu-red text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
            >
                View & Apply →
            </a>
        </div>
    );
}

export default function ColorStackOpportunities() {
    const scrollRef = useRef<HTMLDivElement>(null);

    function scrollLeft() {
        scrollRef.current?.scrollBy({ left: -360, behavior: 'smooth' });
    }

    function scrollRight() {
        scrollRef.current?.scrollBy({ left: 360, behavior: 'smooth' });
    }

    return (
        <section className="relative bg-neu-black py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                    <a
                        href="https://wiki.colorstack.org/the-colorstack-family/community/all-things-slack/slack-channels"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neu-red transition-colors"
                    >
                        ColorStack Opportunities
                    </a>
                </h2>
                <div className="text-gray-400 mb-10 max-w-2xl text-sm md:text-base mt-3 space-y-2">
                    <p>
                        Sourced from the ColorStack{' '}
                        <span className="text-white/80 font-medium">#opportunities</span>
                        {' '}channel.
                    </p>
                    <p>Join ColorStack if you haven&apos;t already so you can see for yourself!</p>
                </div>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {COLORSTACK_OPPORTUNITIES.map((opp) => (
                            <OpportunityCard key={opp.id} opportunity={opp} />
                        ))}
                    </div>

                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-neu-red rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-neu-red rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
