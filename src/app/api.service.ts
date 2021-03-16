import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './config';
import { Observable, from } from 'rxjs';
import { CookieService } from './services/cookie.service';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class apiService {

  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { }

  login(params): Observable<any> {
    return this.http.post(config.api_url + 'user/login', params);
  }

  register(params): Observable<any> {
    return this.http.post(config.api_url + 'user/register', params);
  }

  updateProfile(params): Observable<any> {
    return this.http.post(config.api_url + 'user/updateprofile', params);
  }
  updatePersonalDetails(params): Observable<any> {
    return this.http.post(config.api_url + 'user/updatepersonaldetails', params);
  }
  updatePassword(params): Observable<any> {
    return this.http.post(config.api_url + 'user/updatepassword', params);
  }


  forgotpassword(params): Observable<any> {
    return this.http.post(config.api_url + 'user/forgotpassword', params);
  }


  getUserNetwork(params): Observable<any> {
    let token = this.cookieService.getCookie('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getUserNetwork', params, { headers });
  }

  getPendingNetwork(params): Observable<any> {
    let token = this.cookieService.getCookie('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getPendingNetwork', params, { headers });
  }

  addleg(params): Observable<any> {
    let token = this.cookieService.getCookie('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/addLeg', params, { headers });
  }

  showSuccess(msg) {
    this.toastr.success(msg, '', {
      timeOut: 3000
    });
  }

  showError(msg) {
    this.toastr.error(msg, '', {
      timeOut: 3000
    });
  }

}