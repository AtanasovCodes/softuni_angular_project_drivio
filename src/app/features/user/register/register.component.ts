import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomValidators } from 'app/shared/validators/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  paths = paths;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  passwordMismatch = false;

  registerForm = this.fb.group({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{10,15}$/),
    ]),
    email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
    passwordGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: CustomValidators.fieldsMatch('password', 'confirmPassword'),
      }
    ),
  });

  get firstName() {
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('passwordGroup.password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('passwordGroup.confirmPassword')!;
  }

  get passwordGroup(): FormGroup {
    return this.registerForm.get('passwordGroup') as FormGroup;
  }

  isFieldInvalid(controlPath: string) {
    const control = this.registerForm.get(controlPath);
    return !!(control && control.invalid && control.touched);
  }

  isEmailInvalid(controlName: keyof typeof this.registerForm.controls) {
    const control = this.registerForm.get(controlName);
    return control && control.errors && control.errors['pattern'] && control.touched;
  }

  isPasswordMismatch() {
    return this.passwordGroup.hasError('fieldsMismatch') && this.confirmPassword.touched;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, phoneNumber, email } = this.registerForm.value as {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
      };

      this.userService
        .register({
          firstName,
          lastName,
          phoneNumber,
          email,
          password: this.password.value as string,
        })
        .subscribe({
          next: () => {
            this.toastr.success('Registration successful', 'Welcome');
            this.router.navigate([paths.cars]);
          },
          error: (err) => {
            if (err.status === 400) {
              this.toastr.error('Invalid registration data', 'Registration Failed');
            } else if (err.status === 500) {
              this.toastr.error('Server error, please try again later', 'Registration Failed');
            } else if (err.status === 409) {
              this.toastr.error('Email already exists', 'Registration Failed');
            }
          },
        });
    }
  }
}
