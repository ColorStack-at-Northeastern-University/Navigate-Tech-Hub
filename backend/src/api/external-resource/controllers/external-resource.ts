/**
 * External Resource controller
 *
 * Uses Strapi's default CRUD operations.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::external-resource.external-resource');
