/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { CMS_FEATURE, CmsState, StateWithCms } from '../cms-state';

export const getCmsState: MemoizedSelector<StateWithCms, CmsState> =
  createFeatureSelector<CmsState>(CMS_FEATURE);
