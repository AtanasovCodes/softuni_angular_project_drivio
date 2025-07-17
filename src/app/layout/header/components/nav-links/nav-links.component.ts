import { paths } from 'constants/paths.constants';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ResizeService } from 'app/core/services/resize/resize.service';
import { UserService } from 'app/features/user/services/user.service';
import { Observable } from 'rxjs/internal/Observable';

import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { menuSlide } from './nav-links.animations';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, ProfileDropdownComponent],
  templateUrl: './nav-links.component.html',
  animations: [menuSlide],
  styleUrl: './nav-links.component.css',
})
export class NavLinksComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private resizeService = inject(ResizeService);

  paths = paths;
  isMenuOpen = false;

  isMobile$!: Observable<boolean>;

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  ngOnInit() {
    this.isMobile$ = this.resizeService.isMobile$;
  }

  ngOnDestroy() {
    // Reset body overflow when component is destroyed
    document.body.style.overflow = '';
  }
}
