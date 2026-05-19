import Link from 'next/link';
import type { FaqItem } from '@/lib/faqContent';

const INLINE_LINK_PATTERN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
const MARKDOWN_LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

const linkClassName =
    'font-semibold text-brand-dark underline underline-offset-2 hover:opacity-80';

/** Renders FAQ answer text with **bold**, [links](/path), and optional CTA link. */
export default function FaqAnswer({ item }: { item: FaqItem }) {
    const parts = item.answer.split(INLINE_LINK_PATTERN);

    return (
        <div className="text-gray-700 text-base leading-relaxed">
            <p>
                {parts.map((part, index) => {
                    const linkMatch = part.match(MARKDOWN_LINK);
                    if (linkMatch) {
                        const [, label, href] = linkMatch;
                        if (href.startsWith('mailto:')) {
                            return (
                                <a key={index} href={href} className={linkClassName}>
                                    {label}
                                </a>
                            );
                        }
                        if (href.startsWith('http')) {
                            return (
                                <a
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkClassName}
                                >
                                    {label}
                                </a>
                            );
                        }
                        return (
                            <Link key={index} href={href} className={linkClassName}>
                                {label}
                            </Link>
                        );
                    }
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                            <strong key={index} className="font-semibold text-brand-dark">
                                {part.slice(2, -2)}
                            </strong>
                        );
                    }
                    return <span key={index}>{part}</span>;
                })}
            </p>
            {item.link && (
                <p className="mt-3">
                    {item.link.href.startsWith('http') ? (
                        <a
                            href={item.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neu-red font-semibold underline underline-offset-2 hover:opacity-80"
                        >
                            {item.link.label} →
                        </a>
                    ) : (
                        <Link
                            href={item.link.href}
                            className="text-neu-red font-semibold underline underline-offset-2 hover:opacity-80"
                        >
                            {item.link.label} →
                        </Link>
                    )}
                </p>
            )}
        </div>
    );
}
