import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RentalService } from 'app/features/rentals/services/rental.service';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'types/rental.interface';

@Component({
  selector: 'app-edit-rental-modal',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, DatePipe],
  templateUrl: './edit-rental-modal.component.html',
  styleUrl: './edit-rental-modal.component.css',
})
export class EditRentalModalComponent implements OnInit {
  @Input() rentalId: number | null = null;
  @Input() show = false;

  @Output() closed = new EventEmitter<void>();
  @Output() rentalUpdated = new EventEmitter<void>();

  private rentalService = inject(RentalService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  editRentalForm = this.fb.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });

  ngOnInit() {
    this.populateRentalDetails();
  }

  isFieldInvalid(controlPath: keyof typeof this.editRentalForm.controls): boolean {
    const control = this.editRentalForm.get(controlPath);
    return !!(control && control.invalid && control.touched);
  }

  populateRentalDetails() {
    if (!this.rentalId) {
      return;
    }

    this.rentalService.getRentalDetails(this.rentalId).subscribe({
      next: (rentalDetails) => {
        const startDate = new Date(rentalDetails.startDate).toISOString().split('T')[0];
        const endDate = new Date(rentalDetails.endDate).toISOString().split('T')[0];

        this.editRentalForm.patchValue({ startDate, endDate });
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to load rental details', 'Error');
      },
    });
  }

  onSubmit() {
    if (this.editRentalForm.valid && this.rentalId) {
      const updatedRentalData = {
        ...this.editRentalForm.value,
        id: this.rentalId,
      } as Omit<Rental, 'userId' | 'status' | 'price' | 'carId'>;

      this.rentalService.updateRental(updatedRentalData).subscribe({
        next: () => {
          this.toastr.success('Rental updated successfully', 'Success');
          this.rentalUpdated.emit(); // Notify parent
          this.closeModal();
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Failed to update rental', 'Error');
        },
      });
    }
  }

  closeModal() {
    this.closed.emit();
  }
}
