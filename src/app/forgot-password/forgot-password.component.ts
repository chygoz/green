import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  public emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMsg = '';
  successMsg = '';
  constructor(public fb: FormBuilder, private service: apiService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
    })
  }

  onSubmit() {
    this.service.forgotpassword(this.loginForm.value).subscribe((resp) => {
      if (!resp.status) {
        this.errorMsg = resp.msg;
        this.successMsg = "";
      } else {
        this.errorMsg = "";
        this.successMsg = "Login details sent to registered email id";



      }
    })

  }



}
