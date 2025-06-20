import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPerMonthPageComponent } from './orders-per-month-page.component';

describe('OrdersPerMonthPageComponent', () => {
  let component: OrdersPerMonthPageComponent;
  let fixture: ComponentFixture<OrdersPerMonthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPerMonthPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPerMonthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
