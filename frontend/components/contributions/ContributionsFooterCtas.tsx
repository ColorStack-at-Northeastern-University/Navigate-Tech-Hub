import { CONTRIBUTIONS_FIRST_CONTRIBUTION_URL } from '@/lib/contributions';
import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export default function ContributionsFooterCtas() {
    return (
        <section className="mb-16">
            <div className="bg-white rounded-xl p-10 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[3px] border-neu-red">
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">Code contributions</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    For your first open-source PR ever,{' '}
                    <a
                        href={CONTRIBUTIONS_FIRST_CONTRIBUTION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neu-red font-semibold underline hover:opacity-80"
                    >
                        First Contributions
                    </a>
                    {' '}is a good intro walkthrough.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href={SITE_CONFIG.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2"
                    >
                        GitHub repository
                    </Link>
                </div>
            </div>
        </section>
    );
}
