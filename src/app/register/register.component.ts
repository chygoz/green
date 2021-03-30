import { ReadPropExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { apiService } from '../api.service';

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
  constructor(public fb: FormBuilder, private service: apiService, private router: Router, private route: ActivatedRoute) {
    this.token = localStorage.getItem('token');
}
  code: number;
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
      referralId: [this.code, Validators.required],
    });

  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe((data) => {
      if (!data.status) {
        this.errorMsg = data.msg;
      } else {
        this.service.showSuccess("Registered Successfully!");
        this.router.navigate(['/login']);
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
      let params = {
        planId: this.selectedPlanId
      }
      this.service.paymentRequest(params).subscribe((resp) => {
        if(resp.status){
          this.service.showSuccess(resp.msg);
        }else {
          this.service.showError(resp.msg);
        }
      })
    }
  }

}
