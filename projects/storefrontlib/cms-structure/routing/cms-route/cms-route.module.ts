/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { addCmsRoute } from './add-cms-route';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [Injector],
      useFactory: addCmsRoute,
    },
  ],
})
export class CmsRouteModule {}
