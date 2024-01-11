import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ContentfulConfig {
  contentful?: {
    baseUrl: string;
    // endpoints?: ContentfulEndpoints;
    managedPages: string[];

    preview: boolean;
    CONTENTFUL_SPACE_ID: string;
    CONTENTFUL_ENVIRONMENT: string;
    CONTENTFUL_ACCESS_TOKEN: string;
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
    CONTENTFUL_CMA_TOKEN: string;
    CONTENTFUL_PREVIEW_HOST: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends ContentfulConfig {}
}

export const DEFAULT_CONTENTFUL_CONFIG: ContentfulConfig = {
  contentful: {
    baseUrl: 'https://graphql.contentful.com/content/v1/',
    // endpoints: {
    //   page: 'ignore for now',//todo
    // },
    managedPages: [],
    preview: false,
    CONTENTFUL_SPACE_ID: '',
    CONTENTFUL_ENVIRONMENT: '',
    CONTENTFUL_ACCESS_TOKEN: '',
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: '',
    CONTENTFUL_CMA_TOKEN: '',
    CONTENTFUL_PREVIEW_HOST: 'preview.contentful.com',
  },
};

export interface ContentfulCmsComponent {
  id: string;
}

declare module '@spartacus/core' {
  interface CmsComponent extends ContentfulCmsComponent {}
}
