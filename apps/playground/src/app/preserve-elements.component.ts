import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ElementPreserverService } from './element-preserver.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'preserve-elements',
  template: `
    <div class="preserve-elements-container">
      <ng-content *ngIf="!cachedElement"></ng-content>
    </div>
  `,
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
    this.cachedElement = this.preserver.getElement(this.key);
    if (this.cachedElement) {
      this.renderer.appendChild(this.ref.nativeElement, this.cachedElement);
    }
  }
}
