import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './config';
import { Observable, from } from 'rxjs';
import { CookieService } from './services/cookie.service';

@Injectable({
    providedIn: 'root',
  })
  export class apiService {

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    login(params): Observable<any> {
        return this.http.post(config.api_url+'user/login', params);
    }

    register(params): Observable<any> {
        return this.http.post(config.api_url+'user/register', params);
    }

    getUserNetwork(params): Observable<any> {
      let token = this.cookieService.getCookie('token');
      let headers = new HttpHeaders();
        headers = headers.append('authorization', token);
        headers = headers.append('Content-Type',  'application/json');
      return this.http.post(config.api_url+'user/getUserNetwork', params, {headers});
    }

  }