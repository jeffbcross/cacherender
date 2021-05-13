import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ElementPreserverService } from './element-preserver.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'preserve-elements',
  template: ` <ng-content *ngIf="!cachedElement"></ng-content> `,
  styles: [],
})
export class PreserveElementsComponent implements OnInit {
  // To store and lookup the contained elements from cache
  @Input() key: string;
  cachedElement: HTMLElement | null = null;

  constructor(
    private ref: ElementRef,
    private renderer: Renderer2,
    private preserver: ElementPreserverService
  ) {
    console.log('context', preserver.context);
  }

  ngOnInit(): void {
    if (!this.key) throw new Error('Key required for preserve-elements');
    if (this.preserver.context === 'prerender') {
      this.renderer.setAttribute(
        this.ref.nativeElement,
        '__elPreserveKey',
        this.key
      );
    } else {
      /**
       * This implementation just leaves the content as-is if
       * there's no existing reference by this key.
       * It might make sense to throw an error, if browser
       * and server MUST be symmetrical.
       **/
      this.cachedElement = this.preserver.getElement(this.key);
      if (this.cachedElement) {
        this.renderer.appendChild(this.ref.nativeElement, this.cachedElement);
      }
    }
  }
}
