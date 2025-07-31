import { paths } from 'constants/paths.constants';

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from 'app/features/user/services/user.service';
import { of, throwError } from 'rxjs';
import { User } from 'types/user.interface';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getMe']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(LoginGuard);
  });

  it('should allow activation if user is authenticated', (done) => {
    const mockUser: User = {
      id: 1,
      email: 'test@mail.com',
      firstName: 'First',
      lastName: 'Last',
      phone: '1234567890',
    };
    userServiceSpy.getMe.and.returnValue(of(mockUser));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and navigate if user is null', (done) => {
    userServiceSpy.getMe.and.returnValue(of(null));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith([`/${paths.login}`]);
      done();
    });
  });

  it('should deny access and navigate on error', (done) => {
    userServiceSpy.getMe.and.returnValue(throwError(() => new Error('Network error')));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith([`/${paths.login}`]);
      done();
    });
  });
});
