import { LOCAL_STORAGE_KEYS } from 'constants/local-storage';

import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { tokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header if token exists in localStorage', () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, 'mock-token');

    httpClient.get('/api/test-endpoint').subscribe();

    const req = httpTestingController.expectOne('/api/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

    req.flush({});
  });

  it('should not add Authorization header if token does not exist', () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);

    httpClient.get('/test-endpoint').subscribe();

    const req = httpTestingController.expectOne('/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });
});
