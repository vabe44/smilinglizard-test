import { Screengroup } from './../models/Screengroup';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ScreengroupService {
  headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('USER-TOKEN', this.authService.isLoggedIn());
  }

  get() {
    return this.http.get(environment.apiUrl + '/screengroup', {headers: this.headers});
  }

  getChildren(screengroup: Screengroup) {
    return this.http.get(environment.apiUrl + '/screengroup/' + screengroup.id + '/children', {headers: this.headers});
  }

  getChildrenFirstLevel(screengroup: Screengroup) {
    return this.http.get(environment.apiUrl + '/screengroup/' + screengroup.id + '/children/firstlevel', {headers: this.headers});
  }

  addChild(screengroup: Screengroup, name) {
    const formData = new FormData();
    formData.append('screen_group[name]', name);
    return this.http.post(environment.apiUrl + '/screengroup/' + screengroup.id + '/add', formData, {headers: this.headers});
  }

  edit(screengroup: Screengroup, name) {
    const formData = new FormData();
    formData.append('screen_group[name]', name);
    return this.http.put(environment.apiUrl + '/screengroup/' + screengroup.id + '/edit', formData, {headers: this.headers});
  }

  removeChild(screengroup: Screengroup) {
    return this.http.delete(environment.apiUrl + '/screengroup/' + screengroup.id + '/remove', {headers: this.headers});
  }
}
