import { Component, Input } from '@angular/core';

import { Car } from '../../../types/cars.interface';
import { CarCardComponent } from '../../shared/car-card/car-card.component';

@Component({
  selector: 'app-featured-cars',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './featured-cars.component.html',
  styleUrl: './featured-cars.component.css',
})
export class FeaturedCarsComponent {
  @Input() cars: Car[] = [];
}
