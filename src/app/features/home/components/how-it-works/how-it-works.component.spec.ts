import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HowItWorksComponent } from './how-it-works.component';

describe('HowItWorksComponent', () => {
  let component: HowItWorksComponent;
  let fixture: ComponentFixture<HowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 images with correct alt texts', () => {
    const images = fixture.debugElement.queryAll(By.css('ul li img'));
    expect(images.length).toBe(3);

    const altTexts = images.map((img) => img.attributes['alt']);
    expect(altTexts).toEqual(['Browse Cars', 'Book a Car', 'Pick Up Car']);
  });
});
