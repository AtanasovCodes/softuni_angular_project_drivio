import { Component, inject } from '@angular/core';
import { CarsService } from 'app/services/cars/cars.service';
import { Car } from 'types/cars.interface';

import { FeaturedCarsComponent } from '../featured-cars/featured-cars.component';
import { HeroComponent } from '../hero/hero.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

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
    this.carsService.getAllCars({ limit: 3 }).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
