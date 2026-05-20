import type { ColorStackOpportunity } from '@/lib/opportunityTypes';

const CSV_COLUMNS = [
    'title',
    'company',
    'type',
    'location',
    'deadline',
    'url',
    'tags',
    'postedAt',
    'id',
] as const;

function escapeCsvCell(value: string): string {
    if (/[",\n\r]/.test(value)) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function rowToCsvCells(opportunity: ColorStackOpportunity): string[] {
    return [
        opportunity.title,
        opportunity.company,
        opportunity.type,
        opportunity.location ?? '',
        opportunity.deadline ?? '',
        opportunity.url,
        opportunity.tags.join('; '),
        opportunity.postedAt ?? '',
        String(opportunity.id),
    ];
}

export function buildOpportunitiesCsv(opportunities: ColorStackOpportunity[]): string {
    const header = CSV_COLUMNS.join(',');
    const rows = opportunities.map((opportunity) =>
        rowToCsvCells(opportunity).map(escapeCsvCell).join(','),
    );
    return [header, ...rows].join('\r\n');
}

export function opportunitiesCsvFilename(): string {
    const stamp = new Date().toISOString().slice(0, 10);
    return `colorstack-opportunities-${stamp}.csv`;
}
