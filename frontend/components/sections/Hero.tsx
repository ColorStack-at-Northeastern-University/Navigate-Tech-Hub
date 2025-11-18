/**
 * [DEMO UI ENHANCEMENTS - Hero Redesign]
 * 
 * Hero Component - Split Layout
 * 
 * Modern two-column hero section with text content and stats showcase.
 * Designed to immediately communicate value and engage visitors.
 */

import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import StatsCard from '../ui/StatsCard';

export default function Hero() {
    const stats = [
        {value: 12, label: 'Resources', suffix: '+' },
        {value: 31, label: 'External Links', suffix: '+' },
        {value: 5, label: 'Categories' },
        {value: 100, label: 'Free Access', suffix: '%' },
    ];

    return (
        <section className="mt-16 gradient-brand text-white py-16 md:py-24 px-6 md:px-8 overflow-hidden relative">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Text Content */}
                    <div className="text-center lg:text-left animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            {SITE_CONFIG.name}
                        </h1>

                        <p className="text-lg md:text-xl font-light mb-8 leading-relaxed opacity-95">
                            Your one-stop resource hub for Black and Latinx CS students at Northeastern University
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/browse"
                                className="
                                    inline-block
                                    bg-neu-black text-white
                                    px-8 py-4
                                    rounded-full
                                    text-lg font-semibold
                                    transition-all duration-300 ease-out
                                    hover:bg-colorstack-orange hover:scale-105 hover:shadow-[0_8px_24px_rgba(252,180,50,0.4)]
                                    active:scale-100
                                "
                            >
                                Explore Resources
                            </Link>

                            <Link
                                href="/external-resources"
                                className="
                                    inline-block
                                    bg-white/20 text-white backdrop-blur-sm
                                    border-2 border-white/40
                                    px-8 py-4
                                    rounded-full
                                    text-lg font-semibold
                                    transition-all duration-300 ease-out
                                    hover:bg-white/30 hover:scale-105 hover:border-white/60
                                    active:scale-100
                                "
                            >
                                View Links
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Stats Card */}
                    <div className="flex justify-center lg:justify-end">
                        <StatsCard stats={stats} />
                    </div>
                </div>
            </div>
        </section>
    );
}