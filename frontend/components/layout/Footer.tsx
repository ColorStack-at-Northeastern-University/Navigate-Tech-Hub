/**
 * Footer Component (Skeleton)
 * 
 * Displays site footer with copyright information and social media links.
 * Layout is responsive: flex row on desktop, stacked column on mobile.
 */


/**
 * Footer component for site-wide navigation and social links
 * Appears at the bottom of every page via root layout
 */
export default function Footer() {
    return (
        <footer className="bg-neu-black text-white py-8 mt-16">
            <div className="container-custom">
                {/**
         * TODO: Implement Footer Content Layout
         * 
         * Description: Create responsive flex container for copyright and social links
         * Acceptance Criteria:
         * - [ ] Use flex layout (row on desktop, column on mobile)
         * - [ ] Center items on mobile (text-center)
         * - [ ] Space between items on desktop (justify-between)
         * - [ ] Add gap between elements for mobile stacking
         * 
         * Resources:
         * - Tailwind Flexbox: https://tailwindcss.com/docs/flex
         * - Responsive Design: https://tailwindcss.com/docs/responsive-design
         * 
         * Estimated Time: 1 hour
         */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">

                    {/**
           * TODO: Display Copyright Text
           * 
           * Description: Render copyright text from SITE_CONFIG
           * Acceptance Criteria:
           * - [ ] Display SITE_CONFIG.footer.copyright
           * - [ ] Use gray text color (text-neu-gray)
           * - [ ] Ensure text is readable on dark background
           * 
           * Hint: Access constants with SITE_CONFIG.footer.copyright
           * 
           * Estimated Time: 30 minutes
           */}
                    <p className="text-neu-gray">
                        {/* Display copyright text here */}
                    </p>

                    {/**
           * TODO: Render Social Links
           * 
           * Description: Create a list of social media links that open in new tabs
           * Acceptance Criteria:
           * - [ ] Create flex container for links with gap between items
           * - [ ] Map over SITE_CONFIG.social object
           * - [ ] Each link opens in new tab (target="_blank" rel="noopener noreferrer")
           * - [ ] Links have gray text with white hover effect
           * - [ ] Add smooth transition for hover effect
           * 
           * Resources:
           * - Object.entries(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
           * - Tailwind Hover: https://tailwindcss.com/docs/hover-focus-and-other-states
           * 
           * Estimated Time: 1 hour
           */}
                    <div className="flex gap-8 justify-center md:justify-end">
                        {/* Map over social links here */}
                        {/* Example structure:
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neu-gray hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            */}
                    </div>
                </div>
            </div>
        </footer>
    );
}