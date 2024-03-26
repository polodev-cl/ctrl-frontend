import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.css']
})
export class ModalPasswordComponent implements OnInit {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  

  ngOnInit(): void {
  }

  onClose() {
    this.display = false;
    this.displayChange.emit(this.display);
    
  }
}
