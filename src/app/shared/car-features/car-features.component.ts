import { Component, Input } from '@angular/core';

import { capitalizeWords } from './car-features.utils';


@Component({
  selector: 'app-car-features',
  standalone: true,
  imports: [],
  templateUrl: './car-features.component.html',
  styleUrl: './car-features.component.css',
})
export class CarFeaturesComponent {
  @Input() features: string[] = [];

  capitalizeWords = capitalizeWords;
}
