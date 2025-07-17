import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterLink } from '@angular/router';
import { UserService } from 'app/features/user/services/user.service';

import { HeaderComponent } from './header.component';

@Component({ selector: 'app-logo', standalone: true, template: '' })
class MockLogoComponent {}

@Component({ selector: 'app-nav-links', standalone: true, template: '' })
class MockNavLinksComponent {}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  const mockUserService = {
    isLoggedIn: false,
    getUser: () => null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MockLogoComponent,
        MockNavLinksComponent,
        RouterLink,
        NoopAnimationsModule,
      ],
      providers: [provideRouter([]), { provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should render app-logo', () => {
    const logo = element.querySelector('app-logo');
    expect(logo).toBeTruthy();
  });

  it('should render app-nav-links', () => {
    const navLinks = element.querySelector('app-nav-links');
    expect(navLinks).toBeTruthy();
  });
});
