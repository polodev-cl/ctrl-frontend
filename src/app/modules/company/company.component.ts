import { NgIf } from "@angular/common";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";

import { CalendarModule } from "primeng/calendar";

import { NavbarComponent } from "@shared/navbar/navbar.component";


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './company.component.html'
})
export class CompanyComponent {

}
