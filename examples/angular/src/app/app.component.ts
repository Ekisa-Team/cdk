import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <nav>
      <div class="container">
        <a [routerLink]="['forms']">Graphs</a>
        <a [routerLink]="['forms']">Forms</a>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      nav {
        display: flex;
        align-items: center;
        height: 70px;
        background: var(--color-gray-900);
        margin-bottom: 2rem;
      }

      nav a {
        color: var(--color-gray-300);
        margin-right: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular';
}
