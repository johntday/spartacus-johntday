/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentFormComponent } from './dp-payment-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    I18nModule,
    SpinnerModule,
  ],

  declarations: [DpPaymentFormComponent],
  exports: [DpPaymentFormComponent],
})
export class DpPaymentFormModule {}
