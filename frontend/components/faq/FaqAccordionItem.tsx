import FaqAnswer from './FaqAnswer';
import type { FaqItem } from '@/lib/faqContent';

export default function FaqAccordionItem({ item }: { item: FaqItem }) {
    return (
        <details
            id={item.id}
            className="group border-b border-gray-200 last:border-b-0 scroll-mt-28"
        >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-brand-dark text-base md:text-lg hover:text-neu-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2 rounded-sm [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-neu-red text-xl leading-none group-open:rotate-45 transition-transform"
                    aria-hidden
                >
                    +
                </span>
            </summary>
            <div className="pb-5 pr-2 md:pr-12">
                <FaqAnswer item={item} />
            </div>
        </details>
    );
}
