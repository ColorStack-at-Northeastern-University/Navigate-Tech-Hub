import type { ExternalResource, ProgramType } from '@/lib/types';
import { externalResourceListKey } from '@/lib/utils';
import ExternalResourceCard from './ExternalResourceCard';
import ProgramRemindersExport from './ProgramRemindersExport';
import ProgramTypeBucket from './ProgramTypeBucket';

interface ProgramsSectionProps {
    resources: ExternalResource[];
}

interface ProgramTypeMeta {
    label: string;
    blurb: string;
}

/**
 * Order matters: programType buckets render top-to-bottom in this order.
 * Insight events sit between fellowships and conferences because they bridge
 * the two — short, name-targeted, and often a feeder into pre-internships.
 */
// Conferences are surfaced in MetaSourcesStrip (stable org homepages) rather than
// here — recurring program card URLs for conferences rotate yearly and are hard to maintain.
const PROGRAM_TYPE_ORDER: ProgramType[] = [
    'early-career-program',
    'pre-internship',
    'fellowship',
    'insight-event',
];

const PROGRAM_TYPE_META: Record<ProgramType, ProgramTypeMeta> = {
    'early-career-program': {
        label: 'Early-Career Programs',
        blurb: 'Targeted internships and rotations for first-year and sophomore students.',
    },
    'pre-internship': {
        label: 'Pre-Internship Programs',
        blurb: 'Bridge programs that prepare you for and place you into industry internships.',
    },
    'fellowship': {
        label: 'Fellowships',
        blurb: 'Year-long or multi-summer programs combining mentorship, training, and placement.',
    },
    'insight-event': {
        label: 'Insight Events',
        blurb: '1–4 day on-site experiences. Often a feeder into the company\'s sophomore internship pipeline.',
    },
    // conference intentionally omitted — see MetaSourcesStrip for stable org links
    'conference': { label: 'Conferences', blurb: '' },
};

/**
 * Top-level Programs section. Buckets resources by `programType` and hands
 * each bucket to `ProgramTypeBucket`, which owns the per-bucket sort,
 * cap, and closed-cycle disclosure.
 *
 * Programs missing `programType` would silently disappear, so they are
 * surfaced in a fallback "More programs" bucket so the catalog never
 * loses entries to a Strapi data-quality gap.
 */
export default function ProgramsSection({ resources }: ProgramsSectionProps) {
    if (resources.length === 0) return null;

    const grouped = groupByProgramType(resources);

    return (
        <section className="mb-16" id="recurring-programs">
            <h2 className="font-display text-3xl font-bold text-brand-dark mb-2 pb-2 border-b-[3px] border-neu-red inline-block">
                Recurring Programs
            </h2>
            <p className="text-gray-600 mb-4 max-w-3xl">
                Named programs that run every cycle: fellowships, freshman/sophomore internships, insight events, and more.
                Each links to the program&apos;s permanent landing page (if we were able to find it!)
            </p>
            <ProgramRemindersExport resources={resources} />

            {PROGRAM_TYPE_ORDER.map((programType) => {
                const meta = PROGRAM_TYPE_META[programType];
                const bucket = grouped.byType[programType] ?? [];
                return (
                    <ProgramTypeBucket
                        key={programType}
                        programType={programType}
                        label={meta.label}
                        blurb={meta.blurb}
                        resources={bucket}
                    />
                );
            })}

            {grouped.untyped.length > 0 && (
                <div className="mb-12">
                    <h3 className="font-display text-2xl font-semibold text-brand-dark mb-1">
                        More Programs
                        <span className="ml-2 text-sm font-normal text-gray-500">({grouped.untyped.length})</span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-5">
                        Programs without a sub-type assigned yet. Shown for completeness while a maintainer categorizes them.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {grouped.untyped.map((resource) => (
                            <ExternalResourceCard key={externalResourceListKey(resource)} resource={resource} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

interface GroupedPrograms {
    byType: Partial<Record<ProgramType, ExternalResource[]>>;
    untyped: ExternalResource[];
}

function groupByProgramType(resources: ExternalResource[]): GroupedPrograms {
    const byType: Partial<Record<ProgramType, ExternalResource[]>> = {};
    const untyped: ExternalResource[] = [];

    for (const resource of resources) {
        if (resource.programType) {
            const list = byType[resource.programType] ?? [];
            list.push(resource);
            byType[resource.programType] = list;
        } else {
            untyped.push(resource);
        }
    }

    return { byType, untyped };
}
