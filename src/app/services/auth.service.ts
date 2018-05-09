import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  currentUser: any = {};
  error: any = {};

  constructor(private http: HttpClient) {

  }

  login(credentials) {
    const formData = new FormData();
    formData.append('login[username]', credentials.username);
    formData.append('login[password]', credentials.password);
    return this.http.post(environment.apiUrl + '/auth/login', formData)
    .map(
      (response: any) => {
        if (response && response.userToken) {
          localStorage.setItem('token', response.userToken);
          this.currentUser = response;
          return true;
        }
      },
      error => {
        // console.log(error);
        this.error = error;
        return false;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }
}
