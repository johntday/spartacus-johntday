/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  PRODUCT_FEATURE,
  ProductsState,
  StateWithProduct,
} from '../product-state';

export const getProductsState: MemoizedSelector<
  StateWithProduct,
  ProductsState
> = createFeatureSelector<ProductsState>(PRODUCT_FEATURE);
