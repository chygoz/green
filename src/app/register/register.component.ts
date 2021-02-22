import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(public fb: FormBuilder, private service: apiService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required], 
      mobile: ['', Validators.required], 
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      password: ['', Validators.required],
      referralId: [''],
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe((data) => {
      console.log(data);
    })
  }

}
