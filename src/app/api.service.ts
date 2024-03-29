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
  resetPassword(params): Observable<any> {
    return this.http.post(config.api_url + 'user/resetPassword', params);
  }

  register(params): Observable<any> {
    return this.http.post(config.api_url + 'user/register', params);
  }

  getPlans(params): Observable<any> {
    return this.http.post(config.api_url + 'user/getPlans', params);
  }

  getPartners(): Observable<any> {
    return this.http.post(config.api_url + 'user/getPartners', {});
  }
  searchPartner(params): Observable<any> {
    return this.http.post(config.api_url + 'user/searchPartner', params);
  }

  paymentRequest(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/paymentRequest', params, { headers });
  }
  upgradePlanRequest(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/upgradePlanRequest', params, { headers });
  }

  userPaymentStatus(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/userPaymentStatus', params, { headers });
  }

  updateProfile(params): Observable<any> {
    return this.http.post(config.api_url + 'user/updateprofile', params);
  }
  updateProfilePic(params): Observable<any> {
    return this.http.post(config.api_url + 'user/updateprofilepic', params);
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
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getUserNetwork', params, { headers });
  }
  getVolumePoints(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getVolumePoints', params);
  }
  getWithdrawAmount(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getWithdrawAmount', params);
  }
  getWithdrawAmountAll(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getWithdrawAmountAll', params);
  }
  getSettingsData(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getSettingsData', params);
  }

  getPendingNetwork(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/getPendingNetwork', params, { headers });
  }

  addleg(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(config.api_url + 'user/addLeg', params, { headers });
  }


  insertWithdrawRequest(params): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('token', token);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post(config.api_url + 'user/insertWithdrawRequest', params, { headers });
  }
  withdrawreqAdd(params): Observable<any> {
    return this.http.post(config.api_url + 'user/withdrawreqAdd', params);
  }
  getUserAccountDetails(params): Observable<any> {
    return this.http.post(config.api_url + 'user/getUserAccountDetails', params);
  }
  sendEmail(params): Observable<any> {
    return this.http.post(config.api_url + 'user/sendQuery', params);
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