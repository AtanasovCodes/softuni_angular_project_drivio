import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label in uppercase', () => {
    component.label = 'available';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toBe('AVAILABLE');
  });

  it('should apply the correct color class', () => {
    component.color = 'secondary';
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('div'));
    expect(div.nativeElement.classList).toContain('chip-secondary');
  });
});
