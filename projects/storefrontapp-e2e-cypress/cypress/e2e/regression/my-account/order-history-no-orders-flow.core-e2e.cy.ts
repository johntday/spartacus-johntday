/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickHamburger } from '../../../helpers/homepage';
import * as userAccountHelpers from '../../../helpers/login';
import { orderHistoryTest } from '../../../helpers/order-history';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';
import { clearCacheTestIsolation } from '../../../helpers/utils-cypress-legacy';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('Order History with no orders', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    clearCacheTestIsolation();
    before(() => {
      clearAllStorage();
      cy.visit('/');
      cy.onMobile(() => {
        clickHamburger();
      });
      userAccountHelpers.registerUser();
      verifyGlobalMessageAfterRegistration();
    });

    orderHistoryTest.checkRedirectNotLoggedInUser();
    orderHistoryTest.checkRedirectLoggedInUser();
    orderHistoryTest.checkStartShoppingButton();
  });
});
