import { ContentfulConfig } from './contentful-config';

export function contentfulConfigValidator(config: ContentfulConfig): string | void {
  if (!config.contentful) {
    return 'Please configure the config.contentful object before using the Contentful library';
  }

  if (config.contentful.baseUrl === undefined) {
    return 'Please configure contentful.baseUrl before using Contentful library';
  }

  // todo
  // if (
  //   config.contentful.endpoints === undefined ||
  //   config.contentful.endpoints.page === undefined
  // ) {
  //   return 'Please configure the contentful.endpoints before using Contentful library';
  // }

  if (config.contentful.preview === undefined) {
    return 'Please configure contentful.preview before using Contentful library';
  }

  if (config.contentful.CONTENTFUL_SPACE_ID === undefined) {
    return 'Please configure contentful.CONTENTFUL_SPACE_ID before using Contentful library';
  }

  if (config.contentful.CONTENTFUL_ENVIRONMENT === undefined) {
    return 'Please configure contentful.CONTENTFUL_ENVIRONMENT before using Contentful library';
  }

  if (config.contentful.CONTENTFUL_ACCESS_TOKEN === undefined) {
    return 'Please configure contentful.CONTENTFUL_ACCESS_TOKEN before using Contentful library';
  }

  if (config.contentful.CONTENTFUL_PREVIEW_ACCESS_TOKEN === undefined) {
    return 'Please configure contentful.CONTENTFUL_PREVIEW_ACCESS_TOKEN before using Contentful library';
  }

  if (config.contentful.CONTENTFUL_CMA_TOKEN === undefined) {
    return 'Please configure contentful.CONTENTFUL_CMA_TOKEN before using Contentful library';
  }

  if (config.contentful.CONTENTFUL_PREVIEW_HOST === undefined) {
    return 'Please configure contentful.CONTENTFUL_PREVIEW_HOST before using Contentful library';
  }

}
