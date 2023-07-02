import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root',
})
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  public getAllDonuts(): Observable<Donut[]> {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return this.http
      .get<Donut[]>(`/api/donuts`)
      .pipe(tap((donuts) => (this.donuts = donuts)));
  }

  public getSingleDonut(id: string) {
    return this.getAllDonuts().pipe(
      map((donuts) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);

        return donut ?? { name: '', icon: '', price: 0, description: '' };
      })
    );
  }

  public create(payload: Donut) {
    return this.http
      .post<Donut>(`/api/donuts`, payload)
      .pipe(tap((donut) => (this.donuts = [...this.donuts, donut])));
  }

  public update(payload: Donut) {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          return item.id === donut.id ? donut : item;
        });
      })
    );
  }

  public delete(payload: Donut): void {
    this.donuts = this.donuts.filter((donut) => donut.id !== payload.id);
  }
}
