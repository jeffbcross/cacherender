type GlobalWithCache = typeof globalThis & {
  __preservedElementsMap__: { [key: string]: HTMLElement };
};

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

  private initializeBrowser(): void {
    this._elementMap = (globalThis as GlobalWithCache).__preservedElementsMap__;
  }

  private initializeServer(): void {
    // TODO
  }

  getElement(key: string): HTMLElement | null {
    if (this.context === 'prerender') return null;
    return (this._elementMap && this._elementMap[key]) || null;
  }
}
