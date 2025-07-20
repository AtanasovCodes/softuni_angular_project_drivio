import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, of, switchMap, takeWhile, timeout, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  pingUntilAwake() {
    return timer(0, 1000).pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/health`, { responseType: 'text' }).pipe(
          timeout(2000),
          catchError(() => of('unreachable'))
        )
      ),
      takeWhile((status) => status === 'unreachable', true)
    );
  }
}
