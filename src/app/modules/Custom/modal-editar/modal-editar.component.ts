import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Company, CompanyService } from '@app/services/company.service';
import { UserService } from '@app/common/user/services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    NgIf
  ],
})
export class ModalEditarComponent implements OnInit{
  @Output() cerrar = new EventEmitter<void>();
  @Output() exitoEditar = new EventEmitter<void>();
  @Input() mensajeModalEditar: string = '';
  @Input() rutInitial: string = '';
  @Input() emailInitial: string = '';
  @Input() perfilInitial: string = '';
  @Input() idUsuario!: number;
  empresas: Observable<Partial<Company>[]> = of([]);
  editForm!: FormGroup;
  loading = false;

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private readonly fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.editForm = this._loadForm();
  }

onSubmit() {
  if (this.editForm.dirty && this.editForm.valid) {
    this.loading = true;
    const userId = this.idUsuario;
    const values = this.editForm.getRawValue();
    const rolIdAsNumber = Number(values.rolId);
    const formData = {
      rut: this.rutInitial,
      rolId: isNaN(rolIdAsNumber) ? undefined : rolIdAsNumber,
    };

    if (formData.rolId !== Number(this.perfilInitial)) {
      this.userService.updateUser(userId, formData).subscribe({
        next: (user) => {
          this.editarUsuarioExitoso();
          this.loading = false; 
        },
        error: (error) => {
          console.error('Error actualizando usuario:', error);
          this.loading = false; 
        }
      });
    } else {
      this.loading = false;
    }
  }
}

  
  private _loadForm() {
    return this.fb.group({
      rolId: [ this.perfilInitial ],
    });
  }
  cerrarModal(): void {
    this.cerrar.emit();
  }

  editarUsuarioExitoso(): void {
    this.exitoEditar.emit();
  }
}
