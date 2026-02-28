/**
 * External Resource router
 *
 * Exposes standard REST endpoints for external resource links.
 * Public role should only have find and findOne enabled.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::external-resource.external-resource');
