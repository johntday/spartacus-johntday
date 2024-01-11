import { InjectionToken } from '@angular/core';
import { CmsStructureModel, Converter } from '@spartacus/core';

export const CONTENTFUL_CMS_PAGE_NORMALIZER = new InjectionToken<Converter<any, CmsStructureModel>>('ContentfulCmsPageNormalizer');
