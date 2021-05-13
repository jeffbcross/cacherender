import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  ElementPreserverService,
  ElementPreserverModule,
} from 'angular-ssr-element-preserver';

@NgModule({
  declarations: [AppComponent],
  providers: [ElementPreserverService.forBrowser()],
  imports: [
    ElementPreserverModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
