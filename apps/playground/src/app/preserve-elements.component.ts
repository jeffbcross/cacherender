import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

const preservedTemplate = document.createElement('div');
preservedTemplate.innerHTML = 'I have been preserved';

globalThis.cache = {
  hello: preservedTemplate,
};

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

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.key) throw new Error('Key required for preserve-elements');
    this.cachedElement = globalThis.cache[this.key];
    if (this.cachedElement) {
      this.renderer.appendChild(
        this.ref.nativeElement,
        globalThis.cache[this.key]
      );
    }
  }
}
