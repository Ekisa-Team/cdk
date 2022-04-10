import { Component, OnInit } from '@angular/core';
import { HeadCircumference } from '@ekisa-cdk/who-graphs';

@Component({
  selector: 'app-head-circumference',
  template: ` <p>head-circumference works!</p> `,
  styleUrls: ['./head-circumference.component.css'],
})
export class HeadCircumferenceComponent implements OnInit {
  constructor() {
    const hc = new HeadCircumference();
    hc.logType();
  }

  ngOnInit(): void {
    const s = '';
  }
}
