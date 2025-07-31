import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Car, CarStatus } from 'types/cars.interface';

@Injectable({
  providedIn: 'root',
})
export class CarAvailabilityService {
  private http = inject(HttpClient);

  getCarAvailability(carId: string): Observable<CarStatus> {
    return this.http.get<Car>(`/api/cars/${carId}`).pipe(map((car) => car.status));
  }
}
