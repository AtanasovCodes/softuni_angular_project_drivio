import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from 'app/user/services/user.service';
import { User } from 'types/user.interface';

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

  loginError: string | null = null;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.email.value as string;
      const password = this.password.value as string;

      this.userService.login({ email, password }).subscribe({
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
          if (err.status === 401) {
            this.loginError = 'Invalid credentials';
          } else if (err.status === 500) {
            this.loginError = 'Server error, please try again later';
          }
          console.error(err);
        },
      });
    }
  }
}
