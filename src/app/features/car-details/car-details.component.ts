import { paths } from 'constants/paths.constants';

import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingService } from 'app/core/services/loading/loading.service';
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
  private loadingService = inject(LoadingService);

  car: Car | null = null;
  carId: string | null = null;
  listWithMoreCars: Car[] = [];
  paths = paths;
  isLoggedIn = this.userService.isLoggedIn;

  constructor() {
    this.loadingService.show();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const carId = params.get('id');
      if (!carId) {
        console.error('Car ID is not provided');
        return;
      }
      this.carId = carId;
      this.getCarDetails(carId);
      this.getMoreCars();
    });
  }

  ngOnDestroy() {
    this.metaService.setMetaTags();
  }

  getCarDetails(carId: string) {
    this.loadingService.show();
    this.carsService.getCarById(carId).subscribe({
      next: (carDetails) => {
        this.car = carDetails;
        this.metaService.setMetaTags({
          title: `Drivio - ${this.car?.brand} ${this.car?.model}`,
          description: this.car?.description || 'Rent a car easily with Drivio',
          image: this.car.image,
          type: 'article',
        });
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
    });
  }

  getMoreCars() {
    if (!this.carId) {
      return;
    }

    this.carsService.getAllCars({ limit: 3, excludeId: Number(this.carId) }).subscribe({
      next: (cars) => {
        this.listWithMoreCars = cars.data;
      },
      error: (error) => {
        console.error('Error fetching more cars:', error);
      },
    });
  }
}
