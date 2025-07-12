import { Routes } from '@angular/router';

import { CarDetailsComponent } from './core/car-details/car-details.component';
import { CarsComponent } from './core/cars/cars.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cars',
    component: CarsComponent,
  },
  { path: 'cars/details/:id', component: CarDetailsComponent },
  {
    path: 'contacts',
    component: ContactsComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
