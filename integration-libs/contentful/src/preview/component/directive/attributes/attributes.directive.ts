import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'cx-paragraph',
})
export class AttributesDirective implements AfterViewInit {
  // { entry-id: '123', field-id: 'content' }
  @Input() cxAttributes: { [attribute: string]: string } | undefined;

  private _attributesNamePrefix = 'data-contentful';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    console.log('AttributesDirective.ngAfterViewInit', this.cxAttributes);
    if (this.cxAttributes) {
      for (const attributeName in this.cxAttributes) {
        if (this.cxAttributes.hasOwnProperty(attributeName)) {
          const attributeValue = this.cxAttributes[attributeName];
          if (attributeValue) {
            const _attributeName = this._attributesNamePrefix
              ? `${this._attributesNamePrefix}-${attributeName}`
              : attributeName;
            this.renderer.setAttribute(
              this.elementRef.nativeElement,
              _attributeName,
              attributeValue
            );
          }
        }
      }
    }
  }
}
