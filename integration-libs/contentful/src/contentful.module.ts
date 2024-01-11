import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator, provideDefaultConfig } from '@spartacus/core';
import { ContentfulCmsPageModule } from './cms/page';
import {
  ContentfulConfig,
  contentfulConfigValidator,
  DEFAULT_CONTENTFUL_CONFIG,
} from './config';

@NgModule({
  imports: [ContentfulCmsPageModule],
})
export class ContentfulModule {
  static forRoot(
    config?: ContentfulConfig
  ): ModuleWithProviders<ContentfulModule> {
    return {
      ngModule: ContentfulModule,
      providers: [
        provideDefaultConfig(DEFAULT_CONTENTFUL_CONFIG),
        provideDefaultConfig(config),
        provideConfigValidator(contentfulConfigValidator),
      ],
    };
  }
}
