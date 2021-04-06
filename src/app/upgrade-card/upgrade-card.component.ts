import { Component, OnInit } from '@angular/core';
import { apiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CookieService } from '../services/cookie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upgrade-card',
  templateUrl: './upgrade-card.component.html',
  styleUrls: ['./upgrade-card.component.scss']
})
export class UpgradeCardComponent implements OnInit {
  plans = [];
  userData;
  current_card;
  constructor(private service: apiService, private cookieService: CookieService,
    private router: Router, public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpgradeCardComponent>,
  ) { }

  ngOnInit(): void {
    let ud = localStorage.getItem('currentUser');
    this.userData = JSON.parse(ud);

    this.getPlans();
  }
  getPlans() {
    this.service.getPlans({}).subscribe((resp) => {
      if (resp.status) {
        this.plans = resp.data;
      }
    })
  }

  upgradeCard() {
    this.dialogRef.close();
    this.router.navigate(['register']);

  }

}
