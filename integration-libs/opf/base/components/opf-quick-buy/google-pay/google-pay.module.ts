/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpfGooglePayComponent } from './google-pay.component';

@NgModule({
  declarations: [OpfGooglePayComponent],
  exports: [OpfGooglePayComponent],
  imports: [CommonModule],
})
export class OpfGooglePayModule {}