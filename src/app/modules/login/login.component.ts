import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from '@aws-amplify/core';
//falto instalar npm
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log('Event received:', data.payload.event); 
      if (payload.event === 'signedIn') {  // Changed from 'signIn' to 'signedIn'
        this.router.navigate(['/home'], { replaceUrl: true });
      } else if (payload.event === 'signInWithRedirect_failure') {
        // Handle the sign-in failure scenario, if necessary
      }
    });
  }
}
