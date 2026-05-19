'use client';

import { useState } from 'react';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const TIER_OPTIONS = [
    { value: 'tools-and-communities', label: 'Tools & Communities  -  stable homepage (NeetCode, ColorStack, etc.)' },
    { value: 'recurring-program', label: 'Recurring Program  -  named program that runs every year' },
    { value: 'unsure', label: "I'm not sure" },
];

const CATEGORY_OPTIONS = [
    { value: 'interview-prep', label: 'Interview Prep' },
    { value: 'projects', label: 'Projects & Portfolio' },
    { value: 'community', label: 'Community & Networking' },
    { value: 'hackathons', label: 'Hackathons' },
    { value: 'classes', label: 'Learning Platforms' },
    { value: 'programs', label: 'Programs (fellowships, early-career, insight events)' },
    { value: 'unsure', label: "I'm not sure" },
];

/**
 * Structured suggestion form  -  enforces schema-like fields so the resulting
 * GitHub Issue has enough context for editorial review.
 */
export default function SuggestResourceForm() {
    const [state, setState] = useState<SubmitState>('idle');
    const [issueUrl, setIssueUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setState('submitting');
        setErrorMessage('');

        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const res = await fetch('/api/suggest-resource', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const body = await res.json() as { issueUrl?: string; error?: string };
            if (!res.ok) {
                if (res.status === 429) {
                    throw new Error('Too many suggestions from this network. Please wait and try again later.');
                }
                throw new Error(body.error ?? 'Unknown error');
            }
            setIssueUrl(body.issueUrl ?? null);
            setState('success');
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
            setState('error');
        }
    }

    if (state === 'success') {
        return (
            <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                <p className="text-2xl mb-3">✓</p>
                <h2 className="font-display text-xl font-semibold text-green-800 mb-2">
                    Suggestion received
                </h2>
                <p className="text-green-700 text-sm mb-4">
                    We review suggestions weekly. Thanks for helping improve the directory.
                </p>
                {issueUrl && (
                    <a
                        href={issueUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neu-red underline underline-offset-2"
                    >
                        View your submission on GitHub →
                    </a>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <Field label="Resource name" htmlFor="resourceName" required>
                <input
                    id="resourceName"
                    name="resourceName"
                    type="text"
                    required
                    placeholder="e.g. Jane Street JSIP"
                    className={inputClass}
                />
            </Field>

            <Field label="URL" htmlFor="url" required hint="Link to the homepage or program landing page  -  not a specific job posting.">
                <input
                    id="url"
                    name="url"
                    type="url"
                    required
                    placeholder="https://..."
                    className={inputClass}
                />
            </Field>

            <Field label="Directory tier" htmlFor="suggestedTier">
                <select id="suggestedTier" name="suggestedTier" className={inputClass} defaultValue="unsure">
                    {TIER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </Field>

            <Field label="Category" htmlFor="suggestedCategory">
                <select id="suggestedCategory" name="suggestedCategory" className={inputClass} defaultValue="unsure">
                    {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </Field>

            <Field
                label="Why it matters"
                htmlFor="whyItMatters"
                required
                hint="Explain who this helps and why it should be in the directory. At least a sentence."
            >
                <textarea
                    id="whyItMatters"
                    name="whyItMatters"
                    rows={4}
                    required
                    placeholder="This helps first-year students who... It's better than existing listings because..."
                    className={`${inputClass} resize-y`}
                />
            </Field>

            <Field
                label="Your contact (optional)"
                htmlFor="contact"
                hint="Discord handle, email, or GitHub username  -  only for follow-up questions."
            >
                <input
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder="e.g. @handle or name@email.com"
                    className={inputClass}
                />
            </Field>

            {state === 'error' && (
                <p className="text-sm text-red-600 rounded border border-red-200 bg-red-50 px-4 py-3">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={state === 'submitting'}
                className="self-start px-8 py-3 bg-neu-red text-white font-semibold rounded-full hover:bg-red-700 disabled:opacity-60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
            >
                {state === 'submitting' ? 'Submitting…' : 'Submit suggestion'}
            </button>
        </form>
    );
}

function Field({
    label,
    htmlFor,
    required,
    hint,
    children,
}: {
    label: string;
    htmlFor: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={htmlFor} className="text-sm font-semibold text-brand-dark">
                {label}
                {required && <span className="text-neu-red ml-0.5">*</span>}
            </label>
            {hint && <p className="text-xs text-gray-500">{hint}</p>}
            {children}
        </div>
    );
}

const inputClass =
    'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neu-red focus:border-transparent transition-shadow';
