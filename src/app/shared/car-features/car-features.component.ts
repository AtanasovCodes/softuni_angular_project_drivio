import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-features',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './car-features.component.html',
  styleUrl: './car-features.component.css',
})
export class CarFeaturesComponent {
  @Input() features: string[] = [];
}
