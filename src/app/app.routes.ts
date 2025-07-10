import { Routes } from '@angular/router';

import { CarsComponent } from './core/cars/cars.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { HomeComponent } from './core/home/home.component';

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
  {
    path: 'contacts',
    component: ContactsComponent,
  },
];
