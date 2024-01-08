/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { OccPersonalizationIdInterceptor } from './occ-personalization-id.interceptor';
import { OccPersonalizationTimeInterceptor } from './occ-personalization-time.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccPersonalizationIdInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccPersonalizationTimeInterceptor,
    multi: true,
  },
];
