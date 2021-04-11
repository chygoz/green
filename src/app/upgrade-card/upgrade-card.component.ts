import { Component, OnInit } from '@angular/core';
import { apiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CookieService } from '../services/cookie.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-upgrade-card',
  templateUrl: './upgrade-card.component.html',
  styleUrls: ['./upgrade-card.component.scss']
})
export class UpgradeCardComponent implements OnInit {
  plans = [];
  userData;
  current_card;
  userPriority: Number;
  myForm: FormGroup;
  selectedPlan;
  paymentOptions = [
    { name: 'MTN Mobile Money', value: 'CM_MTNMOBILEMONEY' },
    //{name:'Orange Money', value:'CM_ORANGEMONEY'},
    { name: 'Express Union Mobile Money', value: 'CM_EUMM' },
    //{name:'Visa/MasterCard', value:'CM_VISAMASTERCARD'},
    //{name:'Nexttel Possa', value:'CM_NEXTTELPOSSA'}
  ]
  stage: Number = 1;
  constructor(private service: apiService, private cookieService: CookieService,
    private router: Router, public dialog: MatDialog, private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpgradeCardComponent>,
  ) { }

  ngOnInit(): void {
    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);
    this.getPlans();
    this.myForm = this.fb.group({
      mobile: ['', Validators.required],
      operator: ['', Validators.required]
    })
  }
  getPlans() {
    this.service.getPlans({}).subscribe((resp) => {
      if (resp.status) {
        this.plans = resp.data;
        let sPlan = this.plans.find(pl => pl._id == this.userData.planId);
        this.userPriority = sPlan.priority
      }
    })
  }

  upgradeCard(plan) {
    if (Number(plan.priority) <= Number(this.userPriority)) {
      return false;
    } else {
      this.selectedPlan = plan;
      this.stage = 2;
    }

  }

  onSubmit() {
    let params = {
      currentPlan: this.userData.planId,
      planId: this.selectedPlan._id,
      ...this.myForm.value
    }
    this.service.upgradePlanRequest(params).subscribe((resp) => {
      if (resp.status) {
        this.service.showSuccess(resp.msg);
        this.dialogRef.close(resp);
      } else {
        this.service.showError(resp.msg);
      }
    })
    // this.service.paymentRequest(params).subscribe((resp) => {
    //   if(resp.status){
    //     this.service.showSuccess(resp.msg);
    //     this.dialogRef.close(resp);
    //   }else {
    //     this.service.showError(resp.msg);
    //   }
    // })


  }
}
