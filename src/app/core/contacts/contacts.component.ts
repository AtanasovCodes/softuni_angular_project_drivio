import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', Validators.minLength(2)],
    email: ['', [Validators.email]],
    message: ['', Validators.minLength(10)],
  });

  get name() {
    return this.contactForm.get('name')!;
  }

  get email() {
    return this.contactForm.get('email')!;
  }

  get message() {
    return this.contactForm.get('message')!;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;
      console.log('Contact Form Submitted:', { name, email, message });
    } else {
      console.error('Contact Form is invalid');
    }
  }
}
