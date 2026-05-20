'use client';

import { downloadTextFile } from '@/lib/downloadTextFile';
import {
    buildProgramRemindersIcs,
    countProgramReminderEvents,
    programRemindersIcsFilename,
} from '@/lib/programRemindersIcs';
import type { ExternalResource } from '@/lib/types';

interface ProgramRemindersExportProps {
    resources: ExternalResource[];
}

export default function ProgramRemindersExport({ resources }: ProgramRemindersExportProps) {
    const eventCount = countProgramReminderEvents(resources);

    if (eventCount === 0) return null;

    function downloadIcs() {
        const ics = buildProgramRemindersIcs(resources);
        downloadTextFile(programRemindersIcsFilename(), ics, 'text/calendar;charset=utf-8');
    }

    return (
        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 max-w-3xl">
            <p className="text-sm text-gray-700 mb-3">
                Import estimated check-in reminders for {eventCount} recurring program
                {eventCount === 1 ? '' : 's'} into Google Calendar, Apple Calendar, or Outlook.
                These are not application deadlines — confirm dates on each official site.
            </p>
            <button
                type="button"
                onClick={downloadIcs}
                className="rounded-lg border border-brand-dark/20 bg-white px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
            >
                Download all reminders (.ics)
            </button>
        </div>
    );
}
