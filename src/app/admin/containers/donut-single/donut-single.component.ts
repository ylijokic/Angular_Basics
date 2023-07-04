import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'donut-single',
  template: `
    <div>
      <donut-form
        [donut]="donut"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      >
      </donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService
      .getSingleDonut('9ROLjCB')
      .subscribe((donut: Donut) => (this.donut = donut));
  }

  public onCreate(donut: Donut): void {
    this.donutService
      .create(donut)
      .subscribe(() => console.log('Created Successfully!'));
  }

  public onUpdate(donut: Donut): void {
    this.donutService.update(donut).subscribe({
      next: () => console.log('Updated Successfully!'),
      error: () => console.log('onUpdate Error!'),
    });
  }

  public onDelete(donut: Donut): void {
    this.donutService
      .delete(donut)
      .subscribe(() => console.log('Deleted Successfully!'));
  }
}
