import { paths } from 'constants/paths.constants';

import { Routes } from '@angular/router';

import { CarAvailabilityGuard } from './core/guards/car-vailabilitty/car-availabilitty.guard';
import { LoginGuard } from './core/guards/login/login.guard';
import { CarDetailsComponent } from './features/car-details/car-details.component';
import { CarsComponent } from './features/cars/cars.component';
import { ContactsComponent } from './features/contacts/contacts.component';
import { HomeComponent } from './features/home/home.component';
import { RentCarComponent } from './features/rentals/rent-car/rent-car.component';

export const routes: Routes = [
  { path: '', redirectTo: `/${paths.home}`, pathMatch: 'full' },
  {
    path: `${paths.home}`,
    component: HomeComponent,
  },
  {
    path: `${paths.cars}`,
    component: CarsComponent,
  },
  { path: `${paths.carDetails(':id')}`, component: CarDetailsComponent },
  {
    path: `${paths.contacts}`,
    component: ContactsComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/user/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/user/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/profile/profile.component').then((m) => m.ProfileComponent),
        canActivate: [LoginGuard],
      },
      {
        path: 'profile/rentals',
        loadComponent: () =>
          import('./features/rentals/my-rentals/my-rentals.component').then(
            (m) => m.MyRentalsComponent
          ),
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: `${paths.rentCar(':id')}`,
    component: RentCarComponent,
    canActivate: [LoginGuard, CarAvailabilityGuard],
  },
  {
    path: `${paths.logout}`,
    loadComponent: () =>
      import('./features/user/logout/logout.component').then((m) => m.LogoutComponent),
    canActivate: [LoginGuard],
  },
  {
    path: `${paths.notFound}`,
    loadComponent: () => import('./core/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },

  {
    path: 'rentals/success',
    loadComponent: () =>
      import('./features/rentals/success/success.component').then((m) => m.SuccessComponent),
    canActivate: [LoginGuard],
  },

  {
    path: '**',
    redirectTo: '/not-found',
  },
];
