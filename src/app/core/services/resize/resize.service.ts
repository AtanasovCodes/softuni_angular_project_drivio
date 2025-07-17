import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private resizeSubject = new BehaviorSubject<number>(window.innerWidth);

  onResize(size: number): void {
    this.resizeSubject.next(size);
  }

  get width$(): Observable<number> {
    return this.resizeSubject.asObservable();
  }

  get isMobile$(): Observable<boolean> {
    return this.width$.pipe(
      map((width) => width < 768),
      distinctUntilChanged()
    );
  }
}
