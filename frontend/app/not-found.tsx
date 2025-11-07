/**
 * 404 Not Found Page (Skeleton) BRYCE
 * 
 * Error page shown when user navigates to invalid URL.
 * On-brand messaging that encourages user to return to valid pages.
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
                {/**
         * TODO: Hero Section
         * 
         * Description: Create gradient hero with on-brand 404 message
         * Acceptance Criteria:
         * - [ ] Use gradient-brand class
         * - [ ] White text color
         * - [ ] Centered content
         * - [ ] Main message: "Looks like you're navigating uncharted territory"
         * - [ ] Subtitle: "The page you're looking for doesn't exist"
         * - [ ] Large font for main message (text-5xl)
         * - [ ] Proper padding and spacing
         * 
         * Hint: Follow same structure as Hero component from landing page
         */}
                <section className="mt-16 gradient-brand text-white py-20 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Main 404 message here */}
                        {/* Subtitle here */}
                    </div>
                </section>

                {/* Navigation Options */}
                <div className="container-custom text-center">
                    {/**
           * TODO: Return to Home Button
           * 
           * Description: Primary CTA button to return to homepage
           * Acceptance Criteria:
           * - [ ] Link to "/" (homepage)
           * - [ ] Text: "Return to Home"
           * - [ ] Teal background, white text
           * - [ ] Rounded pill shape
           * - [ ] Large padding for prominence
           * - [ ] Hover effect (changes to orange)
           * - [ ] Margin bottom for spacing
           * 
           * Hint: Same button style as Hero CTA, but teal instead of black
           */}
                    <Link
                        href="/"
                        className="inline-block bg-colorstack-teal text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-colorstack-orange transition-colors mb-8"
                    >
                        {/* Button text here */}
                    </Link>

                    {/**
           * TODO: Quick Links Section
           * 
           * Description: Optional links to main pages (Browse, External Resources)
           * Acceptance Criteria:
           * - [ ] Paragraph with text "Or explore:"
           * - [ ] Links to /browse and /external-resources
           * - [ ] Teal link color with underline
           * - [ ] Hover effect
           * 
           * Hint: Or explore: <Link href="/browse">Browse Resources</Link> or <Link href="/external-resources">External Resources</Link>
           */}
                    <p className="text-gray-600 text-lg">
                        Or explore:{' '}
                        {/* Links to Browse and External Resources here */}
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}