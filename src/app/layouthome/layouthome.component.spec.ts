import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayouthomeComponent } from './layouthome.component';

describe('LayouthomeComponent', () => {
  let component: LayouthomeComponent;
  let fixture: ComponentFixture<LayouthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayouthomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayouthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
