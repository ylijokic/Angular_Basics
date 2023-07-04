import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, retry, tap, throwError } from 'rxjs';

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

    return this.http.get<Donut[]>(`/api/donuts`).pipe(
      tap((donuts) => (this.donuts = donuts)),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getSingleDonut(id: string): Observable<Donut> {
    return this.getAllDonuts().pipe(
      map((donuts) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);

        return donut ?? { name: '', icon: '', price: 0, description: '' };
      })
    );
  }

  public create(payload: Donut): Observable<Donut> {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut) => (this.donuts = [...this.donuts, donut])),
      catchError(this.handleError)
    );
  }

  public update(payload: Donut): Observable<Donut> {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          return item.id === donut.id ? donut : item;
        });
      }),
      catchError(this.handleError)
    );
  }

  public delete(payload: Donut): Observable<Donut> {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter((donut) => donut.id !== payload.id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client Side Error
      console.warn('Client', error.message);
    } else {
      // Server Side Error
      console.warn('Server', error.status);
    }
    return throwError(() => new Error(error.message));
  }
}
