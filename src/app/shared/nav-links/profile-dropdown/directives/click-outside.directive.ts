import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
