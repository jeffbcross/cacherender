import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  Provider,
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
  constructor(
    @Optional()
    @Inject(ElementPreserverContext)
    context: 'browser' | 'prerender' | null
  ) {
    this.context = context || this.context;
    if (this.context === 'browser') {
      this.initializeBrowser();
    }
  }

  static forBrowser(): Provider {
    return {
      provide: ElementPreserverService,
      useValue: new ElementPreserverService('browser'),
    };
  }

  static forPreRender() {
    return {
      provide: ElementPreserverService,
      useValue: new ElementPreserverService('prerender'),
    };
  }

  private initializeBrowser() {
    this._elementMap = globalThis.__preservedElementsMap__;
  }

  getElement(key: string): HTMLElement | null {
    return this._elementMap[key] || null;
  }
}
