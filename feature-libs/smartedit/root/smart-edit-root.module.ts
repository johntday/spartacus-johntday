/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  MODULE_INITIALIZER,
  provideDefaultConfig,
  SMART_EDIT_DUMMY_COMPONENT_TYPE,
} from '@spartacus/core';
import { defaultSmartEditConfig } from './config/default-smart-edit-config';
import { SMART_EDIT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';
import { SmartEditLauncherService } from './services/smart-edit-launcher.service';
import { SmartEditInitService } from './services/smart-edit-init.service';

export function smartEditFactory(
  smartEditLauncherService: SmartEditLauncherService
): () => void {
  const isReady = () => {
    smartEditLauncherService.load();
  };
  return isReady;
}

@NgModule({
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultSmartEditConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: smartEditFactory,
      deps: [SmartEditLauncherService],
      multi: true,
    },
    provideDefaultConfig({
      featureModules: {
        [SMART_EDIT_FEATURE]: {
          cmsComponents: [SMART_EDIT_DUMMY_COMPONENT_TYPE],
        },
      },
    }),
    {
      provide: MODULE_INITIALIZER,
      useFactory: SmartEditInitService.factory,
      deps: [SmartEditInitService],
      multi: true,
    },
  ],
})
export class SmartEditRootModule {}
