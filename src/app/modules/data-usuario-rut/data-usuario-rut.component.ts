import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { ModalHistorialEquipoComponent } from '../Custom/modal-historial-equipo/modal-historial-equipo.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { UserService } from '@app/common/user/services/user.service';
import { RoleEnum } from '@app/common/auth/enums/role.enum';
import { parseISO, differenceInMonths, addMonths } from 'date-fns';

@Component({
  selector: 'app-data-usuario-rut',
  templateUrl: './data-usuario-rut.component.html',
  styleUrls: ['./data-usuario-rut.component.css'],
  standalone: true,
  imports: [
    ModalHistorialEquipoComponent,
    NgIf,
    DividerModule,
    RouterLink,
    ButtonModule,
    NgForOf,
    NavbarComponent,
  ],
})
export class DataUsuarioRutComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Usuario-rut', link: '/data-rut-usuario' },
  ];
  equipments: any[] = [];
  rut: string = '';
  mostrarModalHistorialEquipo: boolean = false;
  equipoActualId: number | null = null;
  RoleEnum = RoleEnum;
  rol!: RoleEnum;
  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.rol = this.obtenerRolUsuario();
    this.route.params.subscribe((params) => {
      this.rut = params['rut'];
      if (this.rut) {
        this.buscarPorRut(this.rut);
      }
    });
  }

  obtenerRolUsuario(): RoleEnum {
    return this.userService.getUserRole();
  }

  calcularMesesGarantiaRestantes(fechaCompra: string, garantiaMeses: number): number {
    if (!fechaCompra) {
      console.error('La fecha de compra es nula o no está definida.');
      return 0;
    }
    const fechaCompraDate = parseISO(fechaCompra);
    const fechaFinGarantia = addMonths(fechaCompraDate, garantiaMeses);
    const fechaActual = new Date();
    const mesesRestantes = differenceInMonths(fechaFinGarantia, fechaActual);
    return mesesRestantes > 0 ? mesesRestantes : 0;
  }
  
  buscarPorRut(rut: string): void {
    this.equipmentService.getEquipmentByRut(rut).subscribe({
      next: (data) => {
        this.equipments = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.equipments = [];
      },
    });
  }

  abrirModalHistorialEquipo(equipmentId: number): void {
    this.equipoActualId = equipmentId;
    this.mostrarModalHistorialEquipo = true;
  }

  cerrarModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = false;
  }
}
