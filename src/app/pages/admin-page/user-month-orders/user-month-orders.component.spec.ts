import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMonthOrdersComponent } from './user-month-orders.component';

describe('UserMonthOrdersComponent', () => {
  let component: UserMonthOrdersComponent;
  let fixture: ComponentFixture<UserMonthOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMonthOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMonthOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
