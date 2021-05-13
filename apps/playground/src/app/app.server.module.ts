import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ElementPreserverService } from 'angular-ssr-element-preserver';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [ElementPreserverService.forPreRender()],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
