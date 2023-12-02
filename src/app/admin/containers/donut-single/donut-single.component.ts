import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';

@Component({
  standalone: true,
  imports: [DonutFormComponent],
  providers: [DonutService],
  selector: 'donut-single',
  template: `
    <div>
      <donut-form
        [isEdit]="isEdit"
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
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.route.snapshot.data['isEdit'];
    this.donutService
      .getSingleDonut(id)
      .subscribe((donut: Donut) => (this.donut = donut));
  }

  public onCreate(donut: Donut): void {
    this.donutService.create(donut).subscribe({
      next: (donut) => this.router.navigate(['admin', 'donuts']),
      error: () => {
        this.router.navigate(['admin']);
        console.log('create Error!');
      },
    });
  }

  public onUpdate(donut: Donut): void {
    this.donutService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: () => {
        this.router.navigate(['admin']);
        console.log('onUpdate Error!');
      },
    });
  }

  public onDelete(donut: Donut): void {
    this.donutService.delete(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: () => {
        this.router.navigate(['admin']);
        console.log('Delete Error!');
      },
    });
  }
}
