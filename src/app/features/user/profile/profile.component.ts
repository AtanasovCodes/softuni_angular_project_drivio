import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from 'types/user.interface';

import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, CommonModule, UserInfoComponent, UserEditFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  inEditMode = false;
  user: User | null = null;

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }
}
