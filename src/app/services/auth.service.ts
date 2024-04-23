import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private createHeaders(token: any): HttpHeaders {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  signup(user:any){
    return this.http.post<any>(`http://localhost:3000/users/signup`, user);
  }

  login(user: any){
    return this.http.post<any>(`http://localhost:3000/users/login`, user)
  }

  getLoggedUser(token: any){
    const headers = this.createHeaders(token);
    return this.http.get<any>('http://localhost:3000/users', { headers });
  }
}
