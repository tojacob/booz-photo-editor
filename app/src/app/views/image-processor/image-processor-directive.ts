import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[imageProcessor]',
})
export class ImageProcessorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}