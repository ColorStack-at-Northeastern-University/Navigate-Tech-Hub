import { NATIONAL_COLORSTACK, SITE_CONFIG } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export const SOCIAL_LINKS = [
    { id: 'linkedin', label: 'LinkedIn', href: SITE_CONFIG.social.linkedin },
    { id: 'instagram', label: 'Instagram', href: SITE_CONFIG.social.instagram },
    { id: 'github', label: 'GitHub', href: SITE_CONFIG.social.github },
] as const;

export const FOOTER_HUB_LINKS = [
    { label: 'FAQ', href: '/faq' },
    { label: 'Suggest a resource', href: '/suggest-resource' },
    { label: 'Contributions', href: '/contributions' },
] as const;

export const FOOTER_COLORSTACK_LINKS = [
    { label: 'ColorStack (National)', href: NATIONAL_COLORSTACK.website },
    { label: 'Become a member', href: NATIONAL_COLORSTACK.becomeMember },
    { label: 'Get involved', href: NATIONAL_COLORSTACK.getInvolved },
] as const;

export function FooterCopyright({ centered = false }: { centered?: boolean }) {
    return (
        <div className={`flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
            <Image src="/images/s-icon.png" alt="" width={24} height={24} />
            <p className="text-neu-gray text-base leading-snug">{SITE_CONFIG.footer.copyright}</p>
        </div>
    );
}

export function DirectContactLink({ className = '' }: { className?: string }) {
    const { email, prompt } = SITE_CONFIG.directContact;
    return (
        <a href={`mailto:${email}`} className={`group inline-flex flex-col gap-0.5 ${className}`}>
            <span className="text-base font-semibold text-white group-hover:text-neu-red transition-colors">
                {prompt}
            </span>
            <span className="text-base text-neu-gray group-hover:text-white transition-colors group-hover:underline underline-offset-2">
                {email}
            </span>
        </a>
    );
}

function SocialIcon({ id }: { id: (typeof SOCIAL_LINKS)[number]['id'] }) {
    const className = 'h-5 w-5 shrink-0';
    if (id === 'linkedin') {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        );
    }
    if (id === 'instagram') {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        );
    }
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

export function SocialLinksRow({
    iconOnly = false,
    className = '',
}: {
    iconOnly?: boolean;
    className?: string;
}) {
    return (
        <ul className={`flex flex-wrap items-center gap-4 ${className}`}>
            {SOCIAL_LINKS.map(({ id, label, href }) => (
                <li key={id}>
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                            iconOnly
                                ? 'flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 text-neu-gray hover:border-neu-red hover:text-white transition-colors'
                                : 'inline-flex items-center gap-2.5 text-base text-neu-gray hover:text-white transition-colors'
                        }
                        aria-label={label}
                    >
                        <SocialIcon id={id} />
                        {!iconOnly && <span>{label}</span>}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function FooterHubLinksRow() {
    return (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
            {FOOTER_HUB_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className="text-neu-red hover:text-white font-medium transition-colors">
                    {label}
                </Link>
            ))}
            {FOOTER_COLORSTACK_LINKS.map(({ label, href }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neu-gray hover:text-white transition-colors"
                >
                    {label}
                </a>
            ))}
        </div>
    );
}
