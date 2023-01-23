/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { OPF_CORE_FEATURE, OPF_FEATURE } from './feature-name';

export function defaultOPFComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [OPF_FEATURE]: {
        // TODO: (OPF) provide proper step type (PAYMENT_REVIEW) once augmenting problem is solved
        cmsComponents: ['CheckoutReviewOrder'],
      },

      // By default core is bundled together with components.
      [OPF_CORE_FEATURE]: OPF_FEATURE,
    },
  };
  return config;
}
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfigFactory(defaultOPFComponentsConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    // TODO: (OPF) uncomment once proper type and routing is set up
    // provideDefaultConfig(defaultOPFRoutingConfig),
  ],
})
export class OpfRootModule {}
