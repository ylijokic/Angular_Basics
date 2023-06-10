import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root'
})
export class DonutService {
  private donutList: Donut[] = [
      {
        id: 'abcde',
        name: 'Just Chocolate', 
        icon: 'just-chocolate',
        price: 119,
        promo: 'limited',
        description: 'For the pure chocoholic'
      },
      {
        id: 'qwert',
        name: 'Glazed Fudge', 
        icon: 'glazed-fudge',
        price: 129,
        promo: 'new',
        description: 'Sticky perfection'
      },
      {
        id: 'kjhnd',
        name: 'Caramel Swirl', 
        icon: 'caramel-swirl',
        price: 129,
        description: 'Chocolate drizzled with caramel'
      },
      {
        id: 'edwok',
        name: 'Sour Supreme', 
        icon: 'sour-supreme',
        price: 139,
        description: 'For the sour advocate.'
      },
      {
        id: 'eiuuh',
        name: 'Zesty Lemon', 
        icon: 'zesty-lemon',
        price: 129,
        description: 'Delicious, loucious, lemon'
      },
  ];

  constructor() { }

  public get donuts(): Donut[] {
    return this.donutList;
  }

  public getSingleDonut(id: string): Donut {
    const donut = this.donuts.find((donut: Donut) => donut.id === id);

    return donut ?? {name: '', icon: '', price: 0, description: ''};
  }
}
