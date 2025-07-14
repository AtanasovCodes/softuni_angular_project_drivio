import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from 'types/user.interface';

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

  registerError: string | null = null;
  passwordMismatch = false;

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.passwordMatchValidator(),
    }
  );

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
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  passwordMatchValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { passwordMismatch: true }
        : null;
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, phoneNumber, email, password } = this.registerForm.value as {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        password: string;
      };

      this.userService.register({ firstName, lastName, phoneNumber, email, password }).subscribe({
        next: (res) => {
          const userData: User = {
            id: res.user.id,
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            email: res.user.email,
            phone: res.user.phone,
          };
          this.userService.setUser(userData, res.token);
          this.router.navigate([paths.home]);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 400) {
            this.registerError = 'Invalid registration data';
          } else if (err.status === 500) {
            this.registerError = 'Server error, please try again later';
          } else if (err.status === 409) {
            this.registerError = 'Email already exists';
          }
        },
      });
    }
  }
}
