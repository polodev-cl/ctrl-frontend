import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _activeUser: any;

  // private apiUrl = 'http://localhost:3000/api/user'; 
  private apiUrl = 'https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/user'
  constructor(private http: HttpClient) { }

  getUserByCognitoId(cognitoId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${cognitoId}`)
    .pipe(tap(user => this.activeUser = user));
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }

  set activeUser(data: any) {
    this._activeUser = data;
    localStorage.setItem('activeUser', JSON.stringify(data));
  }

  get activeUser() {
    return this._activeUser || JSON.parse(localStorage.getItem('activeUser') || '');
  }

  getUserRole() {
    return this._activeUser?.rolId;
  }

  getUserId() {
    return this._activeUser?.id;
  }
}