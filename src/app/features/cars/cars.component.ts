import { Component, inject } from '@angular/core';
import { Car } from 'types/cars.interface';

import { CarCardComponent } from './components/car-card/car-card.component';
import { CarsService } from './services/cars/cars.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent {
  cars: Car[] = [];

  private carsService = inject(CarsService);

  ngOnInit() {
    this.carsService.getAllCars({ limit: 10 }).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
