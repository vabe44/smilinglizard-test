import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  error: any;
  status: string;
  loading: boolean;
  constructor(private router: Router, private authService: AuthService) { 
    this.status = 'Login';
    this.loading = false;
  }

  login(credentials) {
    this.loading = true;
    this.status = 'Loading...';
    this.authService.login(credentials)
      .subscribe(
        result => {
          if (result) {
            this.invalidLogin = false;
            this.router.navigate(['/']);
          }
        },
        error => {
          this.loading = false;
          this.status = 'Login';
          this.error = error;
          this.invalidLogin = true;
        }
      );
  }

  hideError(): void {
    this.invalidLogin = false;
  }
}
