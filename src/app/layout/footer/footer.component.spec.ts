import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should display project name', () => {
    const projectText = fixture.debugElement.query(By.css('p')).nativeElement.textContent;
    expect(projectText).toContain('SoftUni Angular Project');
  });

  it('should have a link to GitHub with correct URL and text', () => {
    const link = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(link.textContent.trim()).toBe('Alex');
    expect(link.getAttribute('href')).toBe('https://github.com/AtanasovCodes');
    expect(link.getAttribute('target')).toBe('_blank');
  });
});
