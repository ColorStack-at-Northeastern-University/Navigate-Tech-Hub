/**
 * [DEMO UI ENHANCEMENTS - Phase 1]
 * 
 * 404 Not Found Page
 * 
 * Error page shown when user navigates to invalid URL.
 * On-brand messaging that encourages user to return to valid pages.
 * 
 * Quick visual improvements for demo presentation.
 * Production implementation would require:
 * - Comprehensive accessibility audit
 * - Design system integration (shadcn/ui, Radix, etc.)
 * - User research and A/B testing
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

/**
 * 404 page component
 * Displays friendly error message with navigation options
 */
export default function NotFound() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen">
                <section className="mt-16 gradient-brand text-white py-20 px-8 text-center animate-fade-in">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4 tracking-tight">
                            Looks like you're navigating uncharted territory
                        </h1>
                        <p className="text-xl">
                            The page you're looking for doesn't exist
                        </p>
                    </div>
                </section>

                <div className="container-custom text-center">
                    <Link
                        href="/"
                        className="inline-block bg-colorstack-teal text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-colorstack-orange hover:scale-105 hover:shadow-lg transition-all duration-200 ease-out active:scale-100 mb-8"
                    >
                        Return to Home
                    </Link>

                    <p className="text-gray-600 text-lg">
                        Or explore:{' '}
                        <Link href="/browse" className="text-colorstack-teal underline underline-offset-4 hover:text-colorstack-orange hover:decoration-2 transition-all duration-200">
                            Browse Resources
                        </Link>
                        {' or '}
                        <Link href="/external-resources" className="text-colorstack-teal underline underline-offset-4 hover:text-colorstack-orange hover:decoration-2 transition-all duration-200">
                            External Resources
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}