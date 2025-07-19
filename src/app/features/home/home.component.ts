import { Component, inject } from '@angular/core';
import { Car } from 'types/cars.interface';

import { HeroComponent } from './components/hero/hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';

import { FeaturedCarsComponent } from '../../shared/featured-cars/featured-cars.component';
import { CarsService } from '../cars/services/cars/cars.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HowItWorksComponent, HeroComponent, FeaturedCarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
