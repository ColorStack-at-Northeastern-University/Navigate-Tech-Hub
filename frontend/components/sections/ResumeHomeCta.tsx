import Link from 'next/link';

const CTA_BUTTON_OUTLINE =
    'inline-flex px-6 py-2.5 border-2 border-neu-red text-neu-red rounded-full text-sm font-semibold hover:bg-neu-red hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2';

/** Homepage resume callout (outline CTA). */
export default function ResumeHomeCta() {
    return (
        <section className="w-full max-w-2xl text-center py-6 border-t border-gray-100">
            <h3 className="font-display text-lg font-bold text-brand-dark mb-2">
                Confused about your resume?
            </h3>
            <p className="text-sm text-gray-600 mb-4">No internship required. Start with the roadmap and samples.</p>
            <Link href="/resume" className={CTA_BUTTON_OUTLINE}>
                Resume roadmap & samples →
            </Link>
        </section>
    );
}
