import { paths } from 'constants/paths.constants';

import { Routes } from '@angular/router';

import { CarDetailsComponent } from './core/car-details/car-details.component';
import { CarsComponent } from './core/cars/cars.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { HomeComponent } from './core/home/home.component';
import { LogoutComponent } from './core/logout/logout.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { RentCarComponent } from './core/rent-car/rent-car.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

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
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: `${paths.rentCar(':id')}`,
    component: RentCarComponent,
  },
  {
    path: `${paths.logout}`,
    component: LogoutComponent,
  },
  {
    path: `${paths.notFound}`,
    component: NotFoundComponent,
  },

  {
    path: '**',
    redirectTo: '/not-found',
  },
];
