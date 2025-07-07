import { Component } from '@angular/core';
import { HowItWorksStepComponent } from "./how-it-works-step/how-it-works-step.component";

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [HowItWorksStepComponent],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {

}
