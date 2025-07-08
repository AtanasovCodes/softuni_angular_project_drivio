import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CarFeaturesComponent } from './car-features.component';

describe('CarFeaturesComponent', () => {
  let component: CarFeaturesComponent;
  let fixture: ComponentFixture<CarFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarFeaturesComponent);
    component = fixture.componentInstance;
  });

  it('should render list items with capitalized features', () => {
    component.features = ['electric', 'autopilot', 'luxury'];
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(3);
    expect(listItems[0].nativeElement.textContent).toBe('Electric');
    expect(listItems[1].nativeElement.textContent).toBe('Autopilot');
    expect(listItems[2].nativeElement.textContent).toBe('Luxury');
  });

  it('should render no list items if features input is empty', () => {
    component.features = [];
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(0);
  });
});
