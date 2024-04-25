import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CompanyService, Company } from '../../../services/company.service';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-modal-consulta-masiva',
  templateUrl: './modal-consulta-masiva.component.html',
  styleUrls: ['./modal-consulta-masiva.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class ModalConsultaMasivaComponent {
  @Output() cerrar = new EventEmitter<void>();

  empresaControl = new FormControl();
  empresasFiltradas: Observable<Company[]> | undefined;

  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.empresasFiltradas = this.empresaControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterCompanies(value))
    );
  }
  private filterCompanies(value: string): Observable<Company[]> {
    return this.companyService
      .getCompanies()
      .pipe(
        map((companies) =>
          companies.filter((company: Company) =>
            company.razonSocial.toLowerCase().includes(value.toLowerCase())
          )
        )
      );
  }

  seleccionarEmpresa(empresa: Company) {
    console.log('Empresa seleccionada:', empresa);
  }
  cerrarModal(): void {
    this.cerrar.emit();
  }

  irAConsultaMasiva() {
    this.router.navigate(['/consulta-masiva']);
  }
}
