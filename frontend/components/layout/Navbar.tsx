/**
 * Navbar Component (Skeleton)
 *
 * Fixed navigation bar with responsive design.
 * Desktop: horizontal menu with links
 * Mobile: hamburger menu with dropdown
 */

'use client';

import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { useState } from 'react';

/**
 * Navbar component for site-wide navigation
 * Appears at the top of every page via root layout
 */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 bg-neu-black text-white px-8 py-4 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <div className="text-2xl font-bold">
                    <Link href="/"
                        className="hover:text-colorstack-teal transition-colors"
                    >
                        {SITE_CONFIG.name}
                    </Link>
                </div>

                <ul className="hidden md:flex gap-8">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="hover:text-colorstack-teal transition-colors"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl hover:text-colorstack-teal transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-neu-black md:hidden shadow-lg transition-all duration-300">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href} className="border-b border-gray-800">
                                <Link
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-8 py-4 text-center hover:bg-gray-900 hover:text-colorstack-teal transition-colors duration-200"
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