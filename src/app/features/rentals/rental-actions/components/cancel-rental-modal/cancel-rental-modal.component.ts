import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RentalService } from 'app/features/rentals/services/rental.service';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancel-rental-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './cancel-rental-modal.component.html',
  styleUrl: './cancel-rental-modal.component.css',
})
export class CancelRentalModalComponent {
  @Input() rentalId: number | null = null;
  @Input() show = false;

  @Output() closed = new EventEmitter<void>();
  @Output() rentalCancelled = new EventEmitter<void>();

  private rentalService = inject(RentalService);
  private toastr = inject(ToastrService);

  cancelRental() {
    if (!this.rentalId) {
      return;
    }

    this.rentalService.cancelRental(this.rentalId).subscribe({
      next: () => {
        this.toastr.success('Rental cancelled successfully');
        this.rentalCancelled.emit();
        this.closeModal();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to cancel rental', 'Error');
      },
    });
  }

  closeModal() {
    this.closed.emit();
  }
}
