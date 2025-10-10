/**
 * ResourceCard Component (Skeleton)
 * 
 * Displays a single resource as a clickable card with title, description, and tags.
 * Used on the Browse page and Home page featured section.
 */

import { ResourceCardProps } from '@/lib/types';
import Link from 'next/link';

/**
 * ResourceCard component for displaying article previews
 * 
 * @param {Resource} resource - The resource data to display
 * @param {boolean} showCategory - Whether to show category badge (optional)
 */
export default function ResourceCard({ resource, showCategory = false }: ResourceCardProps) {
    /**
     * TODO: Build Dynamic Route Path
     * 
     * Description: Construct the URL path for the resource detail page
     * Acceptance Criteria:
     * - [ ] Create path string in format: /{category}/{slug}
     * - [ ] Use resource.category and resource.slug
     * - [ ] Example: /interview-prep/leetcode-patterns-guide
     * 
     * Hint: Use template literals `/${resource.category}/${resource.slug}`
     * 
     * Estimated Time: 10 minutes
     */
    const href = ''; // Build href here

    /**
     * TODO: Get Dynamic Border Color
     * 
     * Description: Determine border color class based on resource category
     * Acceptance Criteria:
     * - [ ] Call getCategoryColor() utility function
     * - [ ] Pass resource.category as argument
     * - [ ] Store result in variable
     * 
     * Hint: getCategoryColor(resource.category)
     * 
     * Estimated Time: 5 minutes
     */
    const borderColor = ''; // Get border color here

    return (
        /**
         * TODO: Implement ResourceCard as Link Wrapper
         * 
         * Description: Wrap entire ResourceCard in Next.js Link for navigation
         * Acceptance Criteria:
         * - [ ] Use Link component with href prop
         * - [ ] Include all card styling classes
         * - [ ] Add dynamic border color class
         * - [ ] Ensure hover effects work (lift and shadow)
         * 
         * Resources:
         * - Next.js Link: https://nextjs.org/docs/app/api-reference/components/link
         * 
         * Estimated Time: 15 minutes
         */
        <Link
            href={href}
            className={`
        block bg-white rounded-xl p-8 shadow-card
        border-t-[5px] ${borderColor}
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-card-hover
        cursor-pointer
      `}
        >
            {/**
       * TODO: Display Resource Title
       * 
       * Description: Render the resource title as heading
       * Acceptance Criteria:
       * - [ ] Use h3 or h4 element
       * - [ ] Display resource.title
       * - [ ] Style with appropriate text size and weight
       * - [ ] Add bottom margin
       * 
       * Estimated Time: 10 minutes
       */}
            <h4 className="text-2xl font-semibold mb-3 text-neu-black">
                {/* Display title here */}
            </h4>

            {/**
       * TODO: Display Resource Description
       * 
       * Description: Render the short description for the ResourceCard
       * Acceptance Criteria:
       * - [ ] Use paragraph element
       * - [ ] Display resource.description
       * - [ ] Use gray text color
       * - [ ] Add bottom margin
       * 
       * Estimated Time: 10 minutes
       */}
            <p className="text-gray-600 mb-4 leading-relaxed">
                {/* Display description here */}
            </p>

            {/**
       * TODO: Render Tags
       * 
       * Description: Display all tags associated with the resource
       * Acceptance Criteria:
       * - [ ] Create flex container with wrap and gap
       * - [ ] Map over resource.tags array
       * - [ ] Render Tag component for each tag
       * - [ ] Pass tag text as children prop
       * - [ ] Include unique key prop for each Tag
       * 
       * Hint: resource.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
       * 
       * Resources:
       * - Lists and Keys: https://react.dev/learn/rendering-lists
       * 
       * Estimated Time: 90 minutes
       */}
            <div className="flex flex-wrap gap-2">
                {/* Map over tags here */}
            </div>

            {/**
       * TODO (Optional): Display Category Badge
       * 
       * Description: Show category badge if showCategory prop is true
       * Acceptance Criteria:
       * - [ ] Use conditional rendering with showCategory prop
       * - [ ] Display resource.category in a styled badge
       * - [ ] Position in top-right corner (absolute positioning)
       * - [ ] Style with appropriate colors
       * 
       * Note: This is optional for Sprint 1, can implement in Sprint 2
       * 
       * Estimated Time: 60 minutes
       */}
        </Link>
    );
}