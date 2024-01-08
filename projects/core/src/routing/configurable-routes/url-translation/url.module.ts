/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductURLPipe } from './product-url.pipe';
import { UrlPipe } from './url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [UrlPipe, ProductURLPipe],
  exports: [UrlPipe, ProductURLPipe],
})
export class UrlModule {}
