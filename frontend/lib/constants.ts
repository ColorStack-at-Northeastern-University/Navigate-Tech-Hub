/**
 * Global constants and configuration for Navigate Tech Hub
 * Centralized source of truth for colors, categories, and site metadata
 */

import { ResourceCategory } from './types';

/**
 * Brand color palette
 * ColorStack + Northeastern University colors
 */
export const COLORS = {
    colorstackTeal: '#3DA39B',
    colorstackOrange: '#FCB432',
    neuRed: '#D41B2C',
    neuBlack: '#000000',
    neuGray: '#C0C0C0',
    neuLightgray: '#E8E8E8',
    white: '#FFFFFF',
} as const;

/**
 * Category metadata for routing and display
 * Each category maps to a top-level route and has associated styling
 */
export const CATEGORIES: Array<{
    slug: ResourceCategory;
    label: string;
    color: string;
    description: string;
}> = [
        {
            slug: 'interview-prep',
            label: 'Interview Prep',
            color: 'neu-red',
            description: 'Technical and behavioral interview preparation',
        },
        {
            slug: 'classes',
            label: 'Classes',
            color: 'colorstack-teal',
            description: 'Course selection and academic guidance',
        },
        {
            slug: 'projects',
            label: 'Projects',
            color: 'colorstack-orange',
            description: 'Portfolio building and project ideas',
        },
        {
            slug: 'hackathons',
            label: 'Hackathons',
            color: 'neu-black',
            description: 'Hackathon strategies and resources',
        },
        {
            slug: 'community',
            label: 'Community',
            color: 'neu-gray',
            description: 'Networking and community building',
        },
    ];

/**
 * Difficulty level metadata for resource badges
 * Maps difficulty to display label and color styling
 */
export const DIFFICULTY_LEVELS = {
    beginner: {
        label: 'Beginner',
        color: 'bg-green-500',
    },
    intermediate: {
        label: 'Intermediate',
        color: 'bg-colorstack-orange',
    },
    advanced: {
        label: 'Advanced',
        color: 'bg-neu-red',
    },
} as const;

/**
 * Site-wide configuration and metadata
 */
export const SITE_CONFIG = {
    name: 'Navigate Tech Hub',
    tagline: 'Your one-stop resource hub for Black and Latinx CS students at Northeastern University',
    description: 'A student-led initiative providing curated resources, guides, and community support for Black and Latinx computer science students at Northeastern University.',
    url: 'https://navigate-tech-hub.vercel.app', // subject to change
    social: {
        linkedin: 'https://www.linkedin.com/company/colorstackneu/',
        instagram: 'https://www.instagram.com/colorstackneu/',
        github: 'https://github.com/ColorStack-at-Northeastern-University/Navigate-Tech-Hub',
    },
    footer: {
        copyright: '2025 Navigate Tech Hub — Northeastern University x ColorStack',
        tagline: 'Built by students, for students',
    },
} as const;

/**
 * National ColorStack organization (not the NEU chapter).
 * Used for footer, about copy, and 404 helper links.
 */
export const NATIONAL_COLORSTACK = {
    website: 'https://www.colorstack.org',
    becomeMember: 'https://www.colorstack.org/member-application-requirements',
    getInvolved: 'https://www.colorstack.org/get-involved',
} as const;

/**
 * URL for “Suggest a resource” (Google Form, Typeform, etc.).
 * Set NEXT_PUBLIC_SUBMIT_RESOURCE_URL in .env for production; otherwise falls back to a GitHub issue template.
 */
export function getSubmitResourceUrl(): string {
    const fromEnv = process.env.NEXT_PUBLIC_SUBMIT_RESOURCE_URL?.trim();
    if (fromEnv) {
        return fromEnv;
    }
    const base = SITE_CONFIG.social.github;
    const title = encodeURIComponent('Suggest a resource');
    return `${base}/issues/new?labels=content&title=${title}`;
}

/**
 * Navigation links for header menu
 * Subject to expansion
 */
export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/external-resources', label: 'External Resources' },
    { href: '/about', label: 'About' }, // subject to change to add a more detailed about section or "meet the team"
] as const;

/**
 * API Configuration (Strapi Integration)
 * The Strapi URL is used by lib/strapi.ts for all API calls.
 * No API token is needed for public reads (Public role has find/findOne).
 */
export const API_CONFIG = {
    strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
} as const;