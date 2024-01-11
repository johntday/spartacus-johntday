import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData, ParagraphComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-paragraph',
  templateUrl: `<div
      *ngIf="component.data$ | async as data"
      [innerHTML]="bypassSecurityTrustHtml(data.content | cxSupplementHashAnchors)"
      [cxAttributes]="liveattributes(data)"
    ></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentfulParagraphComponent extends ParagraphComponent {
  constructor(
    public component: CmsComponentData<CmsParagraphComponent>,
    protected router: Router
  ) {
    super(component, router);
  }

  liveattributes(data: any) {
    // return {
    //   'entry-id': data.uid,
    //   'field-id': data.content,
    // };
    return data;
  }
}
