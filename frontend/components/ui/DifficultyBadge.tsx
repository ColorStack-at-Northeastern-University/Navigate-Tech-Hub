/**
 * DifficultyBadge Component
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
    const difficultyStyles = {
        beginner: 'bg-[#4CAF50]',
        intermediate: 'bg-colorstack-orange',
        advanced: 'bg-neu-red',
    };

    const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    return (
        <span className={`${difficultyStyles[difficulty]} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
            {label}
        </span>
    );
}