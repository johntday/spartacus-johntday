// import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { provideDefaultConfig } from '@spartacus/core';
// import { defaultContentfulPreviewConfig } from './config/default-contentfulpreview-config';
// import { interceptors } from './http-interceptors/index';
// import { SmartEditLauncherService } from './services/smart-edit-launcher.service';

// export function smartEditFactory(
//   smartEditLauncherService: SmartEditLauncherService
// ): () => void {
//   const isReady = () => {
//     smartEditLauncherService.load();
//   };
//   return isReady;
// }

import { NgModule } from '@angular/core';

@NgModule({
  // providers: [
  //   ...interceptors,
  //   provideDefaultConfig(defaultContentfulPreviewConfig),
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: smartEditFactory,
  //     deps: [SmartEditLauncherService],
  //     multi: true,
  //   },
  // ],
})
export class ContentfulPreviewRootModule {}
