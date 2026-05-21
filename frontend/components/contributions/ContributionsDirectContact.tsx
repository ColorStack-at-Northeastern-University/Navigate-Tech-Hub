'use client';

import { SITE_CONFIG } from '@/lib/constants';
import { trackValueEvent } from '@/lib/analytics';

export default function ContributionsDirectContact() {
    const { email, prompt } = SITE_CONFIG.directContact;

    return (
        <aside className="mb-10 rounded-xl border border-gray-200 bg-gray-50 px-6 py-5 max-w-2xl">
            <p className="text-base text-gray-800 leading-relaxed">
                <span className="font-semibold text-brand-dark">{prompt}</span>
                {' '}
                Questions about contributing, partnerships, or where to start? Email{' '}
                <a
                    href={`mailto:${email}`}
                    onClick={() => trackValueEvent('contribution_cta_click', {
                        lane: 'contact-email',
                    })}
                    className="text-neu-red font-semibold underline underline-offset-2 hover:opacity-80"
                >
                    {email}
                </a>
                .
            </p>
        </aside>
    );
}
