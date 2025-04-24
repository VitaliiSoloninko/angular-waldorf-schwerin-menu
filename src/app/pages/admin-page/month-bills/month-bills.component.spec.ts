import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthBillsComponent } from './month-bills.component';

describe('MonthBillsComponent', () => {
  let component: MonthBillsComponent;
  let fixture: ComponentFixture<MonthBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
