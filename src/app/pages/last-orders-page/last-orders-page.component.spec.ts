import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastOrdersPageComponent } from './last-orders-page.component';

describe('LastOrdersPageComponent', () => {
  let component: LastOrdersPageComponent;
  let fixture: ComponentFixture<LastOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastOrdersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
