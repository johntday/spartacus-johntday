/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as storeFinder from '../../../helpers/store-finder';
import { clearCacheTestIsolation } from '../../../helpers/utils-cypress-legacy';

context('Store finder', { testIsolation: false }, () => {
  clearCacheTestIsolation();
  before(() => {
    cy.visit('/store-finder');
  });

  storeFinder.testAllowViewAllStores();
  storeFinder.testAllowViewStoreDetails();
});
