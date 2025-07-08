import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { CarsService } from './cars.service';
import { environment } from '../../../environments/environment';
import { CarListResponse } from '../../../types/cars.interface';

describe('CarsService', () => {
  let service: CarsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarsService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CarsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request with correct params and return expected data', () => {
    const mockResponse: CarListResponse = {
      data: [
        {
          id: 1,
          brand: 'Tesla',
          model: 'Model S',
          year: 2023,
          status: 'free',
          pricePerDay: 120,
          pricePerHour: 20,
          description: 'A premium electric sedan.',
          image: 'some-url',
          features: ['Electric', 'Autopilot'],
        },
      ],
      pagination: {
        limit: 10,
        page: 1,
        total: 1,
        totalPages: 1,
      },
    };

    service.getAllCars({ limit: 10, page: 1 }).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseURL}/cars?limit=10&page=1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should use default params when none provided', () => {
    const mockResponse: CarListResponse = {
      data: [],
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 0,
      },
    };

    service.getAllCars({}).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseURL}/cars?limit=10&page=1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });
});
