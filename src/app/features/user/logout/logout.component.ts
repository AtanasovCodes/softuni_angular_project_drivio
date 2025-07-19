import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/features/user/services/user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    this.userService.logout().subscribe({
      next: () => {
        this.redirectToHome();
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }

  private redirectToHome() {
    this.router.navigate([`/${paths.home}`]);
  }
}
