import { ExternalResourceCardProps } from '@/lib/types';
import { getCategoryColor } from '@/lib/utils';

/**
 * ExternalResourceCard Component
 * 
 * Displays a clickable card that links to external resources.
 * Opens in new tab with external badge and animated arrow indicator.
 */
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
                shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]
                transition-all duration-300
                border-t-[5px] ${borderColorClass}
                cursor-pointer
            `}
        >
            {/* External Badge */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-colorstack-orange text-white uppercase tracking-wide">
                {resource.badge || 'External Link'}
            </span>

            {/* Resource Title */}
            <h4 className="text-2xl font-semibold mb-3 text-neu-black mt-4">
                {resource.title}
            </h4>

            {/* Resource Description */}
            <p className="text-gray-600 mb-4 leading-relaxed">
                {resource.description}
            </p>

            {/* Card Footer with URL and Arrow */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-colorstack-teal font-medium">
                    {resource.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                </span>
                <span className="text-2xl text-colorstack-teal transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            </div>
        </a>
    );
}