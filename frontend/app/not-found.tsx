import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { NATIONAL_COLORSTACK } from '@/lib/constants';
import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen">
                <section className="mt-16 pt-20 pb-16 text-center">
                    <div className="max-w-4xl mx-auto px-8">
                        <h1 className="font-display text-6xl font-bold text-brand-dark mb-4">
                            404
                        </h1>
                        <p className="text-2xl text-gray-500 mb-2">
                            Looks like you&apos;re navigating uncharted territory
                        </p>
                        <p className="text-lg text-gray-400">
                            The page you&apos;re looking for doesn&apos;t exist
                        </p>
                    </div>
                </section>

                <div className="container-custom text-center">
                    <Link
                        href="/"
                        className="inline-block bg-neu-red text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors mb-8"
                    >
                        Return to Home
                    </Link>

                    <p className="text-gray-600 text-lg mb-4">
                        Try{' '}
                        <Link href="/browse" className="text-neu-red underline hover:text-red-700">
                            Browse
                        </Link>
                        {' '}or{' '}
                        <Link href="/external-resources" className="text-neu-red underline hover:text-red-700">
                            External Resources
                        </Link>
                        , or read the{' '}
                        <Link href="/faq" className="text-neu-red underline hover:text-red-700">
                            FAQ
                        </Link>
                        .
                    </p>
                    <p className="text-gray-600 text-sm">
                        Looking for{' '}
                        <a
                            href={NATIONAL_COLORSTACK.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neu-red underline hover:text-red-700"
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
