import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { apiService } from '../api.service';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.scss']
})
export class PaymentPopupComponent implements OnInit {
  myForm: FormGroup;
  paymentOptions = [
    {name:'MTN Mobile Money', value:'CM_MTNMOBILEMONEY'},
    //{name:'Orange Money', value:'CM_ORANGEMONEY'},
    {name:'Express Union Mobile Money', value:'CM_EUMM'},
    //{name:'Visa/MasterCard', value:'CM_VISAMASTERCARD'},
    //{name:'Nexttel Possa', value:'CM_NEXTTELPOSSA'}
  ]
  constructor(public dialogRef: MatDialogRef<PaymentPopupComponent>,private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any, private service: apiService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      mobile: ['', Validators.required],
      operator: ['', Validators.required]
    })
  }

  onSubmit(){
      let params = {
        planId: this.data.selectedPlanId,
        ...this.myForm.value
      }
      this.service.paymentRequest(params).subscribe((resp) => {
        if(resp.status){
          this.service.showSuccess(resp.msg);
          this.dialogRef.close(resp);
        }else {
          this.service.showError(resp.msg);
        }
      })
    

  }

}
