/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductVariantSizeSelectorComponent } from './product-variant-size-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [ProductVariantSizeSelectorComponent],
  exports: [ProductVariantSizeSelectorComponent],
})
export class ProductVariantSizeSelectorModule {}
