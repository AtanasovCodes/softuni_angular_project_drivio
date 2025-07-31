import { Component, inject } from '@angular/core';
import { CarCardComponent } from 'app/features/cars/components/car-card/car-card.component';

import { Car } from '../../../../../types/cars.interface';
import { CarsService } from '../../services/cars/cars.service';

@Component({
  selector: 'app-featured-cars',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './featured-cars.component.html',
  styleUrl: './featured-cars.component.css',
})
export class FeaturedCarsComponent {
  cars: Car[] = [];

  private carsService = inject(CarsService);

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carsService
      .getAllCars({
        limit: 3,
      })
      .subscribe({
        next: (cars) => {
          this.cars = cars.data;
        },
        error: (error) => {
          console.error('Error fetching featured cars:', error);
        },
      });
  }
}
