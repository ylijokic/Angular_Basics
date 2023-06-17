import { Component } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'donut-list',
  template: `
    <div>
      <ng-container *ngIf="donuts.length; else nothing">
        <donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        >
        </donut-card>
      </ng-container>

      <ng-template #nothing>
        <p>No Donuts Here...</p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class DonutListComponent {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}

  ngOnInit() {
    this.donuts = this.donutService.donuts;
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
