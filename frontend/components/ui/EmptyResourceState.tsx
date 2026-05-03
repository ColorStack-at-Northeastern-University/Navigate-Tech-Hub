import Link from 'next/link';

export interface EmptyStateLink {
    href: string;
    label: string;
    external?: boolean;
}

interface EmptyResourceStateProps {
    title: string;
    body: string;
    links?: EmptyStateLink[];
}

/**
 * Shared empty state for lists that load from Strapi (featured, category, browse, external).
 */
export default function EmptyResourceState({ title, body, links }: EmptyResourceStateProps) {
    return (
        <div
            className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm mb-16 max-w-2xl mx-auto"
            role="status"
            aria-live="polite"
        >
            <h2 className="text-xl font-semibold text-neu-black mb-3">{title}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{body}</p>
            {links && links.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-neu-red">
                    {links.map((link) => (
                        <li key={`${link.href}-${link.label}`}>
                            {link.external ? (
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:opacity-80"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link href={link.href} className="underline hover:opacity-80">
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
