import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpgradeCardComponent } from '../upgrade-card/upgrade-card.component';
import { WithdrawRequestComponent } from '../withdraw-request/withdraw-request.component';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData;
  params;
  points_min;
  points_to_min;
  pointsprice: number;
  userwithdrawlist;
  leftVolumePoints;
  leftVolumeamount;
  rightVolumePoints;
  rightVolumeamount;
  withdrawpoints: 0;
  current_card = "NO CARD";

  q: number = 1;
  showLoader: boolean = false;
  constructor(location: Location,
    public dialog: MatDialog,
    private service: apiService, private cookieService: CookieService,
    private router: Router,

  ) {

  }

  ngOnInit(): void {

    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
    if (this.userData.planId == "606872ca92006a39e0b0b54e") {
      this.current_card = "LOCAL CARD";
    } else if (this.userData.planId == "606872bb92006a39e0b0b54d") {
      this.current_card = "BUSINESS CARD";
    } else if (this.userData.planId == "6068724292006a39e0b0b54c") {
      this.current_card = "INTERNATIONAL CARD";
    }
    this.params = { userId: this.userData._id };
    this.getSettingsData();
    this.getWithdrawAmountAll(this.params);
    this.getWithdrawAmount(this.params);
    this.getVolumePoints(this.params);


  }

  upgradecardDialog() {
    let dialogRef = this.dialog.open(UpgradeCardComponent,
      {
        panelClass: 'my-full-screen-dialog', width: '800px',
        position: { top: '100px' },
      });

    dialogRef.afterClosed().subscribe((resp1) => {
      if (resp1.status) {
        this.showLoader = true;
        setTimeout(() => {
          this.service.userPaymentStatus({}).subscribe((resp) => {
            if (resp.status) {
              this.showLoader = false;
              let userData = JSON.parse(localStorage.getItem('currentUser'));
              //compare user plan 
              if (resp.data.planId == userData.planId) {
                // payment failed
                this.service.showError('Payment Failed');
                this.showLoader = false;
              } else {
                // payment success
                userData.paymentStatus = true;
                userData.planId = resp.data.planId;
                userData.paymentId = resp.data.paymentId
                localStorage.setItem('currentUser', JSON.stringify(userData));
                this.service.showSuccess(resp.msg);
              }

            } else {
              this.service.showError(resp.msg);
              this.showLoader = false;
            }
          });
        }, 30000)
      }
    })

  }
  withdrawDialog() {
    let dialogRef = this.dialog.open(WithdrawRequestComponent,
      {
        panelClass: 'my-full-screen-dialog', width: '800px',
        position: { top: '100px' },
      });

    dialogRef.afterClosed().subscribe(() => {
    })

  }

  getSettingsData() {
    this.service.getSettingsData({}).subscribe((resp) => {
      if (resp.status) {

        if (resp.points_to_min.length > 0) {
          this.points_min = resp.points_to_min[0].min_points;
          this.pointsprice = resp.points_to_currency[0].point_value;

        }
      } else {
        this.service.showError(resp.msg);
      }
    })
  }

  getWithdrawAmountAll(params) {

    this.service.getWithdrawAmountAll(params).subscribe((resp) => {
      this.getSettingsData();
      if (resp.status) {
        this.userwithdrawlist = resp.data;
      } else {

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
