import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from 'app/features/user/services/user.service';

import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterLink, ProfileDropdownComponent],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.css',
})
export class NavLinksComponent {
  paths = paths;
  private userService = inject(UserService);

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }
}
