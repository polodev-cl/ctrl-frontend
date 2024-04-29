import { Component, OnInit } from '@angular/core';
import { CognitoService } from '@common/auth/cognito-service.service';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { DividerModule } from "primeng/divider";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ DividerModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private cognitoService: CognitoService,
    private route: ActivatedRoute
  ) {}

  cerrarSesion() {
    this.cognitoService.signOut();
  }

  ngOnInit() {
    console.log(this.route.snapshot.data['authenticatedUser']);
  }
}
