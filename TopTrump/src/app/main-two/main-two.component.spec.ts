import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTwoComponent } from './main-two.component';

describe('MainTwoComponent', () => {
  let component: MainTwoComponent;
  let fixture: ComponentFixture<MainTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
