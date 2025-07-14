import { paths } from 'constants/paths.constants';

import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarsService } from 'app/services/cars/cars.service';
import { CarCardComponent } from 'app/shared/car-card/car-card.component';
import { ChipComponent } from 'app/shared/chip/chip.component';
import { DividerComponent } from 'app/shared/divider/divider.component';
import { UserService } from 'app/user/services/user.service';
import { Car } from 'types/cars.interface';

@Component({
  selector: 'app-car-details-component',
  standalone: true,
  imports: [ChipComponent, DividerComponent, RouterLink, CarCardComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent {
  private carsService = inject(CarsService);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);

  car: Car | null = null;
  listWithMoreCars: Car[] = [];
  paths = paths;

  isLoggedIn = this.userService.isLoggedIn;

  getCarDetails(carId: string) {
    return this.carsService.getCarById(carId);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const carId = params.get('id');
      if (!carId) {
        console.error('Car ID is not provided');
        return;
      }

      this.getCarDetails(carId).subscribe((carDetails) => {
        this.car = carDetails;
      });

      this.carsService.getAllCars({ limit: 3, excludeId: carId }).subscribe((cars) => {
        this.listWithMoreCars = cars.data;
      });
    });
  }
}
