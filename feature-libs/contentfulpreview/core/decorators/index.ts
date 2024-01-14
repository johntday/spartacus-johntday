import { Provider } from '@angular/core';
import { ComponentDecorator } from '@spartacus/core';
import { ContentfulpreviewComponentDecorator } from './contentfulpreview-component-decorator';

export const contentfulPreviewDecorators: Provider[] = [
  {
    provide: ComponentDecorator,
    useExisting: ContentfulpreviewComponentDecorator,
    multi: true,
  },
  // {
  //   provide: SlotDecorator,
  //   useExisting: ContentfulpreviewSlotDecorator,
  //   multi: true,
  // },
];

export * from './contentfulpreview-component-decorator';
export * from './contentfulpreview-slot-decorator';
