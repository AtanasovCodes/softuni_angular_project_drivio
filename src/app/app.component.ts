import { LOCAL_STORAGE_KEYS } from 'constants/local-storage';

import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { BackendService } from './core/services/backend/backend.service';
import { LoadingService } from './core/services/loading/loading.service';
import { MetaService } from './core/services/meta/meta.service';
import { ResizeService } from './core/services/resize/resize.service';
import { UserService } from './features/user/services/user.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ScrollToTopComponent } from './shared/scroll-to-top-btn/scroll-to-top-btn.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    LoadingSpinnerComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private metaService = inject(MetaService);
  private resizeService = inject(ResizeService);
  private userService = inject(UserService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private backendService = inject(BackendService);
  loading$: Observable<boolean> = this.loadingService.loading$;
  isWakingUp = false;

  ngOnInit() {
    this.metaService.setMetaTags();
    this.resizeService.onResize(window.innerWidth);
    this.wakeupServer();
    this.getInitialUser();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private getInitialUser() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    if (token) {
      this.userService.getMe().subscribe();
    }
  }

  private wakeupServer() {
    this.backendService.pingUntilAwake().subscribe((status) => {
      if (status === 'unreachable') {
        this.isWakingUp = true;
        console.log('Waiting for server to wake up...');
      } else {
        this.isWakingUp = false;
        console.log('Server is awake:', status);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.resizeService.onResize(width);
  }
}
