import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import { ContactsComponent } from './contacts.component';

class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
  warning = jasmine.createSpy('warning');
  info = jasmine.createSpy('info');
}

describe('ContactsComponent', () => {
  let fixture: ComponentFixture<ContactsComponent>;
  let component: ContactsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsComponent, ReactiveFormsModule],
      providers: [{ provide: ToastrService, useValue: MockToastrService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with 3 controls', () => {
    expect(component.contactForm.contains('name')).toBeTrue();
    expect(component.contactForm.contains('email')).toBeTrue();
    expect(component.contactForm.contains('message')).toBeTrue();
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

    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Please enter a valid email address.');
  });

  it('should display validation error for name less than 2 characters', () => {
    const nameInput = fixture.nativeElement.querySelector('input[placeholder="Name"]');
    nameInput.value = 'A';
    nameInput.dispatchEvent(new Event('input'));

    component.name.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain(
      'Name must be at least 2 characters long.'
    );
  });

  it('should set the value of the message field', () => {
    const messageInput = fixture.nativeElement.querySelector('textarea');
    messageInput.value = 'This is a test message.';
    messageInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.message.value).toBe('This is a test message.');
  });

  it('should display validation error for message less than 10 characters', () => {
    const messageInput = fixture.nativeElement.querySelector('textarea');
    messageInput.value = 'short';
    messageInput.dispatchEvent(new Event('input'));

    component.message.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain(
      'Message must be at least 10 characters long.'
    );
  });
});
