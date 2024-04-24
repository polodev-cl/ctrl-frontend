import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { TablasEditarUsuarioComponent } from "../tablas-editar-usuario/tablas-editar-usuario.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
  standalone: true,
  imports: [
    DividerModule,
    RouterLink,
    NgForOf,
    NgIf,
    TablasEditarUsuarioComponent,
    InputTextModule,
    ButtonModule,
    NavbarComponent
  ]
})
export class EditarUsuarioComponent {
  showTable = false;
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Editar Usuario', link: '/editar-usuario' }
  ];

  onSearch() {

    this.showTable = true;
  }

}
