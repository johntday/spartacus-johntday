import { ContentfulConfig } from './contentful-config';

export const DEFAULT_CONTENTFUL_CONFIG: ContentfulConfig = {
  contentful: {
    baseUrl: 'https://graphql.contentful.com/content/v1/',
    // query: {
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
