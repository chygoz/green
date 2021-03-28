import { Component, OnInit } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { apiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  userData;
  loginStatus = false;
  constructor(private router: Router,
    private cookieService: CookieService, private service: apiService) {
    this.userData = localStorage.getItem('currentUser');
    this.userData = JSON.parse(this.userData);

  }

  ngOnInit(): void {
    if (this.userData) {
      this.loginStatus = true;
    }

  }

  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  logout() {
    this.cookieService.deleteCookie('currentUser');
    this.cookieService.deleteCookie('token');
    this.router.navigate(['/login']);
  }

}
