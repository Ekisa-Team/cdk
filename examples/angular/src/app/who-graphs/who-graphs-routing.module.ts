import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadCircumferenceComponent } from './head-circumference/head-circumference.component';
import { WhoGraphsComponent } from './who-graphs.component';

const routes: Routes = [
  { path: '', component: WhoGraphsComponent },
  { path: 'head-circumference', component: HeadCircumferenceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhoGraphsRoutingModule {}
