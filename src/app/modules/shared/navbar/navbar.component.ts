import { Component, OnInit } from '@angular/core';
import { CognitoService } from '@common/auth/cognito-service.service';
import { ActivatedRoute } from "@angular/router";
import { DividerModule } from "primeng/divider";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ DividerModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticatedUser: any;

  constructor(
    private cognitoService: CognitoService,
    private route: ActivatedRoute
  ) {}

  cerrarSesion() {
    this.cognitoService.signOut();
  }

  ngOnInit() {
    this.authenticatedUser = this.route.snapshot.data['authenticatedUser'];
  }
}
