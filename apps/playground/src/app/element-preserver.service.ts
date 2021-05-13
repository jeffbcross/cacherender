import { DOCUMENT } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  Provider,
  ɵsetDocument,
} from '@angular/core';

export const ElementPreserverContext = new InjectionToken(
  'ElementPreserverContext'
);

@Injectable({
  providedIn: 'root',
})
export class ElementPreserverService {
  private _elementMap: { [key: string]: HTMLElement } | null = null;
  context: 'browser' | 'prerender' = 'browser';
  constructor(context: 'browser' | 'prerender', private dom: Document) {
    this.context = context || this.context;
    if (this.context === 'browser') {
      this.initializeBrowser();
    } else {
      this.initializeServer();
    }
  }

  static forBrowser(): Provider {
    return {
      provide: ElementPreserverService,
      useFactory: (doc) => new ElementPreserverService('browser', doc),
      deps: [DOCUMENT],
    };
  }

  static forPreRender(): Provider {
    return {
      provide: ElementPreserverService,
      useFactory: (doc) => new ElementPreserverService('prerender', doc),
      deps: [DOCUMENT],
    };
  }

  private initializeBrowser(): void {
    this._elementMap = globalThis.__preservedElementsMap__;
  }

  private initializeServer(): void {
    // TODO
  }

  getElement(key: string): HTMLElement | null {
    if (this.context === 'prerender') return null;
    return this._elementMap[key] || null;
  }
}
