import { NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { UserService } from '../utils/UserService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.css' ],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class UserProfileComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }
}
