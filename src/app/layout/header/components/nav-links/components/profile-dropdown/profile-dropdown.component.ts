import { PROFILE_MENU_LINKS } from 'constants/profile-menu.constants';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ClickOutsideDirective } from './directives/click-outside.directive';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterLink, ClickOutsideDirective],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css',
})
export class ProfileDropdownComponent {
  links = PROFILE_MENU_LINKS;
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
