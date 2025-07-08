import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FeaturedCarsComponent } from './core/featured-cars/featured-cars.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { HeroComponent } from './core/hero/hero.component';
import { HowItWorksComponent } from './core/how-it-works/how-it-works.component';
import { CarsService } from './services/cars/cars.service';

import { Car } from '../types/cars.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    HowItWorksComponent,
    FeaturedCarsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'drivio';
  cars: Car[] = [];

  private carsService = inject(CarsService);

  ngOnInit() {
    this.carsService.getAllCars({ limit: 3 }).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
