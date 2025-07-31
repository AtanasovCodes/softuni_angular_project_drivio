import { paths } from 'constants/paths.constants';

import { AsyncPipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingService } from 'app/core/services/loading/loading.service';
import { MetaService } from 'app/core/services/meta/meta.service';
import { ChipComponent } from 'app/shared/chip/chip.component';
import { DividerComponent } from 'app/shared/divider/divider.component';
import { CancelRentalModalComponent } from 'app/features/rentals/rental-actions/components/cancel-rental-modal/cancel-rental-modal.component';
import { EditRentalModalComponent } from 'app/features/rentals/rental-actions/components/edit-rental-modal/edit-rental-modal.component';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Car } from 'types/cars.interface';

import { CarCardComponent } from '../cars/components/car-card/car-card.component';
import { CarsService } from '../cars/services/cars/cars.service';
import { RentalService } from '../rentals/services/rental.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-car-details-component',
  standalone: true,
  imports: [
    ChipComponent,
    DividerComponent,
    RouterLink,
    CarCardComponent,
    TitleCasePipe,
    AsyncPipe,
    CurrencyPipe,
    CancelRentalModalComponent,
    EditRentalModalComponent,
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  private carsService = inject(CarsService);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private metaService = inject(MetaService);
  private loadingService = inject(LoadingService);
  private rentalService = inject(RentalService);
  private toastr = inject(ToastrService);

  car: Car | null = null;
  carId: string | null = null;
  rentalId: number | null = null;
  listWithMoreCars: Car[] = [];
  paths = paths;
  isLoggedIn$ = this.userService.isLoggedIn$;
  isOwner$ = this.isOwner();
  showCancelRentalModal = false;
  showEditRentalModal = false;

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

      this.isOwner();
    });
  }

  ngOnDestroy() {
    this.metaService.setMetaTags();
  }

  toggleCancelRentalModal() {
    this.showCancelRentalModal = !this.showCancelRentalModal;
    if (this.showCancelRentalModal) {
      this.loadingService.hide();
    }
  }

  toggleEditRentalModal() {
    if (!this.rentalId) {
      this.toastr.error('No rental found to edit', 'Error');
      return;
    }
    this.showEditRentalModal = !this.showEditRentalModal;
    this.loadingService.hide();
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

  isOwner(): Observable<boolean> {
    return this.userService.getMe().pipe(
      map((user) => user?.id),
      catchError(() => of(null)),
      switchMap((userId) => {
        if (!userId || !this.carId) {
          return of(false);
        }
        return this.rentalService.getUserRentals({ userId }).pipe(
          map((rentals) => {
            const rental = rentals.data.find((rental) => rental.carId === Number(this.carId));
            if (rental) {
              this.rentalId = rental.id;
              return true;
            }
            return false;
          }),
          catchError(() => of(false))
        );
      })
    );
  }

  editRental() {
    if (!this.carId) {
      return;
    }
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

  openCancelRentalModal() {
    if (!this.rentalId) {
      this.toastr.error('No rental found to cancel', 'Error');
      return;
    }
    this.showCancelRentalModal = true;
  }

  openEditRentalModal() {
    if (!this.rentalId) {
      this.toastr.error('No rental found to edit', 'Error');
      return;
    }
    this.showEditRentalModal = true;
  }

  closeCancelRentalModal() {
    this.showCancelRentalModal = false;
  }

  closeEditRentalModal() {
    this.showEditRentalModal = false;
  }

  onRentalCanceled() {
    this.toastr.success('Rental canceled');
    this.getCarDetails(this.carId!);
    this.closeCancelRentalModal();
  }

  onRentalUpdated() {
    this.toastr.success('Rental updated');
    this.getCarDetails(this.carId!);
    this.closeEditRentalModal();
  }
}
