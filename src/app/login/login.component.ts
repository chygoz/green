import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMsg = '';
  constructor(public fb: FormBuilder, private service: apiService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe((resp) => {

      if (!resp.status) {
        this.errorMsg = resp.msg;
      } else {
        console.log((JSON.stringify(resp.data)));
        //localStorage.setItem("token", resp.token);
        this.cookieService.setCookie('currentUser', JSON.stringify(resp.data), 1);
        this.cookieService.setCookie('token', resp.token, 1);
        this.router.navigate(['/dashboard']);

      }
    })
  }
}
