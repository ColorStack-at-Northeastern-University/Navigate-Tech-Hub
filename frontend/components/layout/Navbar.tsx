'use client';

import { NAV_LINKS } from '@/lib/constants';
import { SITE_ASSETS } from '@/lib/siteAssets';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-8 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center relative h-14">
                {/* Left: Logo — allowed to overflow the navbar height */}
                <Link href="/" className="flex-shrink-0 relative z-10">
                    <Image
                        src={SITE_ASSETS.images.navtechhubLogo}
                        alt="Navigate Tech Hub"
                        width={500}
                        height={140}
                        className="h-20 md:h-28 lg:h-32 w-auto -my-4"
                        priority
                    />
                </Link>

                {/* Center: Nav links — absolutely centered in the navbar */}
                <ul className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="text-sm font-medium text-gray-600 hover:text-neu-red transition-colors whitespace-nowrap"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden ml-auto text-2xl text-brand-dark hover:text-neu-red transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 md:hidden shadow-lg">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href} className="border-b border-gray-100">
                                <Link
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-8 py-4 text-center text-brand-dark font-medium hover:bg-surface-muted hover:text-neu-red transition-colors duration-200"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
