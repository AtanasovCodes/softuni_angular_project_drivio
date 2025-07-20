import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  template: `
    <div appClickOutside (clickOutside)="onClickedOutside($event)" id="host">
      <button id="inside-btn">Inside</button>
    </div>
    <button id="outside-btn">Outside</button>
  `,
})
class TestHostComponent {
  outsideClicked = false;

  onClickedOutside() {
    this.outsideClicked = true;
  }
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let hostEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickOutsideDirective],
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    hostEl = fixture.debugElement.query(By.directive(ClickOutsideDirective));
    fixture.detectChanges();
  });

  it('should create an instance of the directive', () => {
    expect(hostEl).toBeTruthy();
  });

  it('should NOT emit clickOutside when clicking inside', () => {
    const insideButton = fixture.nativeElement.querySelector('#inside-btn');
    insideButton.click();
    fixture.detectChanges();

    expect(component.outsideClicked).toBeFalse();
  });

  it('should emit clickOutside when clicking outside', () => {
    const outsideButton = fixture.nativeElement.querySelector('#outside-btn');
    outsideButton.click();
    fixture.detectChanges();

    expect(component.outsideClicked).toBeTrue();
  });
});
