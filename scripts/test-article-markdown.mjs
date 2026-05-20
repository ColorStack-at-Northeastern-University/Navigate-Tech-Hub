import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareArticleMarkdown } from './lib/article-markdown.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const structuredDraft = readFileSync(
    join(root, 'internal-docs/internal_resources_drafts/online-assessment-strategy/draft/article.md'),
    'utf8',
);
const flatDraft = readFileSync(
    join(
        root,
        'internal-docs/internal_resources_drafts/coding-with-ai-learning-path/draft/article.md',
    ),
    'utf8',
);

const structured = prepareArticleMarkdown(structuredDraft, {
    articleTitle: 'Online Assessment Strategy for Timed Screens',
});
assert.match(structured, /^## Before you click Start/m);
assert.doesNotMatch(structured, /^slug:/m);

const strippedTitle = prepareArticleMarkdown(structuredDraft, {
    articleTitle: 'Online Assessment Strategy for Timed Screens',
});
assert.doesNotMatch(strippedTitle, /^# Online Assessment/m);

const learningPath = prepareArticleMarkdown(flatDraft, {
    articleTitle: 'Coding with AI: Learning Acceleration Without Dependency',
});
const sectionCount = (learningPath.match(/^## /gm) ?? []).length;
assert.ok(sectionCount >= 5, `expected section headers in learning-path draft, got ${sectionCount}`);

console.log('article-markdown: ok');
