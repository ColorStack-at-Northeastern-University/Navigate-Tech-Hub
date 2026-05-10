'use client';

import { useEffect, useRef, useState } from 'react';

interface AnchorPill {
    id: string;
    label: string;
}

const PILLS: AnchorPill[] = [
    { id: 'programs', label: 'Programs' },
    { id: 'interview-prep', label: 'Interview Prep' },
    { id: 'projects', label: 'Projects' },
    { id: 'community', label: 'Community' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'classes', label: 'Learning' },
];

/**
 * Sticky horizontal pill bar that sits below the page hero.
 *
 * Scroll-spy uses IntersectionObserver watching each section's top edge so
 * the active pill updates as the user scrolls — no scroll event listener.
 * On mobile the bar scrolls horizontally (overflow-x: auto, no wrapping).
 */
export default function CategoryAnchorNav() {
    const [active, setActive] = useState<string>('programs');
    const navRef = useRef<HTMLDivElement>(null);
    const activePillRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const sectionIds = PILLS.map((p) => p.id);

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the topmost section that is currently intersecting.
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActive(visible[0].target.id);
                }
            },
            {
                // Fire when the section top crosses the 15% mark from the viewport top.
                rootMargin: '-15% 0px -80% 0px',
                threshold: 0,
            },
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Keep the active pill scrolled into view inside the nav bar on mobile.
    useEffect(() => {
        activePillRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }, [active]);

    function handlePillClick(id: string) {
        const el = document.getElementById(id);
        if (!el) return;
        // Offset by the sticky nav height (~52px) so the section heading isn't hidden.
        const y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActive(id);
    }

    return (
        <div className="sticky top-[64px] z-30 bg-white border-b border-gray-200 shadow-sm">
            <div
                ref={navRef}
                className="container-custom py-3 flex gap-2 overflow-x-auto scrollbar-none"
                role="navigation"
                aria-label="Jump to section"
            >
                {PILLS.map((pill) => (
                    <button
                        key={pill.id}
                        ref={active === pill.id ? activePillRef : null}
                        onClick={() => handlePillClick(pill.id)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-neu-red ${
                            active === pill.id
                                ? 'bg-neu-red text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                        aria-current={active === pill.id ? 'location' : undefined}
                    >
                        {pill.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
