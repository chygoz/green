import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from '../services/cookie.service';
import { apiService } from '../api.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userData;
  formSubmit: boolean = false;
  constructor(public fb: FormBuilder,
    private cookieService: CookieService,
    private service: apiService, public dialog: MatDialog) {

    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
  }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_new_password: ['', Validators.required]
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }


  onSubmit() {
    this.formSubmit = true;
    if (!this.changePasswordForm.valid) {
      return false;
    }

    if (this.changePasswordForm.value.new_password.length < 8) {
      this.service.showError("New Password not less than 8");
      return false;
    }

    if (this.changePasswordForm.value.new_password != this.changePasswordForm.value.confirm_new_password) {
      this.service.showError("New Password mismatch with Confirm Password");
      return false;
    }

    this.changePasswordForm.value._id = this.userData._id;
    this.changePasswordForm.value.email = this.userData.email;
    this.service.updatePassword(this.changePasswordForm.value).subscribe((resp) => {
      if (resp.status) {
        this.service.showSuccess(resp.msg);
      } else {
        this.service.showError(resp.msg);
      }
    })
  }

}
