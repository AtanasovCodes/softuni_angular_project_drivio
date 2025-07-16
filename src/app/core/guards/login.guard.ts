import { paths } from 'constants/paths.constants';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'app/user/services/user.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

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
        return [false];
      })
    );
  }
}
