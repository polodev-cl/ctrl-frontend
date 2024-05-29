import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: [ './modal-password.component.css' ],
  standalone: true,
  imports: [ NgClass ]
})
export class ModalPasswordComponent {
  @Input() display: boolean = false;
  @Input() email: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  onClose() {
    this.close.emit();
  }

  onContinue() {
    this.router.navigate([ '/recover-password' ]);
    this.display = false;
  }
}
