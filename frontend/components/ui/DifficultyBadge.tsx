/**
 * DifficultyBadge Component (Skeleton) BRYCE
 * 
 * Displays a colored badge indicating resource difficulty level.
 * Used on article pages and resource cards (optional).
 */

import { DifficultyLevel } from '@/lib/types';

interface DifficultyBadgeProps {
    difficulty: DifficultyLevel;
}

/**
 * DifficultyBadge component
 * 
 * @param {DifficultyLevel} difficulty - beginner, intermediate, or advanced
 * 
 * @example
 * <DifficultyBadge difficulty="intermediate" />
 */
export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
    /**
     * TODO: Map Difficulty to Colors
     * 
     * Description: Create object mapping difficulty levels to background colors
     * Acceptance Criteria:
     * - [ ] Beginner: Green (#4CAF50)
     * - [ ] Intermediate: Orange (colorstack-orange #FCB432)
     * - [ ] Advanced: Red (neu-red #D41B2C)
     * - [ ] Store in difficultyStyles object
     * 
     * Hint:
     * const difficultyStyles = {
     *   beginner: 'bg-[#4CAF50]',
     *   intermediate: 'bg-colorstack-orange',
     *   advanced: 'bg-neu-red',
     * }
     */
    const difficultyStyles = {
        beginner: '',
        intermediate: '',
        advanced: '',
    }; // Map difficulty to colors here

    /**
     * TODO: Capitalize Difficulty Label
     * 
     * Description: Convert difficulty string to capitalized display text
     * Acceptance Criteria:
     * - [ ] "beginner" → "Beginner"
     * - [ ] "intermediate" → "Intermediate"
     * - [ ] "advanced" → "Advanced"
     * 
     * Hint: difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
     */
    const label = difficulty; // Capitalize difficulty here

    /**
     * TODO: Render Badge
     * 
     * Description: Create styled span element with difficulty label
     * Acceptance Criteria:
     * - [ ] Span element with rounded pill shape
     * - [ ] White text
     * - [ ] Padding for comfortable size
     * - [ ] Background color based on difficulty
     * - [ ] Medium font weight
     * 
     * Hint: className={`${difficultyStyles[difficulty]} text-white px-4 py-1 rounded-full text-sm font-semibold`}
     */
    return (
        <span className={`text-white px-4 py-1 rounded-full text-sm font-semibold`}>
            {/* Display label here */}
        </span>
    );
}