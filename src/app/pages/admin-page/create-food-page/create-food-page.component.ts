import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateFood } from '../../../models/create-food.model';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-create-food-page',
  imports: [FormsModule],
  templateUrl: './create-food-page.component.html',
  styleUrl: './create-food-page.component.scss',
})
export class CreateFoodPageComponent {
  constructor(private foodService: FoodService, private router: Router) {}

  formData: CreateFood = {
    name: 'Menu ',
    day: 1,
    week: 1,
    price: 4,
    description: '',
    image: '',
    isChecked: false,
  };

  create() {
    console.log(this.formData);
    this.foodService.createFood(this.formData).subscribe({
      next: (val) => {
        this.router.navigate(['/admin/foods']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  goToFoods() {
    this.router.navigate(['/admin/foods']);
  }
}
