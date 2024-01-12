import { CONTENTFUL_PREVIEW_CONFIG } from '../constants';
import {
  CONTENTFULPREVIEW_FEATURE_NAME,
  SPARTACUS_CONTENTFULPREVIEW,
  SPARTACUS_CONTENTFULPREVIEW_ROOT,
} from '../libs-constants';
import { AdditionalFeatureConfiguration } from '../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../utils/lib-utils';

export interface SpartacusContentfulPreviewOptions extends LibraryOptions {
  storefrontPreviewRoute?: string;
  allowOrigin?: string;
}

export const CONTENTFULPREVIEW_FOLDER_NAME = 'smartedit';
export const CONTENTFULPREVIEW_MODULE_NAME = 'SmartEdit';
export const CONTENTFULPREVIEW_MODULE = 'SmartEditModule';
export const CONTENTFULPREVIEW_ROOT_MODULE = 'SmartEditRootModule';
export const CONTENTFULPREVIEW_FEATURE_NAME_CONSTANT =
  'CONTENTFUL_PREVIEW_FEATURE';
export const SPARTACUS_CONTENTFULPREVIEW_ASSETS = 'smartedit/assets';

export const CONTENTFULPREVIEW_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CONTENTFULPREVIEW_FEATURE_NAME,
    mainScope: SPARTACUS_CONTENTFULPREVIEW,
  },
  folderName: CONTENTFULPREVIEW_FOLDER_NAME,
  moduleName: CONTENTFULPREVIEW_MODULE_NAME,
  featureModule: {
    name: CONTENTFULPREVIEW_MODULE,
    importPath: SPARTACUS_CONTENTFULPREVIEW,
  },
  rootModule: {
    name: CONTENTFULPREVIEW_ROOT_MODULE,
    importPath: SPARTACUS_CONTENTFULPREVIEW_ROOT,
  },
  customConfig: buildSmartEditConfig,
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CONTENTFULPREVIEW_ROOT,
    namedImports: [CONTENTFULPREVIEW_FEATURE_NAME_CONSTANT],
  },
  assets: {
    input: SPARTACUS_CONTENTFULPREVIEW_ASSETS,
    glob: '**/*',
  },
};

function buildSmartEditConfig(
  options: SpartacusContentfulPreviewOptions
): AdditionalFeatureConfiguration {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_CONTENTFULPREVIEW_ROOT,
          namedImports: [CONTENTFUL_PREVIEW_CONFIG],
        },
      ],
      content: `<${CONTENTFUL_PREVIEW_CONFIG}>{
        smartEdit: {
          storefrontPreviewRoute: '${
            options.storefrontPreviewRoute ||
            'STOREFRONT_PREVIEW_ROUTE_PLACEHOLDER'
          }',
          allowOrigin: '${options.allowOrigin || 'ALLOWED_ORIGIN_PLACEHOLDER'}',
        },}`,
    },
  };
}
