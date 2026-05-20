import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Internal planning, drafts, radar — gitignored at `internal-docs/`. */
export const DOCS_ROOT = join(REPO_ROOT, 'internal-docs');
