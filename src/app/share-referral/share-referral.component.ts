import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-referral',
  templateUrl: './share-referral.component.html',
  styleUrls: ['./share-referral.component.scss']
})
export class ShareReferralComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShareReferralComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
