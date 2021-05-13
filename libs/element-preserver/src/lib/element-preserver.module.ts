import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PreserveElementsComponent } from './preserve-elements.component';
import { ElementPreserverService } from './element-preserver.service';

// @dynamic
@NgModule({
  imports: [CommonModule],
  declarations: [PreserveElementsComponent],
  exports: [PreserveElementsComponent],
})
export class ElementPreserverModule {
  static forServer(): ModuleWithProviders<ElementPreserverModule> {
    return getModuleWithProviders('prerender');
  }

  static forBrowser(): ModuleWithProviders<ElementPreserverModule> {
    return getModuleWithProviders('browser');
  }
}

export function getModuleWithProviders(context: 'browser' | 'prerender') {
  return {
    ngModule: ElementPreserverModule,
    providers: [
      {
        provide: ElementPreserverService,
        useFactory: function (doc: Document) {
          return new ElementPreserverService(context, doc);
        },

        deps: [DOCUMENT],
      },
    ],
  };
}
