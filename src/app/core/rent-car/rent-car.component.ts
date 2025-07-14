import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from 'app/services/cars/cars.service';
import { Car } from 'types/cars.interface';

@Component({
  selector: 'app-rent-car',
  standalone: true,
  imports: [],
  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css',
})
export class RentCarComponent {
  private carsService = inject(CarsService);
  private activatedRoute = inject(ActivatedRoute);

  carId: string | null = null;
  carDetails: Car | null = null;

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
}
