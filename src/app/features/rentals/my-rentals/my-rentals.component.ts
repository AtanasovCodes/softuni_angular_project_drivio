import { paths } from 'constants/paths.constants';

import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingService } from 'app/core/services/loading/loading.service';
import { UserService } from 'app/features/user/services/user.service';
import { RentalData } from 'types/rental.interface';

import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-my-rentals',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.css',
})
export class MyRentalsComponent {
  private rentalService = inject(RentalService);
  private userService = inject(UserService);
  private userId = this.userService.getUserId();
  private loadingService = inject(LoadingService);

  rentals: RentalData[] = [];
  paths = paths;
  errorMessage: string | null = null;

  constructor() {
    this.loadingService.show();
  }

  ngOnInit() {
    this.loadRentals();
  }

  loadRentals() {
    this.rentalService.getUserRentals({ userId: this.userId }).subscribe({
      next: (rentals) => {
        this.rentals = rentals.data;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error loading rentals:', error);
        this.errorMessage = 'Failed to load rentals. Please try again later.';
        this.loadingService.hide();
      },
    });
  }

  cancelRental(rentalId: number) {
    this.rentalService.cancelRental(rentalId).subscribe({
      next: () => {
        this.loadRentals();
      },
      error: (error) => {
        console.error('Error cancelling rental:', error);
        this.errorMessage = 'Failed to cancel rental. Please try again later.';
      },
    });
  }
}
