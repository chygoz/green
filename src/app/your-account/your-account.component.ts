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
import * as _ from 'lodash';
@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss']
})
export class YourAccountComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  profilepicdata: {};


  profileForm: FormGroup;
  formSubmit: boolean = false;
  personalDetailsForm: FormGroup;
  form1Submit: boolean = false;
  userData;
  referral: string;
  copystatus = "Copy";
  constructor(public fb: FormBuilder, private service: apiService,
    location: Location, public dialog: MatDialog,
    private router: Router, private cookieService: CookieService,
    private _clipboardService: ClipboardService
  ) {

    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
    this.referral = this.userData.referral;
    this.cardImageBase64 = this.userData.profilepic;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      mobile: [this.userData.mobile, Validators.required]
    });

    this.personalDetailsForm = this.fb.group({
      accountName: [this.userData.accountName],
      accountNumber: [this.userData.accountNumber],
      bankName: [this.userData.bankName],
      ifscCode: [this.userData.ifscCode],
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
        data: { referral: this.userData?.referral }
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
        localStorage.setItem('currentUser', JSON.stringify(resp.data));
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
        localStorage.setItem('currentUser', JSON.stringify(resp.data));
        this.service.showSuccess(resp.msg);
      } else {
        this.service.showError(resp.msg);
      }
    })
  }



  copyDynamicText() {
    this._clipboardService.copyFromContent("https://greendiscountcard.com/register/" + this.referral);
    this.copystatus = "Copied!"
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.profilepicdata = { "_id": this.userData._id, "profile_pic": this.cardImageBase64 };

            this.service.updateProfilePic(this.profilepicdata).subscribe((resp) => {
              if (resp.status) {
                localStorage.setItem('currentUser', JSON.stringify(resp.data));
                this.service.showSuccess(resp.msg);
              } else {
                this.service.showError(resp.msg);
              }
            });

            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
