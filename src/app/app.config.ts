import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrModule } from 'ngx-toastr';

import { routes } from './app.routes';
import { tokenInterceptor } from './interceptors/token.interceptor';

import { LUCIDE_ICONS } from '../constants/lucide-icons.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick(LUCIDE_ICONS)),
    importProvidersFrom(ToastrModule.forRoot({})),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
