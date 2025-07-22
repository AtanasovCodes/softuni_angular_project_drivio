import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { LoadingService } from 'app/core/services/loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Car } from 'types/cars.interface';

import { RentCarComponent } from './rent-car.component';

import { CarsService } from '../../cars/services/cars/cars.service';
import { RentalService } from '../services/rental.service';

describe('RentCarComponent', () => {
  let component: RentCarComponent;
  let fixture: ComponentFixture<RentCarComponent>;

  let mockCarsService: jasmine.SpyObj<CarsService>;
  let mockRentalService: jasmine.SpyObj<RentalService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;

  const mockCar: Car = {
    id: 1,
    pricePerHour: 10,
    status: 'free',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    pricePerDay: 100,
    image: 'https://example.com/car.jpg',
    description: 'A reliable car for rent',
    features: ['Air Conditioning', 'Navigation System'],
  };

  beforeEach(async () => {
    mockCarsService = jasmine.createSpyObj('CarsService', ['getCarById']);
    mockRentalService = jasmine.createSpyObj('RentalService', ['createRental']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLoadingService = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      imports: [RentCarComponent, ReactiveFormsModule, CurrencyPipe],
      providers: [
        { provide: CarsService, useValue: mockCarsService },
        { provide: RentalService, useValue: mockRentalService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: LoadingService, useValue: mockLoadingService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with today's date", () => {
    const today = component.getToday();
    expect(component.rentCarForm.get('startDate')?.value).toBe(today);
    expect(component.rentCarForm.get('endDate')?.value).toBe(today);
  });

  it('should fetch car details on init', () => {
    mockCarsService.getCarById.and.returnValue(of(mockCar));

    component.ngOnInit();

    expect(mockCarsService.getCarById).toHaveBeenCalledWith('1');
  });

  it('should submit rental on valid form', fakeAsync(() => {
    component.carDetails = mockCar;

    const startDate = '2025-08-01';
    const endDate = '2025-08-05';

    component.rentCarForm.setValue({ startDate, endDate });

    mockRentalService.createRental.and.returnValue(of({}));

    component.onSubmit();
    tick();

    expect(mockLoadingService.show).toHaveBeenCalled();
    expect(mockRentalService.createRental).toHaveBeenCalledWith({
      carId: 1,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Rental created successfully',
      'Success'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/rentals/success']);
    expect(mockLoadingService.hide).toHaveBeenCalled();
  }));

  it('should show error field if any of the date is not given', () => {
    const startDateInput = component.rentCarForm.get('startDate');
    const endDateInput = component.rentCarForm.get('endDate');

    startDateInput?.setValue('');
    startDateInput?.markAsTouched();
    endDateInput?.setValue('');
    endDateInput?.markAsTouched();

    expect(component.isFieldInvalid('startDate')).toBeTrue();
    expect(component.isFieldInvalid('endDate')).toBeTrue();
  });

  it('should show error if rental submission fails', fakeAsync(() => {
    component.carDetails = mockCar;
    component.rentCarForm.setValue({ startDate: '2025-07-23', endDate: '2025-07-25' });

    mockRentalService.createRental.and.returnValue(throwError(() => new Error('Create failed')));

    component.onSubmit();
    tick();

    expect(mockLoadingService.show).toHaveBeenCalled();
    expect(mockToastrService.error).toHaveBeenCalledWith('Failed to create rental', 'Error');
    expect(mockLoadingService.hide).toHaveBeenCalled();
  }));
});
