/**
 * Strips editorial YAML frontmatter and legacy metadata blobs from article markdown
 * before render or before writing to Strapi.
 */
const METADATA_LINE =
    /^(slug|title|category|audienceStage|outcome|timeToReadMinutes|contentVolatility|batch|draftStatus)\s*:/i;

export type PrepareArticleMarkdownOptions = {
    /** When set, drops a leading `#` heading that repeats the page title (Strapi already shows it). */
    articleTitle?: string;
};

function normalizeHeadingText(value: string): string {
    return value
        .replace(/^#+\s*/, '')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function stripLeadingTitleHeading(markdown: string, articleTitle: string): string {
    const lines = markdown.split('\n');
    let index = 0;
    while (index < lines.length && !lines[index].trim()) {
        index += 1;
    }
    const firstLine = lines[index]?.trim() ?? '';
    if (!firstLine.startsWith('#')) {
        return markdown;
    }
    const headingText = normalizeHeadingText(firstLine);
    const titleText = normalizeHeadingText(articleTitle);
    if (headingText !== titleText) {
        return markdown;
    }
    index += 1;
    while (index < lines.length && !lines[index].trim()) {
        index += 1;
    }
    return lines.slice(index).join('\n').trim();
}

export function prepareArticleMarkdown(
    raw: string,
    options?: PrepareArticleMarkdownOptions,
): string {
    let text = raw.trim();

    if (text.startsWith('---')) {
        const closing = text.indexOf('\n---', 3);
        if (closing !== -1) {
            text = text.slice(closing + 4).trim();
        }
    }

    const lines = text.split('\n');
    let start = 0;
    while (start < lines.length) {
        const line = lines[start].trim();
        if (!line) {
            start += 1;
            continue;
        }
        if (line.startsWith('#')) break;
        if (METADATA_LINE.test(line)) {
            start += 1;
            continue;
        }
        break;
    }

    let body = lines.slice(start).join('\n').trim();
    if (options?.articleTitle) {
        body = stripLeadingTitleHeading(body, options.articleTitle);
    }
    return body;
}
