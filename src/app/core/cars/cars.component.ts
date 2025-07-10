import { Component, inject } from '@angular/core';
import { CarsService } from 'app/services/cars/cars.service';
import { CarCardComponent } from 'app/shared/car-card/car-card.component';
import { Car } from 'types/cars.interface';

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
