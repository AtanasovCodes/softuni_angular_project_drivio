import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'app/shared/validators/custom-validators';
import { Car } from 'types/cars.interface';

import { CarsService } from '../cars/services/cars/cars.service';

@Component({
  selector: 'app-rent-car',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css',
})
export class RentCarComponent {
  private fb = inject(FormBuilder);
  private carsService = inject(CarsService);
  private activatedRoute = inject(ActivatedRoute);

  carId: string | null = null;
  carDetails: Car | null = null;

  rentCarForm = this.fb.group({
    rentalDuration: new FormControl(1, [Validators.required, Validators.min(1)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userEmail: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
    userPhone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]),
  });

  get carIdControl() {
    return this.rentCarForm.get('carId')!;
  }
  get rentalDuration() {
    return this.rentCarForm.get('rentalDuration')!;
  }
  get userName() {
    return this.rentCarForm.get('userName')!;
  }

  get userEmail() {
    return this.rentCarForm.get('userEmail')!;
  }

  get userPhone() {
    return this.rentCarForm.get('userPhone')!;
  }

  isFieldInvalid(controlPath: keyof typeof this.rentCarForm.controls): boolean {
    const control = this.rentCarForm.get(controlPath);
    return !!(control && control.invalid && control.touched);
  }

  isEmailInvalid(controlName: keyof typeof this.rentCarForm.controls) {
    const control = this.rentCarForm.get(controlName);
    return control && control.errors && control.errors['pattern'] && control.touched;
  }

  getCarDetails(carId: string) {
    return this.carsService.getCarById(carId);
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
      const rentalData = this.rentCarForm.value;
      const carId = this.carDetails?.id;
      console.log('Rental Data:', rentalData);
      console.log('Car ID:', carId);
    } else {
      console.error('Form is invalid');
    }
  }
}
