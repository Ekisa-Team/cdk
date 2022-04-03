import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormsRoutingModule],
})
export class FormsModule {}
