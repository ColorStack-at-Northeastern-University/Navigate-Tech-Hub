/** Shared with publish script — keep in sync with frontend/lib/articleContent.ts */

const METADATA_LINE =
  /^(slug|title|category|audienceStage|outcome|timeToReadMinutes|contentVolatility|batch|draftStatus)\s*:/i;

function normalizeHeadingText(value) {
  return value
    .replace(/^#+\s*/, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function stripLeadingTitleHeading(markdown, articleTitle) {
  const lines = markdown.split('\n');
  let index = 0;
  while (index < lines.length && !lines[index].trim()) {
    index += 1;
  }
  const firstLine = lines[index]?.trim() ?? '';
  if (!firstLine.startsWith('#')) {
    return markdown;
  }
  if (normalizeHeadingText(firstLine) !== normalizeHeadingText(articleTitle)) {
    return markdown;
  }
  index += 1;
  while (index < lines.length && !lines[index].trim()) {
    index += 1;
  }
  return lines.slice(index).join('\n').trim();
}

export function prepareArticleMarkdown(raw, options = {}) {
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
  if (options.articleTitle) {
    body = stripLeadingTitleHeading(body, options.articleTitle);
  }
  return body;
}
