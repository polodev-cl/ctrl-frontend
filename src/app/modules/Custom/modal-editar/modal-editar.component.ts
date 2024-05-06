import { CommonModule } from '@angular/common';
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
  ],
})
export class ModalEditarComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() exitoEditar = new EventEmitter<void>();
  @Input() mensajeModalEditar: string = '';
  @Input() rutInitial: string = '';
  @Input() emailInitial: string = '';
  @Input() perfilInitial: string = '';
  @Input() idUsuario!: number;
  empresas: Observable<Partial<Company>[]> = of([]);
  editForm!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private readonly fb: FormBuilder
  ) {
    this.editForm = this._loadForm();
  }

  onEmpresaChange(empresaId: number) {
    console.log('Empresa seleccionada:', empresaId);
  }

  onSubmit() {
    if (this.editForm.dirty && this.editForm.valid) {
      const userId = this.idUsuario;
      console.log("userid",userId)
      const values = this.editForm.getRawValue();
      console.log('mi values: ', values);
  
      const rolIdAsNumber = Number(values.rolId);
      const formData = {
        rut: this.rutInitial,
        rolId: isNaN(rolIdAsNumber) ? undefined : rolIdAsNumber,
      };
  
      if (formData.rolId !== Number(this.perfilInitial)) {  
        this.userService.updateUser(userId, formData).subscribe({
          next: (user) => {
            console.log('Usuario actualizado:', user);
            this.editarUsuarioExitoso();
          },
          error: (error) => {
            console.error('Error actualizando usuario:', error);
          },
        });
      } else {
        console.log('No se detectaron cambios en el formulario.');
      }
    }
  }
  
  private _loadForm() {
    return this.fb.group({
      rolId: [{ value: +this.perfilInitial }],
    });
  }
  cerrarModal(): void {
    this.cerrar.emit();
  }

  editarUsuarioExitoso(): void {
    this.exitoEditar.emit();
  }
}
