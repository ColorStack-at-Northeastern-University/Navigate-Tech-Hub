import { buildProgramReminderEvent, type ProgramReminderEvent } from '@/lib/programCycle';
import type { ExternalResource } from '@/lib/types';

function escapeIcsText(value: string): string {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n/g, '\\n')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,');
}

function formatIcsUtc(date: Date): string {
    const pad = (part: number) => String(part).padStart(2, '0');
    return (
        `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
        `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
    );
}

function formatIcsEvent(event: ProgramReminderEvent): string {
    const lines = [
        'BEGIN:VEVENT',
        `UID:${escapeIcsText(event.uid)}`,
        `DTSTAMP:${formatIcsUtc(new Date())}`,
        `DTSTART:${formatIcsUtc(event.start)}`,
        `DTEND:${formatIcsUtc(event.end)}`,
        `SUMMARY:${escapeIcsText(event.summary)}`,
        `DESCRIPTION:${escapeIcsText(event.description)}`,
        'END:VEVENT',
    ];
    return lines.join('\r\n');
}

export function buildProgramRemindersIcs(resources: ExternalResource[]): string {
    const events = resources
        .map((resource) => buildProgramReminderEvent(resource))
        .filter((event): event is ProgramReminderEvent => event !== null);

    const body = events.map(formatIcsEvent).join('\r\n');
    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Navigate Tech Hub//Program Reminders//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        body,
        'END:VCALENDAR',
    ].join('\r\n');
}

export function countProgramReminderEvents(resources: ExternalResource[]): number {
    return resources.filter((resource) => buildProgramReminderEvent(resource) !== null).length;
}

export function programRemindersIcsFilename(): string {
    return 'navigate-program-reminders.ics';
}
