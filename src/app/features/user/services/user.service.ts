import { LOCAL_STORAGE_KEYS } from 'constants/local-storage';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User, UserResponse } from 'types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private user$$ = new BehaviorSubject<User | null>(null);

  user$ = this.user$$.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  private setUser(user: User, token: string) {
    this.user$$.next(user);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, token);
  }

  getUser(): User | null {
    return this.user$$.value;
  }

  clearUser() {
    this.user$$.next(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
  }

  getUserId(): number | null {
    return this.user$$.value ? this.user$$.value.id : null;
  }

  getMe(): Observable<User | null> {
    if (this.user$$.value) {
      return of(this.user$$.value);
    }
    return this.httpClient.get<User>(`${environment.baseURL}/me`).pipe(
      tap((user) => this.user$$.next(user)),
      catchError(() => {
        this.user$$.next(null);
        return of(null);
      })
    );
  }

  updateProfile(userData: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
  }): Observable<User> {
    return this.httpClient.patch<User>(`${environment.baseURL}/me`, userData).pipe(
      tap((user) => {
        this.setUser(user, localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY) || '');
      })
    );
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient.post<UserResponse>(`${environment.baseURL}/login`, credentials).pipe(
      tap((response: UserResponse) => {
        this.setUser(response.user, response.token);
      })
    );
  }

  register(userData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) {
    return this.httpClient.post<UserResponse>(`${environment.baseURL}/register`, userData).pipe(
      tap((response: UserResponse) => {
        this.setUser(response.user, response.token);
      })
    );
  }

  logout() {
    this.clearUser();
    return of(null);
  }
}
