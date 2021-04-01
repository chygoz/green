import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from './services/cookie.service';
//import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private cookieService: CookieService) {}
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      let userData = JSON.parse(localStorage.getItem('currentUser'));
      if(userData && userData.paymentStatus && userData.paymentId) {
        return true;
      }else {
        this.router.navigate(['register']);
        return false;
      }
      
    }
    
  }
}