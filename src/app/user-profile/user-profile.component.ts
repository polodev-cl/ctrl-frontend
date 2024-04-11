import { UserService } from '../utils/UserService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }
}
