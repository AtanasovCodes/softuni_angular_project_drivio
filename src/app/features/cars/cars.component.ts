import { Component, inject } from '@angular/core';
import { LoadingService } from 'app/core/services/loading/loading.service';
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
  private carsService = inject(CarsService);
  private loadingService = inject(LoadingService);

  cars: Car[] = [];

  constructor() {
    this.loadingService.show();
  }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.carsService.getAllCars({ limit: 10 }).subscribe({
      next: (response) => {
        this.cars = response.data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
    });
  }
}
