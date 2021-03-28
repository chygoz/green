import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from './services/cookie.service';
//import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private cookieService: CookieService) {}
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      console.log("false");
      this.router.navigate(['login']);
      return false;
    }
    console.log("true");
    return true;
  }
}