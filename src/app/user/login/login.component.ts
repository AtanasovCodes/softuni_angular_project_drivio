import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CustomValidators } from 'app/shared/validators/custom-validators';
import { UserService } from 'app/user/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  paths = paths;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  isFieldInvalid(controlName: keyof typeof this.loginForm.controls) {
    const control = this.loginForm.get(controlName);
    return control && control.errors && control.touched;
  }

  isEmailInvalid(controlName: keyof typeof this.loginForm.controls) {
    const control = this.loginForm.get(controlName);
    return control && control.errors && control.errors['pattern'] && control.touched;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.email.value as string;
      const password = this.password.value as string;

      this.userService.login({ email, password }).subscribe({
        next: () => {
          this.toastr.success('Login successful', 'Welcome');
          this.router.navigate([paths.home]);
        },
        error: (err) => {
          if (err.status === 401) {
            this.toastr.error('Invalid credentials', 'Login Failed');
          } else if (err.status === 500) {
            this.toastr.error('Server error, please try again later', 'Login Failed');
          }
        },
      });
    }
  }
}
