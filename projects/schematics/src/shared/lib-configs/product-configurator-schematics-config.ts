/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME,
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME,
  PRODUCT_CONFIGURATOR_VC_FEATURE_NAME,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
  SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
  SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const PRODUCT_CONFIGURATOR_MODULE_NAME = 'ProductConfigurator';
export const PRODUCT_CONFIGURATOR_FOLDER_NAME = 'product-configurator';
export const PRODUCT_CONFIGURATOR_SCSS_FILE_NAME = 'product-configurator.scss';

export const PRODUCT_CONFIGURATOR_TRANSLATIONS = 'configuratorTranslations';
export const PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG =
  'configuratorTranslationChunksConfig';
export const PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE =
  'TextfieldConfiguratorModule';
export const PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE =
  'TextfieldConfiguratorRootModule';
export const PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE_NAME =
  'ProductConfiguratorTextfield';
export const PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT =
  'PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE';

export const PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG: SchematicConfig =
  {
    library: {
      featureName: PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME,
      mainScope: SPARTACUS_PRODUCT_CONFIGURATOR,
      featureScope: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
    },
    folderName: PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: PRODUCT_CONFIGURATOR_MODULE_NAME,
    featureModule: {
      name: PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
    },
    rootModule: {
      name: PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
      namedImports: [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: PRODUCT_CONFIGURATOR_TRANSLATIONS,
      chunks: PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT_CONFIGURATOR,
    },
    dependencyFeatures: [
      CART_BASE_FEATURE_NAME,
      CHECKOUT_BASE_FEATURE_NAME,
      ORDER_FEATURE_NAME,
    ],
  };

export const PRODUCT_CONFIGURATOR_RULEBASED_MODULE_NAME =
  'ProductConfiguratorRulebased';
export const PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT =
  'PRODUCT_CONFIGURATOR_RULEBASED_FEATURE';
export const PRODUCT_CONFIGURATOR_RULEBASED_MODULE =
  'RulebasedConfiguratorModule';
export const PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE =
  'RulebasedConfiguratorRootModule';

export const PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG: SchematicConfig =
  {
    library: {
      featureName: PRODUCT_CONFIGURATOR_VC_FEATURE_NAME,
      mainScope: SPARTACUS_PRODUCT_CONFIGURATOR,
      featureScope: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    folderName: PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: PRODUCT_CONFIGURATOR_MODULE_NAME,
    featureModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    rootModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
      namedImports: [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: PRODUCT_CONFIGURATOR_TRANSLATIONS,
      chunks: PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT_CONFIGURATOR,
    },
    dependencyFeatures: [
      CART_BASE_FEATURE_NAME,
      CHECKOUT_BASE_FEATURE_NAME,
      ORDER_FEATURE_NAME,
    ],
  };

export const PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE =
  'RulebasedCpqConfiguratorModule';
export const PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE =
  'CpqConfiguratorRootModule';

export const PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME,
    mainScope: SPARTACUS_PRODUCT_CONFIGURATOR,
    featureScope: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
    b2b: true,
  },
  folderName: PRODUCT_CONFIGURATOR_FOLDER_NAME,
  moduleName: PRODUCT_CONFIGURATOR_MODULE_NAME,
  featureModule: {
    name: PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
  },
  rootModule: {
    name: PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
  },
  dependencyFeatures: [PRODUCT_CONFIGURATOR_VC_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
      featureModuleName: PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
    },
  ],
};