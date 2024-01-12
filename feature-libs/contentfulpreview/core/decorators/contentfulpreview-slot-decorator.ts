import { Injectable, Renderer2 } from '@angular/core';
import { ContentSlotData, SlotDecorator } from '@spartacus/core';
import { ContentfulPreviewService } from '../services/contentfulpreview.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulpreviewSlotDecorator extends SlotDecorator {
  constructor(
    protected contentfulPreviewServiceEditService: ContentfulPreviewService
  ) {
    super();
  }

  decorate(element: Element, renderer: Renderer2, slot: ContentSlotData): void {
    if (slot) {
      this.contentfulPreviewServiceEditService.addContentfulPreviewContract(
        element,
        renderer,
        slot.properties
      );
    }
  }
}
