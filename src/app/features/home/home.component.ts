import { Component } from '@angular/core';

import { HeroComponent } from './components/hero/hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';

import { FeaturedCarsComponent } from '../cars/components/featured-cars/featured-cars.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HowItWorksComponent, HeroComponent, FeaturedCarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
