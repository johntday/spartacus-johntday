import { Provider } from '@angular/core';
import { ComponentDecorator, SlotDecorator } from '@spartacus/core';
import { ContentfulpreviewComponentDecorator } from './contentfulpreview-component-decorator';
import { ContentfulpreviewSlotDecorator } from './contentfulpreview-slot-decorator';

export const contentfulPreviewDecorators: Provider[] = [
  {
    provide: ComponentDecorator,
    useExisting: ContentfulpreviewComponentDecorator,
    multi: true,
  },
  {
    provide: SlotDecorator,
    useExisting: ContentfulpreviewSlotDecorator,
    multi: true,
  },
];
