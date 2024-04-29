import { Component } from '@angular/core';
import { NavbarComponent } from "@shared/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-agency',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './agency.component.html'
})
export class AgencyComponent {

}
