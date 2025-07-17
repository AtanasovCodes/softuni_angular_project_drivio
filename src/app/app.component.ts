import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MetaService } from './core/services/meta/meta.service';
import { ResizeService } from './core/services/resize/resize.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ScrollToTopComponent } from './shared/scroll-to-top-btn/scroll-to-top-btn.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private metaService = inject(MetaService);
  private resizeService = inject(ResizeService);

  ngOnInit() {
    this.metaService.setMetaTags();
    this.resizeService.onResize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.resizeService.onResize(width);
  }
}
