import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <nav>
      <div class="container">
        <a [routerLink]="['who-graphs']">Graphs</a>
        <a [routerLink]="['forms', 'activity']">Forms</a>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular';
}
