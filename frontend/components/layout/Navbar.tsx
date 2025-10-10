/**
 * Navbar Component (Skeleton)
 * 
 * Fixed navigation bar with responsive design.
 * Desktop: horizontal menu with links
 * Mobile: hamburger menu with dropdown
 */

'use client';


/**
 * Navbar component for site-wide navigation
 * Appears at the top of every page via root layout
 */
export default function Navbar() {
    /**
     * TODO: Implement Mobile Menu State
     * 
     * Description: Add state management for mobile menu open/close
     * Acceptance Criteria:
     * - [ ] Import useState from React
     * - [ ] Create state variable for menu open (boolean)
     * - [ ] Initialize to false (closed by default)
     * 
     * Resources:
     * - React useState: https://react.dev/reference/react/useState
     * 
     * Estimated Time: 30 minutes
     */

    return (
        <nav className="fixed top-0 left-0 right-0 bg-neu-black text-white px-8 py-4 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/**
         * TODO: Implement Logo/Site Title Link
         * 
         * Description: Create clickable logo that links to home page
         * Acceptance Criteria:
         * - [ ] Use Next.js Link component
         * - [ ] Link to home page (href="/")
         * - [ ] Display SITE_CONFIG.name as text
         * - [ ] Add hover effect (color change to teal)
         * - [ ] Include transition for smooth color change
         * - [ ] Future: replace text with image when logo is ready
         * 
         * Resources:
         * - Next.js Link: https://nextjs.org/docs/app/api-reference/components/link
         * 
         * Estimated Time: 45 minutes
         */}
                <div className="text-2xl font-bold">
                    {/* Logo/Title link here */}
                </div>

                {/**
         * TODO: Implement Desktop Navigation Menu
         * 
         * Description: Render horizontal list of navigation links (hidden on mobile)
         * Acceptance Criteria:
         * - [ ] Create unordered list with flex layout
         * - [ ] Hide on mobile (hidden md:flex)
         * - [ ] Add gap between items (gap-8)
         * - [ ] Map over NAV_LINKS array
         * - [ ] Each link uses Next.js Link component
         * - [ ] Links have hover effect (text-colorstack-teal on hover)
         * - [ ] Add smooth transition
         * 
         * Hint: NAV_LINKS is an array of objects with href and label
         * 
         * Resources:
         * - Array.map(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         * 
         * Estimated Time: 1 hour
         */}
                <ul className="hidden md:flex gap-8">
                    {/* Desktop navigation links here */}
                </ul>

                {/**
         * TODO: Implement Mobile Menu Button
         * 
         * Description: Hamburger button that toggles mobile menu (visible only on mobile)
         * Acceptance Criteria:
         * - [ ] Show on mobile, hide on desktop (md:hidden)
         * - [ ] Add onClick handler that toggles menu state
         * - [ ] Use button element with appropriate styling
         * - [ ] Display hamburger icon (☰) or three-line SVG
         * - [ ] Add hover effect
         * 
         * Hint: onClick should toggle the state variable you created
         * 
         * Resources:
         * - React Events: https://react.dev/learn/responding-to-events
         * 
         * Estimated Time: 1 hour
         */}
                <button
                    className="md:hidden text-2xl hover:text-colorstack-teal transition-colors"
                >
                    {/* Hamburger icon here */}
                    ☰
                </button>
            </div>

            {/**
       * TODO: Implement Mobile Dropdown Menu
       * 
       * Description: Dropdown menu that appears below navbar on mobile
       * Acceptance Criteria:
       * - [ ] Only render when menu state is true (conditional rendering)
       * - [ ] Show on mobile only (md:hidden)
       * - [ ] Absolute positioning below navbar
       * - [ ] Full width background (bg-neu-black)
       * - [ ] Map over NAV_LINKS to create menu items
       * - [ ] Each link closes the menu when clicked (onClick handler)
       * - [ ] Add CSS transition for smooth dropdown (transition-all duration-300)
       * - [ ] Links are centered with padding
       * 
       * Hint: Use conditional rendering {isOpen && <div>...</div>}
       * Hint: Each link's onClick should set menu state to false
       * 
       * Resources:
       * - Conditional Rendering: https://react.dev/learn/conditional-rendering
       * 
       * Estimated Time: 2 hours
       */}
            {/* Mobile dropdown menu here */}
        </nav>
    );
}