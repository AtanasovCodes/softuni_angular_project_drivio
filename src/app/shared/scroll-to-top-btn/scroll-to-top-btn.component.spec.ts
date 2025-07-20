import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ScrollToTopComponent } from './scroll-to-top-btn.component';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the button when scroll is less than 200px', () => {
    window.scrollY = 100;
    component.onWindowScroll();
    fixture.detectChanges();
    expect(component.isVisible).toBeFalse();
  });

  it('should show the button when scroll is greater than 200px', () => {
    window.scrollY = 300;
    component.onWindowScroll();
    fixture.detectChanges();
    expect(component.isVisible).toBeTrue();
  });

  it('should scroll to top when button is clicked', fakeAsync(() => {
    spyOn(window, 'scrollTo');

    component.isVisible = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    tick();

    expect(window.scrollTo as jasmine.Spy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  }));
});
