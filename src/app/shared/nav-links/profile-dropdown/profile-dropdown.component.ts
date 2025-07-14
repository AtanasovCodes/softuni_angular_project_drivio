import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LINKS } from './profile-dropdown.constants';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterLink, ClickOutsideDirective],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css',
})
export class ProfileDropdownComponent {
  links = LINKS;
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
