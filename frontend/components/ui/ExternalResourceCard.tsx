/**
 * [DEMO UI ENHANCEMENTS - Phase 1]
 * 
 * ExternalResourceCard Component
 * 
 * Displays a clickable card that links to external resources.
 * Opens in new tab with external badge and animated arrow indicator.
 * 
 * Quick visual improvements for demo presentation.
 * Production implementation would require:
 * - Comprehensive accessibility audit
 * - Design system integration (shadcn/ui, Radix, etc.)
 * - User research and A/B testing
 */

import { ExternalResourceCardProps } from '@/lib/types';
import { getCategoryColor } from '@/lib/utils';

export default function ExternalResourceCard({ resource }: ExternalResourceCardProps) {
    // Get Tailwind class for category border color
    const borderColorClass = getCategoryColor(resource.category);

    return (
        <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                group
                relative block 
                bg-white rounded-xl p-8 
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)]
                transition-all duration-300 ease-out
                border-t-[5px] ${borderColorClass}
                cursor-pointer
            `}
        >
            {/* External Badge */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-colorstack-orange text-white uppercase tracking-wide">
                {resource.badge || 'External Link'}
            </span>

            {/* Resource Title */}
            <h4 className="text-2xl font-semibold mb-3 text-neu-black mt-4 group-hover:text-neu-red transition-colors duration-200">
                {resource.title}
            </h4>

            {/* Resource Description */}
            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {resource.description}
            </p>

            {/* Card Footer with URL and Arrow */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-gray-100">
                <span className="text-sm text-colorstack-teal font-medium group-hover:text-colorstack-orange transition-colors duration-200">
                    {resource.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                </span>
                <span className="text-2xl text-colorstack-teal group-hover:text-colorstack-orange transition-all duration-300 group-hover:translate-x-2">
                    →
                </span>
            </div>
        </a>
    );
}