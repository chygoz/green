import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { timeStamp } from 'node:console';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.scss']
})
export class WithdrawRequestComponent implements OnInit {
  points_value;
  userData;
  params;
  point_user;
  total_points;
  leftVolumePoints;
  leftVolumeamount;
  rightVolumePoints;
  rightVolumeamount;
  withdrawpoints: 0;
  points_to_min;
  userPointsminForm: FormGroup;
  constructor(private service: apiService,
    private router: Router,
    public dialogRef: MatDialogRef<WithdrawRequestComponent>,
    private cookieService: CookieService, private fb:
      FormBuilder,) {
    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
  }
  formSubmit: boolean = false;
  ngOnInit(): void {
    this.params = { userId: this.userData._id };
    this.getVolumePoints(this.params);
    this.getSettingsData();
    this.getWithdrawAmount(this.params);
    this.userPointsminForm = this.fb.group({
      redeemedpoints: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transfertype: ['Bank Transfer', Validators.required]
    })
  }
  get h() {
    return this.userPointsminForm.controls;
  }
  getSettingsData() {
    this.service.getSettingsData({}).subscribe((resp) => {
      if (resp.status) {

        if (resp.points_to_min.length > 0) {
          this.points_value = resp.points_to_currency[0].points_value;
          this.point_user = resp.points_to_user[0].point_user;
          this.points_to_min = resp.points_to_min[0].min_points;
        }
      } else {
        this.service.showError(resp.msg);
      }
    })
  }

  SubmitForm() {
    this.formSubmit = true;

    if (this.userPointsminForm.value.redeemedpoints < this.points_to_min) {
      this.service.showError("Redeemed points not less than " + this.points_to_min);
      return false;
    }

    this.total_points = (this.leftVolumePoints + this.rightVolumePoints) - this.withdrawpoints;

    if (this.userPointsminForm.value.redeemedpoints > this.total_points) {
      this.service.showError("Redeemed points not more than " + this.total_points);
      return false;
    }

    if (!this.userPointsminForm.valid) {

      return false;
    }


    this.service.getUserAccountDetails({ _id: this.userData._id }).subscribe((resp) => {
      if (resp.status) {

        if (this.userPointsminForm.value.transfertype == "Bank Transfer") {
          if ((resp.data[0].hasOwnProperty("accountNumber") && resp.data[0].accountNumber != "" && resp.data[0].accountNumber != null) &&
            (resp.data[0].hasOwnProperty("bankName") && resp.data[0].bankName != "" && resp.data[0].bankName != null)) {

          } else {
            this.service.showError("Please update your Bank Details");
            return false;
          }
        }
        if (this.userPointsminForm.value.transfertype == "Mobile Money") {
          if ((resp.data[0].hasOwnProperty("mobilemoneyphone") && resp.data[0].mobilemoneyphone != "" && resp.data[0].mobilemoneyphone != null) &&
            (resp.data[0].hasOwnProperty("orangemoney") && resp.data[0].orangemoney != "" && resp.data[0].orangemoney != null)) {

          } else {
            this.service.showError("Please update Mobile Money Details");
            return false;
          }
        }
        if (this.userPointsminForm.value.transfertype == "Cryptocurrency") {
          if ((resp.data[0].hasOwnProperty("wallet_address") && resp.data[0].wallet_address != "" && resp.data[0].wallet_address != null)) {

          } else {
            this.service.showError("Please update Cryptocurrency Details");
            return false;
          }

        }

        this.userPointsminForm.value._id = this.userData._id;
        this.service.withdrawreqAdd(this.userPointsminForm.value).subscribe((resp) => {

          if (resp.status) {

            this.dialogRef.close();
            this.service.showSuccess(resp.msg);
            this.router.navigate(['/dashboard']);
            window.location.reload();
          } else {
            this.service.showError(resp.msg);
          }
        });


      } else {
        this.service.showError(resp.msg);
      }
    })


  }
  getVolumePoints(params) {

    this.service.getVolumePoints(params).subscribe((resp) => {

      if (resp.status) {
        if (resp.left != 0) {
          this.leftVolumePoints = resp.left[0].referred_user_points;
          this.leftVolumeamount = resp.left[0].total_amount;
        } else {
          this.leftVolumePoints = 0;
          this.leftVolumeamount = 0;
        }

        if (resp.right != 0) {
          this.rightVolumePoints = resp.right[0].referred_user_points;;
          this.rightVolumeamount = resp.right[0].total_amount;
        } else {
          this.rightVolumePoints = 0;
          this.rightVolumeamount = 0;
        }
      } else {
        this.service.showError(resp.msg);
      }
    })
  }

  getWithdrawAmount(params) {
    this.service.getWithdrawAmount(params).subscribe((resp) => {
      this.withdrawpoints = 0;
      if (resp.status) {
        this.withdrawpoints = resp.data[0].redeemedpoints;
      } else {

      }
    })
  }


}
