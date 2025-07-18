import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMonthOrdersTableComponent } from './user-month-orders-table.component';

describe('UserMonthOrdersTableComponent', () => {
  let component: UserMonthOrdersTableComponent;
  let fixture: ComponentFixture<UserMonthOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMonthOrdersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMonthOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
