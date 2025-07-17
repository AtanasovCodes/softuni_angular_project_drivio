import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from 'app/shared/validators/custom-validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  contactForm = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
    message: new FormControl('', [Validators.minLength(10)]),
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

  isFieldInvalid(controlName: keyof typeof this.contactForm.controls) {
    const control = this.contactForm.get(controlName);
    return control && control.errors && control.touched;
  }

  isEmailInvalid(controlName: keyof typeof this.contactForm.controls) {
    const control = this.contactForm.get(controlName);
    return control && control.errors && control.errors['pattern'] && control.touched;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;
      console.log('Contact Form Submitted:', { name, email, message });
      this.toastr.success('Message sent successfully', 'Thank you!');
    } else {
      this.toastr.error('Please fill out the form correctly', 'Error');
    }

    this.contactForm.reset();
  }
}
