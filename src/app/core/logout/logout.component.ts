import { paths } from 'constants/paths.constants';

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/user/services/user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userService.clearUser();
    this.router.navigate([paths.home]);
  }
}
