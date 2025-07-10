import { Component, Input } from '@angular/core';

import { ChipColor } from './types/chip.component.types';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
})
export class ChipComponent {
  @Input() label = '';
  @Input() color: ChipColor = 'primary';
  @Input() disabled = false;

  get colorClass(): string {
    return `chip chip-${this.color}`;
  }

  get labelUpperCase(): string {
    return this.label.toUpperCase();
  }
}
