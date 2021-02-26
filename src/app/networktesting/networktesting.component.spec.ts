import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworktestingComponent } from './networktesting.component';

describe('NetworktestingComponent', () => {
  let component: NetworktestingComponent;
  let fixture: ComponentFixture<NetworktestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworktestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworktestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
