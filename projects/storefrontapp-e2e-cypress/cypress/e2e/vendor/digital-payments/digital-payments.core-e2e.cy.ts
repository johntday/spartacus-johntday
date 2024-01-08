/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addCheapProductToCartAndBeginCheckoutForSignedInCustomer,
  goToCheapProductDetailsPage,
  loginUser,
  signOut,
} from '../../../helpers/checkout-flow';
import {
  checkoutDeliveryMode,
  checkoutPaymentDetails,
  checkoutShippingAddress,
  my_user,
  orderConfirmation,
  reviewAndPlaceOrder,
} from '../../../helpers/vendor/digital-payments/user';

describe('checkout using digital-payments', () => {
  it('checkout using digital-payments', () => {
    cy.visit('/electronics-spa/en/USD/login');
    loginUser(my_user);
    cy.wait(3000);
    goToCheapProductDetailsPage();
    addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
    checkoutShippingAddress();
    checkoutDeliveryMode();
    checkoutPaymentDetails();
    reviewAndPlaceOrder();
    orderConfirmation();
    signOut();
  });
});
