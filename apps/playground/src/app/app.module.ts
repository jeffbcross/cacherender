import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreserveElementsComponent } from './preserve-elements.component';

@NgModule({
  declarations: [AppComponent, PreserveElementsComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
