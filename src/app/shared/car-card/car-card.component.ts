import { Component, Input } from '@angular/core';
import { Car } from '../../../types/cars.interface';
import { DividerComponent } from "../divider/divider.component";
import { CarFeaturesComponent } from "../car-features/car-features.component";

@Component({
  selector: 'app-car-card',
  standalone: true,
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
  imports: [DividerComponent, CarFeaturesComponent],
})
export class CarCardComponent {
  @Input() car!: Car;
}
