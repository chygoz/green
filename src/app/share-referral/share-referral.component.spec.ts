import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareReferralComponent } from './share-referral.component';

describe('ShareReferralComponent', () => {
  let component: ShareReferralComponent;
  let fixture: ComponentFixture<ShareReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
