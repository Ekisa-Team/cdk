import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'forms', loadChildren: async () => (await import('./forms/forms.module')).FormsModule },
  {
    path: 'who-graphs',
    loadChildren: async () => (await import('./who-graphs/who-graphs.module')).WhoGraphsModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
