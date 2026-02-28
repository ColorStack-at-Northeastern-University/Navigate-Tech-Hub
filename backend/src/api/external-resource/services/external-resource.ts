/**
 * External Resource service
 *
 * Uses Strapi's default service layer.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::external-resource.external-resource');
