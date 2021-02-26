import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMsg = '';
  constructor(public fb: FormBuilder, private service: apiService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    this.service.login(this.loginForm.value).subscribe((data) => {
      if(!data.status) {
        this.errorMsg = data.msg;
      }else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.data));
        this.router.navigate(['/network']);

      }
    })
  }
}
