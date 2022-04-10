import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadCircumferenceComponent } from './head-circumference/head-circumference.component';
import { WhoGraphsRoutingModule } from './who-graphs-routing.module';
import { WhoGraphsComponent } from './who-graphs.component';

@NgModule({
  declarations: [WhoGraphsComponent, HeadCircumferenceComponent],
  imports: [CommonModule, WhoGraphsRoutingModule],
})
export class WhoGraphsModule {}
