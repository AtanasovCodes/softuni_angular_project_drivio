import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeroComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading with correct text', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toBe('Rent Your Dream Car Today');
  });

  it('should render the Explore Cars button', () => {
    const button = fixture.debugElement.query(
      By.css('button.primary'),
    ).nativeElement;
    expect(button.textContent).toBe('Explore Cars');
  });

  it('should render the hero image with correct src and alt attributes', () => {
    const img = fixture.debugElement.query(
      By.css('img.hero-image'),
    ).nativeElement;
    expect(img.getAttribute('src')).toBe('assets/images/hero-banner.webp');
    expect(img.getAttribute('alt')).toBe(
      'A stunning car parked in a scenic location',
    );
    expect(img.getAttribute('width')).toBe('1600');
    expect(img.getAttribute('height')).toBe('600');
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('decoding')).toBe('async');
  });
});
