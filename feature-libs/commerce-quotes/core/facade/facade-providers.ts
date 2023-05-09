/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { CommerceQuotesService } from './commerce-quotes.service';

export const facadeProviders: Provider[] = [
  CommerceQuotesService,
  {
    provide: CommerceQuotesFacade,
    useExisting: CommerceQuotesService,
  },
];