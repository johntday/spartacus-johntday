/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { ServerResponseService } from './server-response.service';

/**
 * Various implementations of `ServerResponseService`.
 *
 * Only one implementation can be active at a time, the one that
 * is Applicable with the current server technology.
 */
export const SERVER_RESPONSE_SERVICES = new InjectionToken<
  ServerResponseService[]
>('SERVER_RESPONSE_SERVICES');
