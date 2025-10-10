<<<<<<< HEAD
import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="mt-16 gradient-brand text-white py-20 px-8 text-center">
            <div className="max-w-4xl mx-auto">
                {/* Site Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {SITE_CONFIG.name}
                </h1>

                {/* Tagline */}
                <p className="text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto">
                    {SITE_CONFIG.tagline}
                </p>

                {/* Call-to-Action Button */}
                <Link
                    href="/browse"
                    className="
                        inline-block
                        bg-neu-black text-white
                        px-10 py-4
                        rounded-full
                        text-lg font-semibold
                        transition-all duration-300
                        hover:bg-colorstack-orange hover:scale-105
                    "
                >
                    Explore Resources
=======
/**
 * Hero Component (Skeleton)
 * 
 * Large banner section at the top of the home page.
 * Features site title, tagline, and call-to-action button.
 */

import Link from 'next/link';

/**
 * Hero component for home page banner
 * Displays welcome message and primary CTA
 */
export default function Hero() {
    return (
        <section className="gradient-brand text-white py-20 px-8 text-center">
            <div className="max-w-4xl mx-auto">

                {/**
         * TODO: Display Site Title
         * 
         * Description: Render the main site title from configuration
         * Acceptance Criteria:
         * - [ ] Use h1 or h2 element
         * - [ ] Display SITE_CONFIG.name
         * - [ ] Large text size (text-5xl on desktop, text-3xl on mobile)
         * - [ ] Bold font weight
         * - [ ] Add bottom margin
         * 
         * Hint: Use responsive classes like text-3xl md:text-5xl
         * 
         * Estimated Time: 45 minutes
         */}
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    {/* Display site name here */}
                </h2>

                {/**
         * TODO: Display Tagline
         * 
         * Description: Render the site tagline/subtitle
         * Acceptance Criteria:
         * - [ ] Use paragraph element
         * - [ ] Display SITE_CONFIG.tagline
         * - [ ] Medium text size (text-xl on desktop, text-lg on mobile)
         * - [ ] Light font weight
         * - [ ] Add bottom margin
         * - [ ] Maximum width for readability
         * 
         * Estimated Time: 45 minutes
         */}
                <p className="text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto">
                    {/* Display tagline here */}
                </p>

                {/**
         * TODO: Implement Call-to-Action Button
         * 
         * Description: Create button that links to Browse page
         * Acceptance Criteria:
         * - [ ] Use Link component (styled as button)
         * - [ ] Link to /browse page
         * - [ ] Black background with white text
         * - [ ] Padding and rounded corners (pill shape)
         * - [ ] Hover effect: orange background with slight scale up
         * - [ ] Smooth transition for hover effects
         * - [ ] Text should say "Explore Resources"
         * 
         * Resources:
         * - Tailwind Transforms: https://tailwindcss.com/docs/scale
         * 
         * Estimated Time: 90 minutes
         */}
                <Link
                    href="/browse"
                    className="
            inline-block
            bg-neu-black text-white
            px-10 py-4
            rounded-full
            text-lg font-semibold
            transition-all duration-300
            hover:bg-colorstack-orange hover:scale-105
          "
                >
                    {/* Button text here */}
>>>>>>> 44b5b4e (Added skeleton code for sprint 1 tasks. Making the foundation for the website)
                </Link>
            </div>
        </section>
    );
}