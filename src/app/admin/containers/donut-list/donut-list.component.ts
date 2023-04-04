import { Component } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-list',
  template: ` 
    <div *ngFor="let donut of donuts">
      <donut-card [donut]="donut"></donut-card>
    </div>
  `,
  styles: []
})
export class DonutListComponent {
  donuts!: Donut[];

  constructor() {}

  ngOnInit() {
    this.donuts = [
      {
        id: 'abcde',
        name: 'Just Chocolate', 
        icon: 'just-chocolate',
        price: 119,
        description: 'For the pure chocoholic'
      },
      {
        id: 'qwert',
        name: 'Glazed Fudge', 
        icon: 'glazed-fudge',
        price: 129,
        description: 'Sticky perfection'
      },
      {
        id: 'kjhnd',
        name: 'Caramel Swirl', 
        icon: 'caramel-swirl',
        price: 129,
        description: 'Chocolate drizzled with caramel'
      },
    ]
  }
}
