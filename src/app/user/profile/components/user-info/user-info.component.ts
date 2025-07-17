import { Component, Input } from '@angular/core';
import { DividerComponent } from 'app/shared/divider/divider.component';
import { LucideAngularModule } from 'lucide-angular';
import { User } from 'types/user.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [LucideAngularModule, DividerComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  @Input() user!: User | null;
}
