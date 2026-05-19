/**
 * Canonical paths for static files under `frontend/public/`.
 * Paths are URL paths (leading slash), not filesystem paths.
 *
 * Filesystem mirror: frontend/public{path}
 */
export const SITE_ASSETS = {
    images: {
        navtechhubLogo: '/images/navtechhub-logo.png',
        huskyHead: '/images/husky-head.png',
        colorstackLogoRed: '/images/colorstack-logo-red.png',
        sIcon: '/images/s-icon.png',
    },
    fonts: {
        gothamBlack: '/fonts/gotham-black.otf',
        archerSemibold: '/fonts/archer-semibold.otf',
    },
    resume: {
        navigateTemplate: {
            href: '/assets/resume/navigate-tech-hub-resume-template.docx',
            downloadName: 'navigate-tech-hub-resume-template.docx',
        },
        samples: {
            resume1: {
                href: '/assets/resume/samples/resume-sample-1.docx',
                downloadName: 'resume-sample-1.docx',
            },
            resume2: {
                href: '/assets/resume/samples/resume-sample-2.docx',
                downloadName: 'resume-sample-2.docx',
            },
            resume3: {
                href: '/assets/resume/samples/resume-sample-3.docx',
                downloadName: 'resume-sample-3.docx',
            },
            resume4: {
                href: '/assets/resume/samples/resume-sample-4.docx',
                downloadName: 'resume-sample-4.docx',
            },
        },
    },
} as const;

/** Map URL path → repo path under frontend/public */
export function publicFilePath(urlPath: string): string {
    return `frontend/public${urlPath}`;
}

export function isExternalAssetUrl(href: string): boolean {
    return href.startsWith('http://') || href.startsWith('https://');
}
