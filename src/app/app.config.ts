import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { routes } from './app.routes';

import { LUCIDE_ICONS } from '../constants/lucide-icons.constants';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick(LUCIDE_ICONS)),
  ],
};
