import { paths } from 'constants/paths.constants';

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'app/features/user/services/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.userService.getMe().pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.router.navigate([`/${paths.login}`]);
        return false;
      }),
      catchError(() => {
        this.router.navigate([`/${paths.login}`]);
        return of(false);
      })
    );
  }
}
