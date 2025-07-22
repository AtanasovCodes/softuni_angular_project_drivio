import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'app/core/services/loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'types/cars.interface';

import { CarsService } from '../../cars/services/cars/cars.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-rent-car',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css',
})
export class RentCarComponent {
  private fb = inject(FormBuilder);
  private carsService = inject(CarsService);
  private rentalService = inject(RentalService);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  carId: string | null = null;
  carDetails: Car | null = null;

  rentCarForm = this.fb.group({
    startDate: new FormControl<string>(this.getToday(), [Validators.required]),
    endDate: new FormControl<string>(this.getToday(), [Validators.required]),
  });

  get rentalDuration() {
    return this.rentCarForm.get('rentalDuration')!;
  }

  isFieldInvalid(controlPath: keyof typeof this.rentCarForm.controls): boolean {
    const control = this.rentCarForm.get(controlPath);
    return !!(control && control.invalid && control.touched);
  }

  getCarDetails(carId: string) {
    return this.carsService.getCarById(carId);
  }

  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const carId = params.get('id');
      if (!carId) {
        console.error('Car ID is not provided');
        return;
      }

      this.getCarDetails(carId).subscribe((carDetails) => {
        this.carDetails = carDetails;
      });
    });
  }

  onSubmit() {
    if (this.rentCarForm.valid) {
      const startDateValue = this.rentCarForm.get('startDate')?.value;
      const endDateValue = this.rentCarForm.get('endDate')?.value;

      if (!startDateValue || !endDateValue) {
        this.toastr.error('Start date and end date are required', 'Error');
        return;
      }

      // Format to ISO string in UTC (e.g., "2024-06-01T10:00:00Z")
      const formattedStartDate = new Date(startDateValue).toISOString();
      const formattedEndDate = new Date(endDateValue).toISOString();

      const rentalData = {
        carId: Number(this.carDetails?.id),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      this.loadingService.show();

      this.rentalService.createRental(rentalData).subscribe({
        next: () => {
          this.toastr.success('Rental created successfully', 'Success');
          this.router.navigate(['/rentals/success']);
          this.loadingService.hide();
        },
        error: () => {
          this.toastr.error('Failed to create rental', 'Error');
          this.loadingService.hide();
        },
      });
    }
  }
}
