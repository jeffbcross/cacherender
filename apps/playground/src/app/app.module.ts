import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ElementPreserverModule } from 'angular-ssr-element-preserver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ElementPreserverModule.forBrowser(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
