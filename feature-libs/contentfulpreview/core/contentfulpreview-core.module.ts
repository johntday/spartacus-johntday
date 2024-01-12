import { NgModule } from '@angular/core';
import { contentfulPreviewDecorators } from './decorators/index';
import { ContentfulPreviewService } from './services/contentfulpreview.service';

@NgModule({
  providers: [...contentfulPreviewDecorators],
})
export class ContentfulPreviewCoreModule {
  constructor(private contentfulPreviewService: ContentfulPreviewService) {
    this.contentfulPreviewService.processCmsPage();
  }
}
