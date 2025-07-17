import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginComponent } from './login.component';

class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
  warning = jasmine.createSpy('warning');
  info = jasmine.createSpy('info');
}

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),

        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the value of the email field', () => {
    const emailInput = fixture.nativeElement.querySelector('input[type="email"]');
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.email.value).toBe('test@example.com');
  });

  it('should display validation error for wrong email', () => {
    const emailInput = fixture.nativeElement.querySelector('input[type="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));

    component.email.markAsTouched();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Please enter a valid email address.');
  });

  it('should set the value of the password field', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[type="password"]');
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.password.value).toBe('password123');
  });

  it('should display validation error if the password is less than 6 characters', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[type="password"]');
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));

    component.password.markAsTouched();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Password must be at least 6 characters long.');
  });
});
