import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import {
  ParagraphComponent,
  SupplementHashAnchorsModule,
} from '@spartacus/storefront';
import { ContentfulParagraphComponent } from './contentful-paragraph.component';
import { ContentfulDirectivesModule } from '../directive/contentful-directives.module';
import { ContentfulCmsPageAdapter } from '../../../cms/page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SupplementHashAnchorsModule,
    ContentfulDirectivesModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CMSParagraphComponent: {
          component: ContentfulParagraphComponent,
        },
        CMSTabParagraphComponent: {
          component: ContentfulParagraphComponent,
        },
      },
    }),
    {
      provide: ParagraphComponent,
      useExisting: ContentfulCmsPageAdapter,
    },
  ],
  declarations: [ContentfulParagraphComponent],
  exports: [ContentfulParagraphComponent],
})
export class ContentfulParagraphModule {}
