import { PROFILE_MENU_LINKS } from 'constants/profile-menu.constants';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-profile-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mobile-profile-menu.component.html',
  styleUrl: './mobile-profile-menu.component.css',
})
export class MobileProfileMenuComponent {
  links = PROFILE_MENU_LINKS;
}
