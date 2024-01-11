import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ContentfulConfig {
  contentful?: {
    baseUrl: string;
    // query?: ContentfulEndpoints;
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
