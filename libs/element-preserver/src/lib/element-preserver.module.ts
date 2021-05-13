import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreserveElementsComponent } from './preserve-elements.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PreserveElementsComponent],
  exports: [PreserveElementsComponent],
})
export class ElementPreserverModule {}
