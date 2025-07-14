import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  templateUrl: './scroll-to-top-btn.component.html',
  styleUrl: './scroll-to-top-btn.component.css',
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollY > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
