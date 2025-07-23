import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
