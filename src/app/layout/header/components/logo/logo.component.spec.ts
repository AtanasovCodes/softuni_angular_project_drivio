import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let fixture: ComponentFixture<LogoComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have a link with routerLink="/" and title "Go Home"', () => {
    const link = element.querySelector('a.logo') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.getAttribute('ng-reflect-router-link')).toBe('/');
    expect(link.getAttribute('title')).toBe('Go Home');
  });

  it('should render logo image with correct src and alt', () => {
    const img = element.querySelector('a.logo img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('assets/images/logo-1.png');
    expect(img.alt).toBe('Drivio Logo');
  });

  it('should render span with sr-only class and text "Drivio"', () => {
    const span = element.querySelector('a.logo .sr-only') as HTMLElement;
    expect(span).toBeTruthy();
    expect(span.textContent).toBe('Drivio');
  });
});
