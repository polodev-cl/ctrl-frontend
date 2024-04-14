import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.css']
})
export class ModalPasswordComponent {
  @Input() display: boolean = false;
  @Input() email: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose() {
    this.close.emit();
  }

  onContinue() {
    console.log('Email before navigation:', this.email);
    this.router.navigate(['/recover-password']); 
    this.display = false; 
  }
}