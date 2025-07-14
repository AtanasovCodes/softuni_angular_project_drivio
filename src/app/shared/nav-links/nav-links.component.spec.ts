import { paths } from 'constants/paths.constants';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Routes } from '@angular/router';
import { UserService } from 'app/user/services/user.service';

import { NavLinksComponent } from './nav-links.component';

@Component({ template: '' })
class DummyComponent {}

describe('NavLinksComponent', () => {
  let fixture: ComponentFixture<NavLinksComponent>;
  let element: HTMLElement;

  const testRoutes: Routes = [
    { path: '', component: DummyComponent },
    { path: 'cars', component: DummyComponent },
    { path: 'contacts', component: DummyComponent },
    { path: 'users/login', component: DummyComponent },
    { path: 'users/profile', component: DummyComponent },
  ];

  let mockUserService: { isLoggedIn: boolean };

  beforeEach(async () => {
    mockUserService = { isLoggedIn: false };

    await TestBed.configureTestingModule({
      imports: [NavLinksComponent],
      declarations: [DummyComponent],
      providers: [provideRouter(testRoutes), { provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinksComponent);
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
    mockUserService.isLoggedIn = false;
    fixture.detectChanges();

    const loginLink = element.querySelector('a[title="Login"]');
    expect(loginLink).toBeTruthy();
    expect(loginLink?.getAttribute('ng-reflect-router-link')).toBe(`/${paths.login}`);
  });

  it('should show profile link when logged in', () => {
    mockUserService.isLoggedIn = true;
    fixture.detectChanges();

    // const profileLink = element.querySelector('a[title="View Profile"]');
    const profileButton = element.querySelector('app-profile-dropdown');
    expect(profileButton).toBeTruthy();
  });
});
