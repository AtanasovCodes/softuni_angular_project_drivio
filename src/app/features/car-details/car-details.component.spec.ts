import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';
import { Car } from 'types/cars.interface';

import { CarDetailsComponent } from './car-details.component';

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  const testCar: Car = {
    id: 1,
    brand: 'Tesla',
    model: 'Model S',
    year: 2023,
    status: 'free',
    pricePerDay: 120,
    pricePerHour: 20,
    description: 'Premium electric sedan.',
    image: 'test-image.jpg',
    features: ['Electric', 'Autopilot', 'Luxury'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsComponent, RouterLink],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    component.car = testCar;
    fixture.detectChanges();
  });

  it('should display car brand, model, and year', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent).toContain('Tesla Model S');
    expect(heading.textContent).toContain('2023');
  });

  it('should render app-chip with correct label and color', () => {
    if (component.car) {
      component.car.status = 'free';
    }

    fixture.detectChanges();

    const chipDebugEl = fixture.debugElement.query(By.css('app-chip'));
    expect(chipDebugEl).toBeTruthy();
    expect(chipDebugEl.componentInstance.label).toBe('free');
    expect(chipDebugEl.componentInstance.color).toBe('success');

    if (component.car) {
      component.car.status = 'rented';
    }

    fixture.detectChanges();

    expect(chipDebugEl.componentInstance.label).toBe('rented');
    expect(chipDebugEl.componentInstance.color).toBe('danger');
  });

  it('should display description and price', () => {
    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('p[aria-label="Car description"]');
    expect(description.textContent).toContain('Premium electric sedan.');

    const price = fixture.nativeElement.querySelector('h4');
    expect(price.textContent).toContain('120');
  });

  it('should list all car features', () => {
    fixture.detectChanges();

    const features = fixture.nativeElement.querySelectorAll('.car-details__features li');
    expect(features.length).toBe(3);
    expect(features[0].textContent.toLowerCase()).toContain('electric');
    expect(features[1].textContent.toLowerCase()).toContain('autopilot');
    expect(features[2].textContent.toLowerCase()).toContain('luxury');
  });

  it('should show rented message if car is rented', () => {
    if (component.car) {
      component.car.status = 'rented';
    }
    fixture.detectChanges();

    const rentedMsg = fixture.nativeElement.querySelector('strong');
    expect(rentedMsg).toBeTruthy();
    expect(rentedMsg.textContent).toContain('This car is currently rented');
  });

  it('should show "Rent this car" button if logged in and car is free', () => {
    component.isLoggedIn = true;
    if (component.car) {
      component.car.status = 'free';
    }
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.primary');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Rent this car');
  });

  it('should show "Login to rent this car" button if not logged in and car is free', () => {
    component.isLoggedIn = false;

    if (component.car) {
      component.car.status = 'free';
    }

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.error');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Login to rent this car');
  });

  it('should not render anything if car is null', () => {
    component.car = null;
    fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('article.car-details');
    expect(article).toBeNull();
  });
});
