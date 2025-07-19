import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from 'app/core/services/loading/loading.service';
import { UserService } from 'app/features/user/services/user.service';
import { of } from 'rxjs';

import { MyRentalsComponent } from './my-rentals.component';

import { RentalService } from '../services/rental.service';

describe('MyRentalsComponent', () => {
  let component: MyRentalsComponent;
  let fixture: ComponentFixture<MyRentalsComponent>;

  const mockRentalService = {
    getUserRentals: jasmine.createSpy('getUserRentals').and.returnValue(of({ data: [] })),
    cancelRental: jasmine.createSpy('cancelRental').and.returnValue(of(null)),
  };

  const mockUserService = {
    getUserId: jasmine.createSpy('getUserId').and.returnValue(123),
  };

  const mockLoadingService = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRentalsComponent],
      providers: [
        { provide: RentalService, useValue: mockRentalService },
        { provide: UserService, useValue: mockUserService },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRentalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render table headers and populate data correctly', () => {
    const rentalsMock = [
      {
        id: 1,
        car: {
          brand: 'Toyota',
          model: 'Corolla',
          image: 'toyota-corolla.jpg',
        },
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-10'),
      },
      {
        id: 2,
        car: {
          brand: 'Honda',
          model: 'Civic',
          image: 'honda-civic.jpg',
        },
        startDate: new Date('2023-02-05'),
        endDate: new Date('2023-02-15'),
      },
    ];

    mockRentalService.getUserRentals.and.returnValue(of({ data: rentalsMock }));

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const headers = Array.from(compiled.querySelectorAll('table thead th')).map((th) =>
      th.textContent?.trim()
    );
    expect(headers).toEqual(['Car', 'Car Image', 'Start Date', 'End Date', 'Actions', 'Cancel']);

    const rows = compiled.querySelectorAll('table tbody tr');
    expect(rows.length).toBe(rentalsMock.length);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent?.trim()).toBe('Toyota Corolla');

    const img = firstRowCells[1].querySelector('img')!;
    expect(img.src).toContain('toyota-corolla.jpg');
    expect(img.alt).toBe('Toyota Corolla');

    expect(firstRowCells[2].textContent).toContain('1/1/23');
    expect(firstRowCells[3].textContent).toContain('1/10/23');

    spyOn(component, 'cancelRental');
    const cancelBtn = firstRowCells[5].querySelector('button')!;
    cancelBtn.click();
    expect(component.cancelRental).toHaveBeenCalledWith(1);
  });
});
