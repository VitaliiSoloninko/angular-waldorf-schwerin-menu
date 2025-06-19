import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfUserMonthOrdersComponent } from './pdf-user-month-orders.component';

describe('PdfUserMonthOrdersComponent', () => {
  let component: PdfUserMonthOrdersComponent;
  let fixture: ComponentFixture<PdfUserMonthOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfUserMonthOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfUserMonthOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
