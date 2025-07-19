import { LOCAL_STORAGE_KEYS } from 'constants/local-storage';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { User, UserResponse } from 'types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;
  private httpClient = inject(HttpClient);

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor() {
    this.initializeUserFromStorage();
  }

  initializeUserFromStorage() {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY);
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch {
        this.clearUser();
      }
    }
  }

  setUser(user: User, token: string) {
    this.user = user;
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_KEY, JSON.stringify(user));
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, token);
  }
  getUser(): User | null {
    return this.user;
  }

  getMe(): Observable<User | null> {
    return this.httpClient.get<User>(`${environment.baseURL}/me`).pipe(catchError(() => of(null)));
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_KEY);
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

  getUserId(): number | null {
    return this.user ? this.user.id : null;
  }

  updateProfile(userData: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
  }): Observable<User> {
    return this.httpClient.patch<User>(`${environment.baseURL}/me`, userData);
  }
}
