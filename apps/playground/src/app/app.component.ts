import { Component } from '@angular/core';
import { ElementPreserverService } from './element-preserver.service';

@Component({
  selector: 'cacherender-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'playground';
  context = this.preserver.context;
  constructor(private preserver: ElementPreserverService) {}
}
