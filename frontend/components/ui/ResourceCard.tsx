import { ResourceCardProps } from '@/lib/types';
import { resourceCardFreshnessText } from '@/lib/utils';
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

    const freshness = resourceCardFreshnessText(resource.publishedDate, resource.lastUpdated);

    return (
        <Link
            href={href}
            className="relative block bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 border-t-[3px] border-neu-red cursor-pointer"
        >
            {resource.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-neu-red text-white uppercase tracking-wide">
                    Featured
                </span>
            )}

            {showCategory && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-gray-800 text-white">
                    {resource.category}
                </span>
            )}

            {/* Resource Title — extra top padding when badges occupy corners */}
            <h4
                className={`text-2xl font-semibold mb-3 text-neu-black ${
                    resource.featured || showCategory ? 'pt-6' : ''
                }`}
            >
                {resource.title}
            </h4>

            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {resource.description}
            </p>

            {/* Resource Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                {(resource.tags ?? []).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>

            {freshness && (
                <p className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">{freshness}</p>
            )}
        </Link>
    );
}