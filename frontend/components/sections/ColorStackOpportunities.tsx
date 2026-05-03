'use client';

import { useRef } from 'react';
import { SAMPLE_OPPORTUNITIES, type Opportunity } from '@/data/opportunities';

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
    return (
        <div className="bg-white rounded-xl p-6 min-w-[320px] max-w-[340px] flex-shrink-0 snap-start flex flex-col">
            <h3 className="text-base font-bold text-brand-dark mb-1 leading-snug">
                {opportunity.title}
            </h3>
            <p className="text-neu-red font-semibold text-sm mb-3">
                {opportunity.company}
            </p>

            <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>
                    <span className="text-gray-400">Posted by</span>{' '}
                    {opportunity.postedBy}
                    <span className="text-gray-400 ml-2">2 hours ago</span>
                </p>
                <p>
                    <span className="text-gray-400">Comp:</span>{' '}
                    {opportunity.compensation}
                </p>
                <p>
                    <span className="text-gray-400">Location:</span>{' '}
                    {opportunity.location}
                </p>
                <p>
                    <span className="text-gray-400">Deadline:</span>{' '}
                    {opportunity.deadline}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <a
                href={opportunity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block text-center bg-neu-red text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-red-700 transition-colors"
            >
                View Careers Page
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
            <div className="absolute top-0 left-0 w-1/2 h-[7px] bg-neu-red rounded-r-full" />
            <div className="max-w-7xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    ColorStack Opportunities
                </h2>
                <div className="w-32 h-1 bg-white mb-4" />
                <p className="text-gray-400 mb-10 max-w-2xl text-sm md:text-base">
                    Navigate Tech Hub integrates with ColorStack to bring opportunities directly to you.
                </p>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {SAMPLE_OPPORTUNITIES.map((opp) => (
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
