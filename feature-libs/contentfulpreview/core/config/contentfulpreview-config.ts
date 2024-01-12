import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ContentfulPreviewConfig {
  contentfulPreview?: {
    storefrontPreviewRoute?: string;
    allowOrigin?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends ContentfulPreviewConfig {}
}
