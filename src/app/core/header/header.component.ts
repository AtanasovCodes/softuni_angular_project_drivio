import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/logo/logo.component";
import { NavLinksComponent } from "../../shared/nav-links/nav-links.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, NavLinksComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
