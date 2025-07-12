import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { LucideIconName } from '../../../../constants/lucide-icons.constants';

@Component({
  selector: 'app-how-it-works-step',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './how-it-works-step.component.html',
  styleUrl: './how-it-works-step.component.css',
})
export class HowItWorksStepComponent {
  @Input() icon!: LucideIconName;
  @Input() heading!: string;
  @Input() description!: string;
}
