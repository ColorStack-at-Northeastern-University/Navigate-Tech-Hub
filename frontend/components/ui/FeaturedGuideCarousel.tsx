'use client';

import ResourceCard from '@/components/ui/ResourceCard';
import type { Resource } from '@/lib/types';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

interface FeaturedGuideCarouselProps {
    resources: Resource[];
}

/**
 * Horizontally scrollable carousel for featured guides.
 *
 * Uses CSS scroll-snap for smooth native scrolling.
 * Prev / next buttons step one card at a time.
 * Auto-sizes: 1 card on mobile, 2 on sm, 3 on lg.
 */
export default function FeaturedGuideCarousel({ resources }: FeaturedGuideCarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const updateEdgeState = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }, []);

    function step(dir: 1 | -1) {
        const el = trackRef.current;
        if (!el) return;
        const cardWidth = el.firstElementChild?.clientWidth ?? 300;
        el.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
    }

    if (resources.length === 0) {
        return (
            <p className="text-sm text-gray-400 text-center">
                No featured guides yet.{' '}
                <Link href="/browse" className="text-neu-red hover:underline">browse all</Link>.
            </p>
        );
    }

    return (
        <div className="relative">
            {/* Scroll track */}
            <div
                ref={trackRef}
                onScroll={updateEdgeState}
                className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-2"
            >
                {resources.map((r) => (
                    <div
                        key={`${r.category}-${r.slug}`}
                        className="shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start"
                    >
                        <ResourceCard resource={r} showCategory={false} />
                    </div>
                ))}
            </div>

            {/* Prev / Next */}
            {resources.length > 1 && (
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        disabled={atStart}
                        aria-label="Previous guide"
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-neu-red hover:text-neu-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => step(1)}
                        disabled={atEnd}
                        aria-label="Next guide"
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-neu-red hover:text-neu-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
}
