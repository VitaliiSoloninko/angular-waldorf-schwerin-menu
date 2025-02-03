import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodPageComponent } from './create-food-page.component';

describe('CreateFoodPageComponent', () => {
  let component: CreateFoodPageComponent;
  let fixture: ComponentFixture<CreateFoodPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFoodPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
