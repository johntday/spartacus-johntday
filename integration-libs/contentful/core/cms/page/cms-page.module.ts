import { ModuleWithProviders, NgModule } from '@angular/core';
import { CmsPageAdapter, CmsPageConnector } from '@spartacus/core';
import { ContentfulCmsPageAdapter } from './cms-page.adapter';
import { CONTENTFUL_CMS_PAGE_NORMALIZER } from './cms-page.converters';
import { ContentfulOccCmsPageNormalizer } from './cms-page.normalizer';
import { ContentfulCmsPageConnector } from './cms-page.connector';
import { PageLayoutService } from '@spartacus/storefront';
import { ContentfulPageLayoutService } from './cms-page-layout.service';

@NgModule({})
export class ContentfulCmsPageModule {
  static forRoot(): ModuleWithProviders<ContentfulCmsPageModule> {
    return {
      ngModule: ContentfulCmsPageModule,
      providers: [
        {
          provide: CmsPageAdapter,
          useExisting: ContentfulCmsPageAdapter,
        },
        {
          provide: CONTENTFUL_CMS_PAGE_NORMALIZER,
          useExisting: ContentfulOccCmsPageNormalizer,
          multi: true,
        },
        {
          provide: CmsPageConnector,
          useExisting: ContentfulCmsPageConnector,
        },
        {
          provide: PageLayoutService,
          useExisting: ContentfulPageLayoutService,
        },
      ],
    };
  }
}
