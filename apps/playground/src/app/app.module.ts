import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ElementPreserverService } from './element-preserver.service';
import { PreserveElementsComponent } from './preserve-elements.component';

@NgModule({
  declarations: [AppComponent, PreserveElementsComponent],
  providers: [ElementPreserverService.forBrowser()],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
