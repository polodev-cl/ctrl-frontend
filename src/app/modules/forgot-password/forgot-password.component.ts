import { Component } from '@angular/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  isModalDisplayed: boolean = false;

  constructor() { }

  showModal() {
    
    this.isModalDisplayed = true;
    console.log('Modal displayed?', this.isModalDisplayed); 
  }
}