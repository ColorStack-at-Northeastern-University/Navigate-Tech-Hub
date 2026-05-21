'use client';

import { useEffect, useRef } from 'react';
import { trackValueEvent } from '@/lib/analytics';

const ENGAGED_READ_SECONDS = 60;

interface ArticleEngagementTrackerProps {
    category: string;
    slug: string;
}

export default function ArticleEngagementTracker({ category, slug }: ArticleEngagementTrackerProps) {
    const hasTrackedRef = useRef(false);

    useEffect(() => {
        let visibleSeconds = 0;
        const intervalId = window.setInterval(() => {
            if (document.visibilityState !== 'visible' || hasTrackedRef.current) return;

            visibleSeconds += 1;
            if (visibleSeconds < ENGAGED_READ_SECONDS) return;

            hasTrackedRef.current = true;
            trackValueEvent('article_engaged_60s', {
                article: `${category}/${slug}`,
            });
            window.clearInterval(intervalId);
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [category, slug]);

    return null;
}
