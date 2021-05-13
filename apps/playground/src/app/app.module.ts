import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ElementPreserverService } from './element-preserver.service';
import { PreserveElementsComponent } from './preserve-elements.component';

@NgModule({
  declarations: [AppComponent, PreserveElementsComponent],
  providers: [ElementPreserverService.forBrowser()],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  bootstrap: [AppComponent],
})
export class AppModule {}
