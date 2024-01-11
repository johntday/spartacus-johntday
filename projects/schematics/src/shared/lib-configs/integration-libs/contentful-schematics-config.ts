import { CONTENTFUL_CONFIG } from '../../constants';
import {
  CONTENTFUL_FEATURE_NAME,
  SPARTACUS_CONTENTFUL,
} from '../../libs-constants';
import {
  AdditionalFeatureConfiguration,
  AdditionalProviders,
  LibraryOptions,
  SchematicConfig,
} from '../../utils';

export interface SpartacusContentfulOptions extends LibraryOptions {
  baseUrl?: string;
  managedPages?: string[];
  preview?: boolean;
  CONTENTFUL_SPACE_ID?: string;
  CONTENTFUL_ENVIRONMENT?: string;
  CONTENTFUL_ACCESS_TOKEN?: string;
  CONTENTFUL_PREVIEW_ACCESS_TOKEN?: string;
  CONTENTFUL_CMA_TOKEN?: string;
  CONTENTFUL_PREVIEW_HOST?: string;
}

export const CONTENTFUL_FOLDER_NAME = 'contentful';
export const CONTENTFUL_MODULE_NAME = 'Contentful';

export const CONTENTFUL_MODULE = 'ContentfulModule';

export const CONTENTFUL_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CONTENTFUL_FEATURE_NAME,
    mainScope: SPARTACUS_CONTENTFUL,
  },
  folderName: CONTENTFUL_FOLDER_NAME,
  moduleName: CONTENTFUL_MODULE_NAME,
  featureModule: {
    importPath: SPARTACUS_CONTENTFUL,
    name: CONTENTFUL_MODULE,
    content: `${CONTENTFUL_MODULE}.forRoot()`,
  },
  customConfig: buildContentfulConfig,
  dependencyFeatures: [],
};

function buildContentfulConfig(
  options: SpartacusContentfulOptions
): AdditionalFeatureConfiguration<SpartacusContentfulOptions> {
  const customConfig: AdditionalProviders[] = [
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_CONTENTFUL,
          namedImports: [CONTENTFUL_CONFIG],
        },
      ],
      content: `<${CONTENTFUL_CONFIG}>{
        contentful: {
          baseUrl: '${options.baseUrl}',
          managedPages: '${options.managedPages}',
          preview: '${options.preview}',
          CONTENTFUL_SPACE_ID: '${options.CONTENTFUL_SPACE_ID}',
          CONTENTFUL_ENVIRONMENT: '${options.CONTENTFUL_ENVIRONMENT}',
          CONTENTFUL_ACCESS_TOKEN: '${options.CONTENTFUL_ACCESS_TOKEN}',
          CONTENTFUL_PREVIEW_ACCESS_TOKEN: '${options.CONTENTFUL_PREVIEW_ACCESS_TOKEN}',
          CONTENTFUL_CMA_TOKEN: '${options.CONTENTFUL_CMA_TOKEN}',
          CONTENTFUL_PREVIEW_HOST: '${options.CONTENTFUL_PREVIEW_HOST}'
        },
    }`,
    },
  ];

  customConfig.push({
    import: [
      {
        moduleSpecifier: SPARTACUS_CONTENTFUL,
        namedImports: [CONTENTFUL_CONFIG],
      },
    ],
    content: `<${CONTENTFUL_CONFIG}>{
          contentful: {
          },
        }`,
  });

  return {
    providers: customConfig,
    options: {
      ...options,
      lazy: false,
    },
  };
}
