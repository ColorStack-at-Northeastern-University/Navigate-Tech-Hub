import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ResumeSection from '@/components/sections/ResumeSection';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Resume Resources | Navigate Tech Hub',
    description:
        'Sample freshman and sophomore resumes, templates, and a path to a strong resume without internship experience.',
};

export default function ResumePage() {
    return (
        <>
            <Navbar />
            <main className="mt-16">
                <section className="bg-gray-50 border-b border-gray-200 py-12">
                    <div className="container-custom max-w-3xl">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-neu-red mb-3">Resume</p>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-3">
                            Build a resume before you have an internship
                        </h1>
                        <p className="text-gray-600 leading-relaxed max-w-2xl">
                            Use the roadmap, download a sample,
                            and copy a template. No internship required to get started.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Also on the{' '}
                            <Link href="/faq#quick-answers" className="font-semibold text-brand-dark hover:text-neu-red underline underline-offset-2">
                                FAQ
                            </Link>
                            {' '}and linked from interview prep guides as we publish them.
                        </p>
                    </div>
                </section>
                <ResumeSection embedded />
            </main>
            <Footer />
        </>
    );
}
