import type { Resource } from '@/lib/types';
import Link from 'next/link';

interface AboutStartHereCardProps {
    article: Resource;
}

/** Start Here nudge — appears in all prototypes when an article is flagged in Strapi. */
export default function AboutStartHereCard({ article }: AboutStartHereCardProps) {
    return (
        <section className="container-custom" aria-labelledby="about-start-here-heading">
            <h2 id="about-start-here-heading" className="font-display text-2xl font-bold text-brand-dark mb-4">
                New here?
            </h2>
            <div className="max-w-lg">
                <Link
                    href={`/${article.category}/${article.slug}`}
                    className="group block bg-white rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[3px] border-neu-red hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
                >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neu-red text-white uppercase tracking-wide mb-3">
                        Start Here
                    </span>
                    <h3 className="font-display text-xl font-bold text-brand-dark mb-2 group-hover:text-neu-red transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.description}</p>
                    <span className="text-sm font-medium text-neu-red">
                        Read guide · {article.timeToReadMinutes} min →
                    </span>
                </Link>
            </div>
        </section>
    );
}
