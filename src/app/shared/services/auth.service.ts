import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';


@Injectable()
export class AuthService {

  private token = '';

  constructor(private http: Http, private router: Router) {
  }

  loginUser(login: string, pass: string) {
    return this.http.post('https://webformyself.com/oursupport/backend/', {login, pass})
      .map((response: Response) => response.json());
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token !== '';
  }

  logout() {
    this.token = '';
    this.router.navigate(['/login']);
  }
}
