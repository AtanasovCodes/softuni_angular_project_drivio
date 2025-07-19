import { Car } from './cars.interface';

type RentalStatus = 'free' | 'rented';

export interface Rental {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  price: number;
  status: RentalStatus;
}

export interface RentalData {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  price: number;
  status: RentalStatus;
  car: Car;
}

export interface UserRentalsResponse {
  data: RentalData[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
