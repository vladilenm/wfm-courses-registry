import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';


@Injectable()
export class AuthService {

  token = false;

  constructor(private http: HttpService, private router: Router) {
  }

  loginUser(email: string, password: string) {
    if (email === 'test@mail.ru' && password === 'q') {
      this.token = true;
      this.router.navigate(['/']);
    }
  }

  isAuthenticated() {
    return this.token;
  }

  logout() {
    this.token = false;
    this.router.navigate(['/login']);
  }
}
