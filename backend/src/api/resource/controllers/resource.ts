/**
 * Resource controller
 *
 * Uses Strapi's default CRUD operations. No custom logic needed --
 * all filtering, pagination, and sorting is handled via query params.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::resource.resource');
