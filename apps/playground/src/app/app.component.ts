import { Component } from '@angular/core';
import { ElementPreserverService } from 'angular-ssr-element-preserver';

@Component({
  selector: 'cacherender-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  context = this.preserver.context;
  constructor(private preserver: ElementPreserverService) {}
}
