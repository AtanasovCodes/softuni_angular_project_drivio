import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Routes } from '@angular/router';

import { NavLinksComponent } from './nav-links.component';

@Component({ template: '' })
class DummyComponent {}

describe('NavLinksComponent', () => {
  let fixture: ComponentFixture<NavLinksComponent>;
  let element: HTMLElement;

  const testRoutes: Routes = [
    { path: '', component: DummyComponent },
    { path: 'cars', component: DummyComponent },
    { path: 'contacts', component: DummyComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinksComponent],
      providers: [provideRouter(testRoutes)],
      // We need a dummy component to satisfy the router's requirements
      declarations: [DummyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinksComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should render 3 nav links', () => {
    const links = element.querySelectorAll('a');
    expect(links.length).toBe(3);
  });

  it('should link to correct routes', () => {
    const links = element.querySelectorAll('a');
    expect(links[0].getAttribute('ng-reflect-router-link')).toBe('/');
    expect(links[1].getAttribute('ng-reflect-router-link')).toBe('/cars');
    expect(links[2].getAttribute('ng-reflect-router-link')).toBe('/contacts');
  });
});
