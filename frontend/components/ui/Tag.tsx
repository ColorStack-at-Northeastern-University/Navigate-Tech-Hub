/**
 * Tag Component
 * 
 * Displays a small pill-shaped badge for categorization (e.g., "LeetCode", "Career")
 * Used on resource cards and article pages to show tags/categories.
 * 
 * Note: Teal is the primary color and works best with the current design system.
 * Other color variants are available for future design flexibility.
 */

interface TagProps {
    children: string;
    variant?: 'teal' | 'orange' | 'red';
}

/**
 * Tag component for displaying category/topic labels
 * 
 * @param {string} children - The tag text to display
 * @param {string} variant - Color variant (default: 'teal')
 * 
 * @example
 * <Tag>LeetCode</Tag>
 * <Tag variant="orange">Career</Tag>
 */
export default function Tag({ children, variant = 'teal' }: TagProps) {
    // Map variant to Tailwind classes
    const variantStyles = {
        teal: 'bg-colorstack-teal',
        orange: 'bg-colorstack-orange',
        red: 'bg-neu-red',
    };

    return (
        <span
            className={`
        inline-block
        ${variantStyles[variant]}
        text-white
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        transition-colors
        duration-200
      `}
        >
            {children}
        </span>
    );
}