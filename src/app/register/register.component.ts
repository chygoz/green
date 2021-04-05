import { ReadPropExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { apiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMsg = '';
  plans = [];
  selectedPlanId;
  token;
  code: number;
  showLoader: boolean = false;
  constructor(public fb: FormBuilder, private service: apiService, private router: Router,
    private route: ActivatedRoute, public dialog: MatDialog,) {
    this.token = localStorage.getItem('token');
    this.route.params.subscribe(params => {
      if (params["id"] != undefined) {
        this.token = false;
      }
    });

  }

  ngOnInit(): void {
    this.getPlans();
    this.route.params.subscribe(params => {
      this.code = params["id"];
    });
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      password: ['', Validators.required],
      referralId: [this.code],
    });

  }

  onSubmit() {
    this.service.register(this.registerForm.value).subscribe((data) => {
      if (!data.status) {
        this.errorMsg = data.msg;
      } else {
        localStorage.setItem('currentUser', JSON.stringify(data.data))
        localStorage.setItem('token', data.token);
        this.token = localStorage.getItem('token');
        this.service.showSuccess("Registered Successfully!");
        //this.router.navigate(['/network']);
      }
    })
  }

  getPlans() {
    this.service.getPlans({}).subscribe((resp) => {
      if (resp.status) {
        this.plans = resp.data;
      }
    })
  }

  onPlanSelected(plan) {
    this.selectedPlanId = plan;
  }

  submitPayment() {
    if (this.selectedPlanId) {
      let dialogRef = this.dialog.open(PaymentPopupComponent,
        {
          panelClass: 'my-full-screen-dialog', width: '600px',
          position: { top: '100px' },
          data: { selectedPlanId: this.selectedPlanId }
        });

      dialogRef.afterClosed().subscribe((resp) => {

        if (resp.status) {
          this.showLoader = true;
          setTimeout(() => {
            this.service.userPaymentStatus({}).subscribe((resp) => {

              if (resp.status) {

                this.service.showSuccess(resp.msg);
                this.showLoader = false;
                let userData = JSON.parse(localStorage.getItem('currentUser'));
                userData.paymentStatus = true,
                  userData.paymentId = resp.data.paymentId
                localStorage.setItem('currentUser', JSON.stringify(userData));
                this.router.navigate(['dashboard']);
              } else {
                this.service.showError(resp.msg);
                this.showLoader = false;
              }
            });
          }, 30000)
        }
      })
    }
    // if (this.selectedPlanId) {
    //   let params = {
    //     planId: this.selectedPlanId
    //   }
    //   this.service.paymentRequest(params).subscribe((resp) => {
    //     if(resp.status){
    //       this.service.showSuccess(resp.msg);
    //     }else {
    //       this.service.showError(resp.msg);
    //     }
    //   })
    // }



    // this.service.showSuccess('Payment request sent');

  }

}
