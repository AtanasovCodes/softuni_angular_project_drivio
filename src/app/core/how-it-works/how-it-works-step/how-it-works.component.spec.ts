import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';

import { HowItWorksStepComponent } from './how-it-works-step.component';

import { LUCIDE_ICONS } from '../../../../constants/lucide-icons';

describe('HowItWorksStepComponent', () => {
  let component: HowItWorksStepComponent;
  let fixture: ComponentFixture<HowItWorksStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksStepComponent],
      providers: [importProvidersFrom(LucideAngularModule.pick(LUCIDE_ICONS))],
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksStepComponent);
    component = fixture.componentInstance;

    component.icon = 'Car';
    component.heading = 'Step One';
    component.description = 'This is how it works';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading inside <h4>', () => {
    const headingEl = fixture.nativeElement.querySelector('header h4');
    expect(headingEl.textContent).toBe('Step One');
  });

  it('should render the description inside <footer> <p>', () => {
    const descriptionEl = fixture.nativeElement.querySelector('footer p');
    expect(descriptionEl.textContent).toBe('This is how it works');
  });

  it('should set the correct aria-label on header and footer', () => {
    const header = fixture.nativeElement.querySelector('header');
    const footer = fixture.nativeElement.querySelector('footer');
    expect(header.getAttribute('aria-label')).toBe('Step: Step One');
    expect(footer.getAttribute('aria-label')).toBe(
      'Description: This is how it works',
    );
  });

  it('should pass the icon name to lucide-icon component', () => {
    const lucideIconDE = fixture.debugElement.query(By.css('lucide-icon'));
    expect(lucideIconDE.attributes['ng-reflect-name']).toBe('Car');
  });
});
