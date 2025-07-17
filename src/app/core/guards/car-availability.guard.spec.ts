import { paths } from 'constants/paths.constants';

import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarsService } from 'app/features/cars/services/cars/cars.service';
import { of, throwError } from 'rxjs';
import { Car } from 'types/cars.interface';

import { CarAvailabilityGuard } from './car-availabilitty.guard';

describe('CarAvailabilityGuard', () => {
  let guard: CarAvailabilityGuard;
  let carsServiceSpy: jasmine.SpyObj<CarsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSnapshot: ActivatedRouteSnapshot;

  const mockCar: Car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    status: 'free',
    pricePerDay: 50,
    pricePerHour: 10,
    description: 'A reliable car',
    image: 'some-url',
    features: ['Air Conditioning', 'Navigation System'],
    id: 123,
  };

  beforeEach(() => {
    carsServiceSpy = jasmine.createSpyObj('CarsService', ['getCarById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        CarAvailabilityGuard,
        { provide: CarsService, useValue: carsServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(CarAvailabilityGuard);

    routeSnapshot = {
      paramMap: {
        get: (key: string) => (key === 'id' ? '123' : null),
      },
    } as unknown as ActivatedRouteSnapshot;
  });

  it('should allow access when car is available (status "free")', (done) => {
    mockCar.status = 'free';
    carsServiceSpy.getCarById.and.returnValue(of(mockCar));

    guard.canActivate(routeSnapshot).subscribe((result) => {
      expect(result).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and navigate when car is not available', (done) => {
    mockCar.status = 'rented';
    carsServiceSpy.getCarById.and.returnValue(of(mockCar));

    guard.canActivate(routeSnapshot).subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith([`/${paths.cars}`]);
      done();
    });
  });

  it('should deny access and navigate on error', (done) => {
    carsServiceSpy.getCarById.and.returnValue(throwError(() => new Error('Server error')));

    guard.canActivate(routeSnapshot).subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith([`/${paths.cars}`]);
      done();
    });
  });
});
