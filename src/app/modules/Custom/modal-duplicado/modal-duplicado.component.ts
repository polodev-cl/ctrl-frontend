import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-duplicado',
  templateUrl: './modal-duplicado.component.html',
  styleUrl: './modal-duplicado.component.css',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class ModalDuplicadoComponent implements OnInit{
  @Output() cerrar = new EventEmitter<void>();
  @Output() reemplazar = new EventEmitter<void>();
  @Input() errores: string[] = [];
  
  constructor(private router: Router) {}

  cerrarModal(): void {
    this.cerrar.emit(); 
  }

  ngOnInit(): void {
    console.log(this.errores)
  }
  saveErrorAndSeeDuplicates(): void {
    localStorage.setItem('erroresDuplicados', JSON.stringify(this.errores));
    this.router.navigate(['/equipos-duplicados'], );
  }
}
