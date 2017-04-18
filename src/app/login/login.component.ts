import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';
import { AuthService } from '../shared/services/auth.service';
import { notifyOptions } from '../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public options = notifyOptions;

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) {
  }

  onLogin(form: NgForm) {
    const {email, password} = form.value;
    this.authService.loginUser(email, password)
      .subscribe((response) => {
        if (response['error']) {
          this.notifications.error('Ошибка', response.error);
        } else {
          this.authService.setToken(response['token']);
          this.router.navigate(['/']);
        }
      });
  }
}
