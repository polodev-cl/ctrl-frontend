import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TablasEditarUsuarioComponent } from '../tablas-editar-usuario/tablas-editar-usuario.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

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
    NavbarComponent,
    CommonModule
  ],
})
export class EditarUsuarioComponent implements OnInit {
  showTable = false;
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Editar Usuario', link: '/editar-usuario' },
  ];
  @ViewChild(TablasEditarUsuarioComponent)
  tablaComponent!: TablasEditarUsuarioComponent;
  @ViewChild('searchInput') searchInput!: HTMLInputElement;

  ngOnInit(): void {
    this.showTable = true;
  }
  onSearch(searchInput: HTMLInputElement) {
    this.tablaComponent.applyFilter(searchInput.value);
  }
  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.searchInput.value) {
      this.onSearch(this.searchInput);
    }
  }

  handleKeyPress(event: KeyboardEvent, searchInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearch(searchInput);
    }
  }
}
