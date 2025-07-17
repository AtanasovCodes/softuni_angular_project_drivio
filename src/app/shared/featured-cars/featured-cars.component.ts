import { Component, Input } from '@angular/core';
import { CarCardComponent } from 'app/features/cars/components/car-card/car-card.component';

import { Car } from '../../../types/cars.interface';

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
