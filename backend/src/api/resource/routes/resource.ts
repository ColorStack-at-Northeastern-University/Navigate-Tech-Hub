/**
 * Resource router
 *
 * Exposes standard REST endpoints:
 *   GET  /api/resources       (find)
 *   GET  /api/resources/:id   (findOne)
 *   POST /api/resources       (create)
 *   PUT  /api/resources/:id   (update)
 *   DELETE /api/resources/:id (delete)
 *
 * Public role should only have find and findOne enabled.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::resource.resource');
