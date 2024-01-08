/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';

import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithUser, UserState } from '../user-state';

import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { getUserState } from './feature.selector';

export const getCustomerCouponsState: MemoizedSelector<
  StateWithUser,
  LoaderState<CustomerCouponSearchResult>
> = createSelector(getUserState, (state: UserState) => state.customerCoupons);

export const getCustomerCouponsLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getCustomerCouponsState,
  (state: LoaderState<CustomerCouponSearchResult>) =>
    loaderSuccessSelector(state)
);

export const getCustomerCouponsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getCustomerCouponsState,
  (state: LoaderState<CustomerCouponSearchResult>) =>
    loaderLoadingSelector(state)
);

export const getCustomerCoupons: MemoizedSelector<
  StateWithUser,
  CustomerCouponSearchResult
> = createSelector(
  getCustomerCouponsState,
  (state: LoaderState<CustomerCouponSearchResult>) => loaderValueSelector(state)
);
