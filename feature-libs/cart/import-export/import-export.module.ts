/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  ExportOrderEntriesModule,
  ImportExportOrderEntriesModule,
  ImportOrderEntriesModule,
} from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  imports: [
    ImportExportCoreModule.forRoot(),
    ExportOrderEntriesModule,
    ImportOrderEntriesModule,
    ImportExportOrderEntriesModule,
  ],
})
export class ImportExportModule {}
