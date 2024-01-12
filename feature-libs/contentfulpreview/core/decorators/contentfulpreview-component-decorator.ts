import { Injectable, Renderer2 } from '@angular/core';
import { ComponentDecorator, ContentSlotComponentData } from '@spartacus/core';
import { ContentfulPreviewService } from '../services/contentfulpreview.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulpreviewComponentDecorator extends ComponentDecorator {
  constructor(protected contentfulPreviewService: ContentfulPreviewService) {
    super();
  }

  decorate(
    element: Element,
    renderer: Renderer2,
    component: ContentSlotComponentData
  ): void {
    if (component) {
      this.contentfulPreviewService.addContentfulPreviewContract(
        element,
        renderer,
        component.properties
      );
    }
  }
}
