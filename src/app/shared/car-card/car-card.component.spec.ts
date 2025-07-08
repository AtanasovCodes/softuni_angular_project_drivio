import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCardComponent } from './car-card.component';
import { CarFeaturesComponent } from '../car-features/car-features.component';
import { By } from '@angular/platform-browser';
import { Car } from '../../../types/cars.interface';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;

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
      imports: [CarCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCardComponent);
    component = fixture.componentInstance;
    component.car = testCar;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the car brand and model in header', () => {
    const headerEl = fixture.nativeElement.querySelector('.car-header h5');
    expect(headerEl.textContent).toContain('Tesla Model S (2023)');
  });

  it('should set aria-label attribute on article correctly', () => {
    const article = fixture.nativeElement.querySelector('article.car-card');
    expect(article.getAttribute('aria-label')).toBe('Car: Tesla Model S');
  });

  it('should render the image with correct src and alt', () => {
    const img = fixture.nativeElement.querySelector('img.car-image');
    expect(img.src).toContain('test-image.jpg');
    expect(img.alt).toBe('Tesla Model S');
  });

  it('should pass the features to app-car-features component', () => {
    const carFeaturesComponent = fixture.debugElement.query(
      By.directive(CarFeaturesComponent)
    );
    expect(carFeaturesComponent.componentInstance.features).toEqual(
      testCar.features
    );
  });

  it('should render the price per day correctly', () => {
    const priceEl = fixture.nativeElement.querySelector('.car-price strong');
    expect(priceEl.textContent).toBe('$120');
  });

  it('should have a button with text "View Details"', () => {
    const button = fixture.nativeElement.querySelector('button.primary');
    expect(button.textContent).toBe('View Details');
  });
});
