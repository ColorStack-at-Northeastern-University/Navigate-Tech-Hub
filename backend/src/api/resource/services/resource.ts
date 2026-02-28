/**
 * Resource service
 *
 * Uses Strapi's default service layer. Custom business logic
 * (e.g. slug generation, validation) can be added here later.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::resource.resource');
