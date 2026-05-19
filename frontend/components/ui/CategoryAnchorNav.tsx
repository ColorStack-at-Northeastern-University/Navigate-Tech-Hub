'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const PROGRAM_SUBS = [
    { id: 'programs-early-career-program', label: 'Early Career' },
    { id: 'programs-pre-internship', label: 'Pre-Internship' },
    { id: 'programs-fellowship', label: 'Fellowships' },
    { id: 'programs-insight-event', label: 'Insight Events' },
];

const TOOL_SUBS = [
    { id: 'interview-prep', label: 'Interview Prep' },
    { id: 'projects', label: 'Projects' },
    { id: 'community', label: 'Community' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'classes', label: 'Learning' },
];

const ALL_SECTIONS = [
    { id: 'recurring-programs', label: 'Recurring Programs' },
    ...PROGRAM_SUBS,
    { id: 'tools-and-communities', label: 'Tools & Communities' },
    ...TOOL_SUBS,
];

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

function useScrollSpy(): string {
    const [active, setActive] = useState('recurring-programs');
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) setActive(visible[0].target.id);
            },
            { rootMargin: '-15% 0px -80% 0px', threshold: 0 },
        );
        ALL_SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);
    return active;
}

export default function CategoryAnchorNav() {
    const active = useScrollSpy();
    const rowRef = useRef<HTMLDivElement>(null);
    const activePillRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        activePillRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [active]);

    return (
        <div className="sticky top-[64px] z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="container-custom py-3">
                <nav role="navigation" aria-label="Jump to section">
                    <div
                        ref={rowRef}
                        className="flex items-center gap-2 overflow-x-auto scrollbar-none"
                    >
                        {/* Programs group label */}
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-gray-400 pr-1">
                            Programs
                        </span>
                        {PROGRAM_SUBS.map((sub) => (
                            <button
                                key={sub.id}
                                ref={active === sub.id ? activePillRef : null}
                                type="button"
                                onClick={() => scrollTo(sub.id)}
                                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red
                                    ${active === sub.id ? 'bg-neu-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {sub.label}
                            </button>
                        ))}

                        {/* Divider */}
                        <span className="shrink-0 w-px h-5 bg-gray-200 mx-1" aria-hidden="true" />

                        {/* Tools group label */}
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-gray-400 pr-1">
                            Tools
                        </span>
                        {TOOL_SUBS.map((sub) => (
                            <button
                                key={sub.id}
                                ref={active === sub.id ? activePillRef : null}
                                type="button"
                                onClick={() => scrollTo(sub.id)}
                                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red
                                    ${active === sub.id ? 'bg-neu-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}
