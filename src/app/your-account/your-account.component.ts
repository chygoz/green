import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareReferralComponent } from '../share-referral/share-referral.component';

@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss']
})
export class YourAccountComponent implements OnInit {

  constructor(location: Location,
    public dialog: MatDialog,

    private router: Router
  ) { }

  ngOnInit(): void {
  }

  shareDialog() {
    let dialogRef = this.dialog.open(ShareReferralComponent,
      {
        panelClass: 'my-full-screen-dialog', width: '800px',
        position: { top: '100px' },
      });

    dialogRef.afterClosed().subscribe(() => {
    })

  }

}
