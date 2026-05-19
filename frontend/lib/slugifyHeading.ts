import type { ReactNode } from 'react';

/** Stable id for in-article heading anchors (display text → URL fragment). */
export function slugifyHeadingText(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function headingTextFromChildren(children: ReactNode): string {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    if (Array.isArray(children)) {
        return children.map((child) => headingTextFromChildren(child)).join('');
    }
    return '';
}
