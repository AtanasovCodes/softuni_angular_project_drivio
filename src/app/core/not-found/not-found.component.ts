import { Component, inject } from '@angular/core';
import { CarsService } from 'app/services/cars/cars.service';
import { Car } from 'types/cars.interface';

import { FeaturedCarsComponent } from '../featured-cars/featured-cars.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FeaturedCarsComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  cars: Car[] = [];

  private carsService = inject(CarsService);

  ngOnInit() {
    this.carsService.getAllCars({ limit: 3 }).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
