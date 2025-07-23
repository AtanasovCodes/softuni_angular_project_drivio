import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Rental, UserRentalsResponse } from 'types/rental.interface';

type CreateRental = Omit<Rental, 'id' | 'status' | 'price' | 'userId'>;

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private httpClient = inject(HttpClient);

  createRental(rentalData: CreateRental) {
    return this.httpClient.post(`${environment.baseURL}/rentals`, rentalData);
  }

  cancelRental(rentalId: number) {
    return this.httpClient.delete(`${environment.baseURL}/rentals/${rentalId}`);
  }

  getRentalDetails(rentalId: number) {
    return this.httpClient.get<Rental>(`${environment.baseURL}/rentals/${rentalId}`);
  }

  getUserRentals({ userId }: { userId: number | null }) {
    return this.httpClient.get<UserRentalsResponse>(
      `${environment.baseURL}/rentals?userId=${userId}`
    );
  }

  updateRental(rentalData: Omit<Rental, 'userId' | 'status' | 'price' | 'carId'>) {
    return this.httpClient.put<Rental>(
      `${environment.baseURL}/rentals/${rentalData.id}`,
      rentalData
    );
  }
}
