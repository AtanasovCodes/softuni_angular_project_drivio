import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Car, CarListResponse } from '../../../types/cars.interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private httpClient = inject(HttpClient);

  getAllCars({
    limit = 10,
    page = 1,
    excludeId = null,
  }: {
    limit?: number;
    page?: number;
    excludeId?: string | null;
  }): Observable<CarListResponse> {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('page', page.toString());
    if (excludeId) {
      params.set('excludeId', excludeId);
    }

    return this.httpClient.get<CarListResponse>(`${environment.baseURL}/cars?${params.toString()}`);
  }

  getCarById(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${environment.baseURL}/cars/${id}`);
  }
}
