import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CarListResponse } from '../../../types/cars.interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private httpClient = inject(HttpClient);

  getAllCars({
    limit = 10,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  }): Observable<CarListResponse> {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('page', page.toString());

    return this.httpClient.get<CarListResponse>(
      `${environment.baseURL}/cars?${params.toString()}`
    );
  }
}
