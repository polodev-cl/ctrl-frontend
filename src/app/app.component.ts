import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {
  constructor(private router: Router) {

  }

  redirectToLogin() {
    this.router.navigate([ '/login' ]);
  }
}
