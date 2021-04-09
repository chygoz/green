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
  constructor(private service: apiService, private cookieService: CookieService) {
    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
  }

  ngOnInit(): void {

  }

  get f() {
    return this.supportForm.controls;
  }

  onSubmit() {
    this.formSubmit = true;
    if (!this.supportForm.valid) {
      return false;
    }
    this.supportForm.value._id = this.userData._id;

    this.service.sendEmail(this.supportForm.value).subscribe((resp) => {
      if (resp.status) {

        this.service.showSuccess(resp.msg);
      } else {
        this.service.showError(resp.msg);
      }
    })
  }



}
