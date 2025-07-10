type CarStatus = 'free' | 'rented';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  status: CarStatus;
  pricePerDay: number;
  pricePerHour: number;
  description: string;
  image: string;
  features: string[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CarListResponse {
  data: Car[];
  pagination: Pagination;
}

