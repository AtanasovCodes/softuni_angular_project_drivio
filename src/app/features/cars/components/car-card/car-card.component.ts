import { paths } from 'constants/paths.constants';

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from 'types/cars.interface';

import { CarFeaturesComponent } from './components/car-features/car-features.component';

@Component({
  selector: 'app-car-card',
  standalone: true,
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
  imports: [CarFeaturesComponent, RouterLink],
})
export class CarCardComponent {
  @Input() car!: Car;
  paths = paths;
}
