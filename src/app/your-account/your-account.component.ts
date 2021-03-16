import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareReferralComponent } from '../share-referral/share-referral.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { CookieService } from '../services/cookie.service';
import { apiService } from '../api.service';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss']
})
export class YourAccountComponent implements OnInit {

  profileForm: FormGroup;
  formSubmit: boolean = false;
  personalDetailsForm: FormGroup;
  form1Submit: boolean = false;
  userData;
  referral;
  copystatus = "Copy";
  constructor(public fb: FormBuilder, private service: apiService,
    location: Location, public dialog: MatDialog,
    private router: Router, private cookieService: CookieService,
    private _clipboardService: ClipboardService
  ) {

    let ud = this.cookieService.getCookie('currentUser');
    this.userData = JSON.parse(ud);
    this.referral = this.userData.referral;
  }

  ngOnInit(): void {
    console.log(this.userData);
    this.profileForm = this.fb.group({
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      mobile: [this.userData.mobile, Validators.required]
    });

    this.personalDetailsForm = this.fb.group({
      accountName: [this.userData.accountName, Validators.required],
      accountNumber: [this.userData.accountNumber, Validators.required],
      bankName: [this.userData.bankName, Validators.required],
      ifscCode: [this.userData.ifscCode, Validators.required],
      mobilemoneyphone: [this.userData.mobilemoneyphone],
      orangemoney: [this.userData.orangemoney],
      wallet_address: [this.userData.wallet_address],
    });
  }

  shareDialog() {
    let dialogRef = this.dialog.open(ShareReferralComponent,
      {
        panelClass: 'my-full-screen-dialog', width: '800px',
        position: { top: '100px' },
      });

    dialogRef.afterClosed().subscribe(() => {
    })

  }
  changepasswordshareDialog() {
    let dialogRef = this.dialog.open(ChangePasswordComponent,
      {
        panelClass: 'my-full-screen-dialog', width: '800px',
        position: { top: '100px' },
      });

    dialogRef.afterClosed().subscribe(() => {
    })

  }


  get f() {
    return this.profileForm.controls;
  }

  get g() {
    return this.personalDetailsForm.controls;
  }

  onSubmit() {
    this.formSubmit = true;
    if (!this.profileForm.valid) {
      return false;
    }
    this.profileForm.value._id = this.userData._id;

    this.service.updateProfile(this.profileForm.value).subscribe((resp) => {
      if (resp.status) {
        this.cookieService.setCookie('currentUser', JSON.stringify(resp.data), 1);
        this.service.showSuccess(resp.msg);
      } else {
        this.service.showError(resp.msg);
      }
    })
  }
  onpersonalDetailsSubmit() {
    this.form1Submit = true;
    if (!this.personalDetailsForm.valid) {
      return false;
    }
    this.personalDetailsForm.value._id = this.userData._id;

    this.service.updatePersonalDetails(this.personalDetailsForm.value).subscribe((resp) => {
      if (resp.status) {
        this.cookieService.setCookie('currentUser', JSON.stringify(resp.data), 1);
        this.service.showSuccess(resp.msg);
      } else {
        this.service.showError(resp.msg);
      }
    })
  }



  copyDynamicText() {
    this._clipboardService.copyFromContent(this.referral);
    this.copystatus = "Copied!"
  }

}
