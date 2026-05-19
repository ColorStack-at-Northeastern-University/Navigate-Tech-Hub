import FaqPageContent from '@/components/faq/FaqPageContent';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import CircuitPattern from '@/components/ui/CircuitPattern';
import { FAQ_QUICK_ANSWERS, FAQ_SECTIONS } from '@/lib/faqContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | Navigate Tech Hub',
    description:
        'Who Navigate Tech Hub is for, how to use guides and the external directory, how content is written, and how to contribute.',
};

function buildFaqJsonLd() {
    const allItems = [
        ...FAQ_QUICK_ANSWERS,
        ...FAQ_SECTIONS.flatMap((s) => s.items),
    ];
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer.replace(/\*\*/g, ''),
            },
        })),
    };
}

export default function FaqPage() {
    const jsonLd = buildFaqJsonLd();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="mt-16">
                <section className="pt-16 pb-12 bg-[#AA0F15] relative overflow-hidden">
                    <CircuitPattern />
                    <div className="container-custom !py-0 relative z-10">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                            Frequently asked questions
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                            How the hub works, who it is for, and how you can trust (or improve) what you read.
                        </p>
                    </div>
                </section>
                <FaqPageContent />
                <div className="container-custom pt-0 pb-8">
                    <p className="text-[#de0911] text-3xl md:text-4xl font-bold">&lt;/&gt;</p>
                </div>
            </main>
            <Footer />
        </>
    );
}
