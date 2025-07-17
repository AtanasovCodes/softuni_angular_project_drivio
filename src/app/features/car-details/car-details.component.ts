import { paths } from 'constants/paths.constants';

import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MetaService } from 'app/core/services/meta/meta.service';
import { ChipComponent } from 'app/shared/chip/chip.component';
import { DividerComponent } from 'app/shared/divider/divider.component';
import { Car } from 'types/cars.interface';

import { CarCardComponent } from '../cars/components/car-card/car-card.component';
import { CarsService } from '../cars/services/cars/cars.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-car-details-component',
  standalone: true,
  imports: [ChipComponent, DividerComponent, RouterLink, CarCardComponent, TitleCasePipe],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  private carsService = inject(CarsService);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private metaService = inject(MetaService);

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

        this.metaService.setMetaTags({
          title: `Drivio - ${this.car?.brand} ${this.car?.model}`,
          description: this.car?.description || 'Rent a car easily with Drivio',
          image: this.car ? this.car.image : '/assets/images/drivio.webp',
          type: 'article',
        });
      });

      this.carsService.getAllCars({ limit: 3, excludeId: carId }).subscribe((cars) => {
        this.listWithMoreCars = cars.data;
      });
    });
  }

  ngOnDestroy() {
    this.metaService.setMetaTags();
  }
}
