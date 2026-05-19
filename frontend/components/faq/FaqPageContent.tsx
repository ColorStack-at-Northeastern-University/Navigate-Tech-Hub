import { FAQ_JUMP_LINKS, FAQ_QUICK_ANSWERS, FAQ_SECTIONS } from '@/lib/faqContent';
import FaqAccordionItem from './FaqAccordionItem';
import FaqAnswer from './FaqAnswer';

export default function FaqPageContent() {
    return (
        <div className="container-custom py-12">
            <p className="text-gray-600 text-lg max-w-3xl mb-8 leading-relaxed">
                Straight answers about who we are, how to use the hub, and how content gets made.
                For mission and story, see{' '}
                <a href="/about" className="text-neu-red font-semibold underline underline-offset-2 hover:opacity-80">
                    About
                </a>
                .
            </p>

            <nav
                aria-label="FAQ sections"
                className="mb-10 flex flex-wrap gap-2 md:gap-3"
            >
                {FAQ_JUMP_LINKS.map(({ id, label }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-dark hover:border-neu-red hover:text-neu-red transition-colors"
                    >
                        {label}
                    </a>
                ))}
            </nav>

            <section id="quick-answers" className="scroll-mt-28 mb-14" aria-labelledby="quick-answers-heading">
                <h2
                    id="quick-answers-heading"
                    className="font-display text-2xl font-bold text-brand-dark mb-6 pb-2 border-b-[3px] border-neu-red inline-block"
                >
                    Quick answers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FAQ_QUICK_ANSWERS.map((item) => (
                        <article
                            key={item.id}
                            id={item.id}
                            className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[3px] border-neu-red scroll-mt-28"
                        >
                            <h3 className="font-display text-lg font-bold text-brand-dark mb-3">{item.question}</h3>
                            <FaqAnswer item={item} />
                        </article>
                    ))}
                </div>
            </section>

            {FAQ_SECTIONS.map((section) => (
                <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 mb-12"
                    aria-labelledby={`${section.id}-heading`}
                >
                    <h2
                        id={`${section.id}-heading`}
                        className="font-display text-2xl font-bold text-brand-dark mb-2 pb-2 border-b-[3px] border-neu-red inline-block"
                    >
                        {section.title}
                    </h2>
                    <div className="bg-white rounded-xl px-6 md:px-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-100 mt-6">
                        {section.items.map((item) => (
                            <FaqAccordionItem key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            ))}

            <p className="text-sm text-gray-500 mt-8">
                Last reviewed: May 2026. Questions missing? Email us from the footer or open an issue on GitHub.
            </p>
        </div>
    );
}
