import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './config';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class apiService {

    constructor(private http: HttpClient) { }

    login(params): Observable<any> {
        return this.http.post(config.api_url+'user/login', params);
    }

    register(params): Observable<any> {
        return this.http.post(config.api_url+'user/register', params);
    }

  }