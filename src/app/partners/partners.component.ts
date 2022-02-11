import { Component, OnInit } from '@angular/core';
import { apiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  partners = [];
  errorMsg = '';
  searchForm: FormGroup;
  constructor(public fb: FormBuilder, private service: apiService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      partner: ['', [Validators.required]],
      category: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.getPartners();
  }

  getPartners() {
    this.service.getPartners().subscribe((resp) => {
      if (resp.status) {
        this.partners = resp.data;
      }

    })
  }

  onSubmit() {
    this.service.searchPartner(this.searchForm.value).subscribe((data) => {
      if (!data.status) {
        this.errorMsg = data.msg;
        this.partners = [];
      } else {
        this.partners = data.data;
      }
    })
  }




}
