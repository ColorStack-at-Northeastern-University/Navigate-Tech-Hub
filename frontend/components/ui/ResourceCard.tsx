import { ResourceCardProps } from '@/lib/types';
import { getCategoryColor } from '@/lib/utils';
import Link from 'next/link';
import Tag from './Tag';

/**
 * ResourceCard Component
 * 
 * Displays a clickable card for a resource with title, description, tags, and category badge.
 * Uses dynamic border color based on resource category.
 */
export default function ResourceCard({ resource, showCategory = false }: ResourceCardProps) {
    // Build dynamic route path
    const href = `/${resource.category}/${resource.slug}`;

    // Get Tailwind class for category border color
    const borderColorClass = getCategoryColor(resource.category);

    return (
        <Link
            href={href}
            className={`
                relative block 
                bg-white rounded-xl p-8 
                shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]
                transition-all duration-300
                border-t-[5px] ${borderColorClass}
                cursor-pointer
            `}
        >
            {/* Optional Category Badge */}
            {showCategory && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-colorstack-orange text-white">
                    {resource.category}
                </span>
            )}

            {/* Resource Title */}
            <h4 className="text-2xl font-semibold mb-3 text-neu-black">
                {resource.title}
            </h4>

            {/* Resource Description */}
            <p className="text-gray-600 mb-4 leading-relaxed">
                {resource.description}
            </p>

            {/* Resource Tags */}
            <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        </Link>
    );
}