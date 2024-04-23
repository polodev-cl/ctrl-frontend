// src/app/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from './config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserData(): Observable<any> {
    return this.http.get<any[]>(`${ config.BASE_URL }users`)
      .pipe(
        map(users => users[0]) // Asumiendo que quieres el primer usuario
      );
  }
}
