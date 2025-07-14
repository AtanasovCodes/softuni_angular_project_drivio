import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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

  it('should set the value of the first name field', () => {
    const firstNameInput = fixture.nativeElement.querySelector(
      'input[type="text"][placeholder="First Name"]'
    );
    firstNameInput.value = 'John';
    firstNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.firstName.value).toBe('John');
  });

  it('should display validation error if the first name is less then 2 characters', () => {
    const firstNameInput = fixture.nativeElement.querySelector(
      'input[type="text"][placeholder="First Name"]'
    );
    firstNameInput.value = 'A';
    firstNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('First name must be at least 2 characters long.');
  });

  it('should set the value of the last name field', () => {
    const lastNameInput = fixture.nativeElement.querySelector(
      'input[type="text"][placeholder="Last Name"]'
    );
    lastNameInput.value = 'Doe';
    lastNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lastName.value).toBe('Doe');
  });

  it('should set the value of the email field', () => {
    const emailInput = fixture.nativeElement.querySelector(
      'input[type="email"][placeholder="Email"]'
    );
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.email.value).toBe('test@example.com');
  });

  it('should display validation error for wrong email', () => {
    const emailInput = fixture.nativeElement.querySelector('input[type="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));

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

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Password must be at least 6 characters long.');
  });

  it('should set the value of the confirm password field', () => {
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      'input[type="password"][placeholder="Confirm Password"]'
    );
    confirmPasswordInput.value = 'password123';
    confirmPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.confirmPassword.value).toBe('password123');
  });

  it('should display validation error if confirm password does not match password', () => {
    const passwordInput = fixture.nativeElement.querySelector(
      'input[type="password"][placeholder="Password"]'
    );
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      'input[type="password"][placeholder="Confirm Password"]'
    );

    passwordInput.value = 'password123';
    confirmPasswordInput.value = 'differentPassword';
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));

    component.registerForm.get('confirmPassword')?.markAsTouched();

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Passwords must match.');
  });
});
