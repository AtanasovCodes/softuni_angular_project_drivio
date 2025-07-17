import { paths } from 'constants/paths.constants';

import { Routes } from '@angular/router';

import { CarDetailsComponent } from './core/car-details/car-details.component';
import { CarsComponent } from './core/cars/cars.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { CarAvailabilityGuard } from './core/guards/car-availabilitty.guard';
import { LoginGuard } from './core/guards/login.guard';
import { HomeComponent } from './core/home/home.component';
import { RentCarComponent } from './core/rent-car/rent-car.component';

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
        loadComponent: () => import('./user/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./user/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./user/profile/profile.component').then((m) => m.ProfileComponent),
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
    loadComponent: () => import('./core/logout/logout.component').then((m) => m.LogoutComponent),
    canActivate: [LoginGuard],
  },
  {
    path: `${paths.notFound}`,
    loadComponent: () =>
      import('./core/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },

  {
    path: '**',
    redirectTo: '/not-found',
  },
];
