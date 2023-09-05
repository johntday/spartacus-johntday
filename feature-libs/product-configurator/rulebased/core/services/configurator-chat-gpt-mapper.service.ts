/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Configurator } from '../model/configurator.model';

/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatGtpMapperService {
  constructor() {}

  serializeConfiguration(config: Configurator.Configuration): string {
    // provide attributes and subobject as filters
    const simplified = JSON.stringify(config, [
      'flatGroups',
      'attributes',
      'name',
      'description',
      'id',
      'values',
      'value',
      'valueDisplay',
      'valuePrice',
      'label',
    ]);
    console.log('Config context for GTP:', JSON.parse(simplified));
    return simplified;
  }
}