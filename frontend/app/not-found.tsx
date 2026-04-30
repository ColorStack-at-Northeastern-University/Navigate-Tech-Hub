/**
 * 404 Not Found Page
 * 
 * Error page shown when user navigates to invalid URL.
 * On-brand messaging that encourages user to return to valid pages.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { NATIONAL_COLORSTACK } from '@/lib/constants';
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
                <section className="mt-16 gradient-brand text-white py-20 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4">
                            Looks like you&apos;re navigating uncharted territory
                        </h1>
                        <p className="text-xl">
                            The page you&apos;re looking for doesn&apos;t exist
                        </p>
                    </div>
                </section>

                <div className="container-custom text-center">
                    <Link
                        href="/"
                        className="inline-block bg-colorstack-teal text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-colorstack-orange transition-colors mb-8"
                    >
                        Return to Home
                    </Link>

                    <p className="text-gray-600 text-lg mb-4">
                        Try{' '}
                        <Link href="/browse" className="text-colorstack-teal underline hover:text-colorstack-orange">
                            Browse
                        </Link>
                        {' '}or{' '}
                        <Link href="/external-resources" className="text-colorstack-teal underline hover:text-colorstack-orange">
                            External Resources
                        </Link>
                        {' '}from the menu.
                    </p>
                    <p className="text-gray-600 text-sm">
                        Looking for{' '}
                        <a
                            href={NATIONAL_COLORSTACK.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-colorstack-teal underline hover:text-colorstack-orange"
                        >
                            ColorStack nationally
                        </a>
                        ?
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}