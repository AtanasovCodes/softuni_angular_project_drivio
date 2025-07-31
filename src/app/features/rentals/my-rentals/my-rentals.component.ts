import { paths } from 'constants/paths.constants';

import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoadingService } from 'app/core/services/loading/loading.service';
import { CancelRentalModalComponent } from 'app/features/rentals/rental-actions/components/cancel-rental-modal/cancel-rental-modal.component';
import { EditRentalModalComponent } from 'app/features/rentals/rental-actions/components/edit-rental-modal/edit-rental-modal.component';
import { UserService } from 'app/features/user/services/user.service';
import { RentalData } from 'types/rental.interface';

import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-my-rentals',
  standalone: true,
  imports: [DatePipe, CancelRentalModalComponent, EditRentalModalComponent],
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.css',
})
export class MyRentalsComponent implements OnInit {
  private rentalService = inject(RentalService);
  private userService = inject(UserService);
  private userId = this.userService.getUserId();
  private loadingService = inject(LoadingService);

  rentals: RentalData[] = [];
  paths = paths;
  errorMessage: string | null = null;
  showCancelRentalModal = false;
  showEditRentalModal = false;
  rentalId: number | null = null;

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

  openCancelRentalModal(rentalId: number): void {
    this.rentalId = rentalId;
    this.showCancelRentalModal = true;
  }

  openEditRentalModal(rentalId: number): void {
    this.rentalId = rentalId;
    this.showEditRentalModal = true;
  }

  closeCancelRentalModal(): void {
    this.showCancelRentalModal = false;
    this.rentalId = null;
  }

  closeEditRentalModal(): void {
    this.showEditRentalModal = false;
    this.rentalId = null;
  }

  onRentalUpdated() {
    this.loadRentals();
    this.closeEditRentalModal();
  }

  onRentalCancelled() {
    this.loadRentals();
    this.closeCancelRentalModal();
  }
}
