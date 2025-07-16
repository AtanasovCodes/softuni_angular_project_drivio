import { paths } from 'constants/paths.constants';

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarsService } from 'app/services/cars/cars.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarAvailabilityGuard implements CanActivate {
  private carsService = inject(CarsService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const carId = route.paramMap.get('id');
    if (!carId) {
      console.error('Car ID is not provided');
      this.router.navigate([`/${paths.cars}`]);
    }

    return this.carsService.getCarById(carId as string).pipe(
      map((car) => {
        if (car.status === 'free') {
          return true;
        } else {
          this.router.navigate([`/${paths.cars}`]);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate([`/${paths.cars}`]);
        return [false];
      })
    );
  }
}
