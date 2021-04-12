import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';
import { MustMatch } from './../_helpers/must-match.validator';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  _id;
  form1Submit: boolean = false;
  constructor(public fb: FormBuilder, private service: apiService,
    private route: ActivatedRoute,
    private router: Router, private cookieService: CookieService) { }
  errorMsg;
  successMsg;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this._id = params.id;
      } else {
        this.router.navigate(['forgot-password']);
      }
    });


    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      })
  }
  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.form1Submit = true;
    if (!this.resetForm.valid) {
      return false;
    }
    this.resetForm.value._id = this._id
    this.service.resetPassword(this.resetForm.value).subscribe((resp) => {
      if (!resp.status) {
        this.errorMsg = resp.msg;
        this.successMsg = "";
      } else {
        this.errorMsg = "";
        this.successMsg = "Password reset successfully, Please try to with new reset password";
      }
    })

  }

}
