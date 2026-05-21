'use client';

import {
    buildCalendarReminderUrl,
    defaultSeasonForProgramType,
    resolveCareersHubUrl,
    resolveSeasonalGuidance,
    seasonLabel,
} from '@/lib/programCycle';
import { analyticsResourceId, trackValueEvent } from '@/lib/analytics';
import type { ExternalResource, TypicalOpenSeason } from '@/lib/types';

interface ProgramCycleCalloutProps {
    resource: ExternalResource;
}

export default function ProgramCycleCallout({ resource }: ProgramCycleCalloutProps) {
    const season: TypicalOpenSeason =
        resource.typicalOpenSeason ?? defaultSeasonForProgramType(resource.programType);
    const guidance = resolveSeasonalGuidance(resource);
    const hubUrl = resolveCareersHubUrl(resource);
    const calendarUrl = buildCalendarReminderUrl(resource);
    const showSeasonBadge = season !== 'varies';
    const resourceId = analyticsResourceId(resource.documentId, resource.title);

    return (
        <div
            className="mb-4 rounded-lg border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm leading-snug"
            role="note"
        >
            <div className="flex flex-wrap items-center gap-2 mb-2">
                {showSeasonBadge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                        Usually {season === 'rolling' ? 'rolling' : `opens ${seasonLabel(season).split(' ')[0]}`}
                    </span>
                )}
                <span className="text-xs font-medium text-amber-900/80">Cyclical program</span>
            </div>

            <p className="text-gray-700 mb-3">{guidance}</p>

            <div className="flex flex-wrap gap-2">
                <a
                    href={hubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                        event.stopPropagation();
                        trackValueEvent('external_resource_outbound_click', {
                            resource_id: resourceId,
                            surface: 'careers_hub',
                        });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-amber-300 text-neu-red hover:bg-amber-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red"
                >
                    Open careers hub
                    <span aria-hidden="true">↗</span>
                </a>
                {calendarUrl && (
                    <a
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => {
                            event.stopPropagation();
                            trackValueEvent('outbound_click', {
                                resource_id: resourceId,
                                destination: 'google_calendar',
                            });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-neu-red text-white hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
                    >
                        Add calendar reminder
                    </a>
                )}
            </div>
        </div>
    );
}
