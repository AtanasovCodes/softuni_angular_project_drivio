import { paths } from 'constants/paths.constants';

import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { ResizeService } from 'app/core/services/resize/resize.service';
import { UserService } from 'app/features/user/services/user.service';
import { of } from 'rxjs';

import { NavLinksComponent } from './nav-links.component';

@Component({ template: '' })
class DummyComponent {}

const mockResizeService = {
  isMobile$: of(true),
};

const userServiceMock = {
  isLoggedIn$: of(false),
  getUser: () => of(null),
  logout: () => of(null),
};

describe('NavLinksComponent', () => {
  let fixture: ComponentFixture<NavLinksComponent>;
  let component: NavLinksComponent;
  let element: HTMLElement;

  const testRoutes: Routes = [
    { path: '', component: DummyComponent },
    { path: 'cars', component: DummyComponent },
    { path: 'contacts', component: DummyComponent },
    { path: 'users/login', component: DummyComponent },
    { path: 'users/profile', component: DummyComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinksComponent, NoopAnimationsModule],
      declarations: [DummyComponent],
      providers: [
        provideRouter(testRoutes),
        provideHttpClient(),
        ResizeService,
        { provide: UserService, useValue: userServiceMock },
        { provide: ResizeService, useValue: mockResizeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinksComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should render 4 nav links', () => {
    fixture.detectChanges();
    const links = element.querySelectorAll('a');
    expect(links.length).toBe(4);
  });

  it('should link to correct routes', () => {
    fixture.detectChanges();
    const links = element.querySelectorAll('a');
    expect(links[0].getAttribute('ng-reflect-router-link')).toBe(`/${paths.home}`);
    expect(links[1].getAttribute('ng-reflect-router-link')).toBe(`/${paths.cars}`);
    expect(links[2].getAttribute('ng-reflect-router-link')).toBe(`/${paths.contacts}`);
  });

  it('should show login link when not logged in', () => {
    component.isLoggedIn$ = of(false);
    fixture.detectChanges();

    const loginLink = element.querySelector('a[title="Login"]');
    expect(loginLink).toBeTruthy();
    expect(loginLink?.getAttribute('ng-reflect-router-link')).toBe(`/${paths.login}`);
  });

  it('should show profile link when logged in', () => {
    mockResizeService.isMobile$ = of(false);
    component.isLoggedIn$ = of(true);
    fixture.detectChanges();

    const profileButton = element.querySelector('app-profile-dropdown');
    expect(profileButton).toBeTruthy();
  });

  it('should toggle mobile menu on button click when in mobile view', fakeAsync(() => {
    const menuButton = element.querySelector('.mobile-menu-button') as HTMLElement;
    expect(menuButton).toBeTruthy();

    expect(component.isMenuOpen).toBeFalse();

    menuButton.click();
    tick();

    fixture.detectChanges();

    expect(component.isMenuOpen).toBeTrue();

    const navContainer = element.querySelector('.nav-links-container');
    expect(navContainer).toBeTruthy();

    const menuLinks = element.querySelectorAll('.nav-links a');
    expect(menuLinks.length).toBe(4);
  }));

  it('should close mobile menu after clicking a link', () => {
    component.isMobile$ = of(true);
    fixture.detectChanges();

    component.toggleMenu();
    fixture.detectChanges();

    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu();
    fixture.detectChanges();

    expect(component.isMenuOpen).toBeFalse();
  });
});
