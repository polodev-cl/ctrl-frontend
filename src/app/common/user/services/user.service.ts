import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = 'https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/user'; 
  private apiUrl = 'http://localhost:3000/api/user'
  constructor(private http: HttpClient) { }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }
}