'use client';

import { type FormEvent, useState } from 'react';
import { trackValueEvent } from '@/lib/analytics';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface NewsletterSignupProps {
    source: string;
    compact?: boolean;
    className?: string;
}

export default function NewsletterSignup({
    source,
    compact = false,
    className = '',
}: NewsletterSignupProps) {
    const [state, setState] = useState<SubmitState>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState('submitting');
        setErrorMessage('');

        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, source }),
            });
            const body = await response.json() as { error?: string; alreadySubscribed?: boolean };

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Too many signup attempts from this network. Please wait and try again.');
                }
                throw new Error(body.error ?? 'Could not join the update list right now.');
            }

            form.reset();
            setState('success');
            trackValueEvent('newsletter_signup_success', { source });
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
            setState('error');
        }
    }

    if (state === 'success') {
        return (
            <section className={newsletterShellClass(compact, className)} aria-live="polite">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neu-red mb-2">
                    Navigate updates
                </p>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                    You are on the list.
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Watch for the next biweekly Navigate update with new guides, external resources,
                    and recent opportunity drops.
                </p>
            </section>
        );
    }

    return (
        <section className={newsletterShellClass(compact, className)} aria-labelledby={`newsletter-${source}`}>
            <div className={compact ? 'mb-4' : 'mb-5'}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-neu-red mb-2">
                    Biweekly update
                </p>
                <h2 id={`newsletter-${source}`} className="font-display text-2xl font-bold text-brand-dark mb-3">
                    Get the Navigate update.
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                    New student-written guides, curated external resources, and recent opportunity drops.
                    No account required, no spam, unsubscribe anytime. Only twice a month, no surprises, we promise.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
                <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
                    Email address
                </label>
                <input
                    id={`newsletter-email-${source}`}
                    name="email"
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@northeastern.edu"
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neu-red focus:border-transparent transition-shadow"
                />
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                />
                <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="rounded-lg bg-neu-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
                >
                    {state === 'submitting' ? 'Joining...' : 'Join the list'}
                </button>
            </form>

            {state === 'error' && (
                <p className="mt-3 text-sm text-red-600 rounded border border-red-200 bg-red-50 px-4 py-3">
                    {errorMessage}
                </p>
            )}
            <p className="mt-3 text-xs text-gray-500">
                We only send Navigate Tech Hub updates: internal articles, external resources, and the opportunity carousel.
            </p>
        </section>
    );
}

function newsletterShellClass(compact: boolean, className: string): string {
    const base = 'rounded-xl border border-gray-200 bg-white shadow-sm';
    const spacing = compact ? 'p-6' : 'p-8 md:p-10';
    return `${base} ${spacing} ${className}`.trim();
}
