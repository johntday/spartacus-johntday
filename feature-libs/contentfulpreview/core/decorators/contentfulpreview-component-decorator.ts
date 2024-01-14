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
    // console.log(
    //   'ContentfulpreviewComponentDecorator.decorate',
    //   JSON.stringify(component, null, 2)
    // );
    const id = (<any>component)?.id;
    if (id) {
      const contentfulAttr = {
        'data-contentful-entry-id': id,
      };
      this.contentfulPreviewService.addContentfulPreviewContract(
        element,
        renderer,
        // component.properties
        contentfulAttr
      );
    }
  }
}
