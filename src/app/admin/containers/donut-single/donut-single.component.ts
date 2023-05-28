import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-single',
  template: `
    <div>
      <donut-form [donut]="donut" (create)="onCreate($event)"></donut-form>
    </div>
  `,
  styles: [
  ]
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;

  ngOnInit(): void {
    this.donut = {
      id: 'edwok',
      name: 'Sour Supreme', 
      icon: 'sour-supreme',
      price: 139,
      description: 'For the sour advocate.'
    };
  }

  public onCreate(donut: Donut): void {
    console.log('onCreate', donut);
  }
}
