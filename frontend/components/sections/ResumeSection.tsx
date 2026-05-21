'use client';

import Link from 'next/link';
import { RESUME_PATH, RESUME_TEMPLATES, SAMPLE_RESUMES } from '@/components/sections/resumeSectionData';
import { trackValueEvent, type AssetDownloadName } from '@/lib/analytics';
import { isExternalAssetUrl } from '@/lib/siteAssets';

function SampleCard({ resume }: { resume: (typeof SAMPLE_RESUMES)[0] }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
            <div>
                <p className="font-semibold text-brand-dark text-sm">{resume.label}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{resume.highlights}</p>
            </div>
            {resume.downloadAvailable ? (
                <a
                    href={resume.downloadUrl}
                    download={resume.downloadFileName}
                    onClick={() => trackValueEvent('asset_download', {
                        asset: resumeSampleAsset(resume.id),
                    })}
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-neu-red hover:underline"
                >
                    ↓ Download sample (.docx)
                </a>
            ) : (
                <span className="mt-auto text-xs font-semibold text-gray-400">Coming soon</span>
            )}
        </div>
    );
}

function TemplateButton({ template }: { template: (typeof RESUME_TEMPLATES)[0] }) {
    const external = isExternalAssetUrl(template.url);
    const downloadName =
        'downloadFileName' in template && template.downloadFileName
            ? template.downloadFileName
            : undefined;

    return (
        <a
            href={template.url}
            {...(downloadName ? { download: downloadName } : {})}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            onClick={() => {
                if (downloadName) {
                    trackValueEvent('asset_download', {
                        asset: 'navigate_template',
                    });
                    return;
                }

                trackValueEvent('outbound_click', {
                    asset: 'jakes_resume_overleaf',
                });
            }}
            className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-neu-red group transition-colors"
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-brand-dark group-hover:text-neu-red transition-colors">
                        {template.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-neu-red/10 text-neu-red">
                        {template.badge}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{template.note}</p>
            </div>
            <span className="text-gray-400 group-hover:text-neu-red transition-colors shrink-0">
                {downloadName ? '↓' : '→'}
            </span>
        </a>
    );
}

function resumeSampleAsset(id: number): AssetDownloadName {
    switch (id) {
        case 1:
            return 'resume_sample_1';
        case 2:
            return 'resume_sample_2';
        case 3:
            return 'resume_sample_3';
        case 4:
            return 'resume_sample_4';
        default:
            return 'resume_sample_1';
    }
}

type ResumeSectionProps = {
    embedded?: boolean;
};

export default function ResumeSection({ embedded = false }: ResumeSectionProps) {
    return (
        <section className={embedded ? 'py-12' : 'py-16 bg-white'}>
            <div className="container-custom max-w-5xl">
                <div className="text-center mb-10">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-neu-red mb-2">Resume Resources</p>
                    <h2 className="font-display text-3xl font-bold text-brand-dark mb-3">
                        Your resume roadmap, no internship required
                    </h2>
                    <p className="text-gray-500 text-sm max-w-lg mx-auto">
                        Most freshmen think they need internship experience first. They don&apos;t. Here&apos;s the actual path.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-12 relative">
                    <div className="absolute hidden md:block top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200" aria-hidden="true" />

                    {RESUME_PATH.map((step) => (
                        <div key={step.step} className="flex flex-col items-center text-center px-4">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-neu-red flex items-center justify-center text-white font-bold text-lg mb-3 shrink-0">
                                {step.step}
                            </div>
                            <p className="font-semibold text-brand-dark text-sm mb-1">{step.action}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.note}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-100">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Sample freshman resumes</p>
                        <div className="grid grid-cols-2 gap-3">
                            {SAMPLE_RESUMES.map((resume) => (
                                <SampleCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Templates to copy</p>
                        <div className="space-y-3">
                            {RESUME_TEMPLATES.map((template) => (
                                <TemplateButton key={template.id} template={template} />
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-4 italic">
                            All samples are anonymized. However, they come from real people and their experience is real.
                        </p>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-10">
                    Looking for interview guides?{' '}
                    <Link href="/browse" className="font-semibold text-brand-dark hover:text-neu-red underline underline-offset-2">
                        Browse all guides
                    </Link>
                </p>
            </div>
        </section>
    );
}

