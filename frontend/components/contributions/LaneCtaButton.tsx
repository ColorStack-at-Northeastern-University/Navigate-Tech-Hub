'use client';

import Link from 'next/link';
import { trackValueEvent, type ContributionAnalyticsLane } from '@/lib/analytics';
import type { ContributionLane } from '@/lib/contributions';

type LaneCtaButtonProps = {
    cta: ContributionLane['primaryCta'];
    lane: ContributionAnalyticsLane;
    variant?: 'primary' | 'secondary';
};

export default function LaneCtaButton({ cta, lane, variant = 'primary' }: LaneCtaButtonProps) {
    const className =
        variant === 'primary'
            ? 'bg-neu-red text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center'
            : 'bg-brand-dark text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center';
    const trackContributionClick = () => trackValueEvent('contribution_cta_click', { lane });

    if (cta.external) {
        return (
            <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackContributionClick}
                className={className}
            >
                {cta.label}
            </a>
        );
    }

    return (
        <Link href={cta.href} onClick={trackContributionClick} className={className}>
            {cta.label}
        </Link>
    );
}
