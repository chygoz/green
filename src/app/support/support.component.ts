import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-network',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  userData;
  supportForm: FormGroup;
  formSubmit: boolean = false;
  public emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private service: apiService, private cookieService: CookieService, public fb: FormBuilder) {
    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
    console.log(this.userData);
  }

  ngOnInit(): void {
    this.supportForm = this.fb.group({
      fullName: [`${this.userData.firstName} ${this.userData.lastName}`, [Validators.required]],
      email: [`${this.userData.email}`, [Validators.required, Validators.pattern(this.emailregex)]],
      phone: [`${this.userData.mobile}`, [Validators.required]],
      subject: ['', [Validators.required]],
      query: ['', [Validators.required]],
      _id: [`${this.userData._id}`]
    });
  }

  get f() {
    return this.supportForm.controls;
  }

  onSubmit() {
    this.formSubmit = true;
    if (!this.supportForm.valid) {
      return false;
    }

    this.service.sendEmail(this.supportForm.value).subscribe((resp) => {
      if (resp.status) {
        this.service.showSuccess(resp.msg);
        this.supportForm.controls['subject'].setValue('');
        this.supportForm.controls['query'].setValue('');
        this.formSubmit = false;
      } else {
        this.service.showError(resp.msg);
      }
    })
  }



}
