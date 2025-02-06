import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodService } from '../../../../services/food.service';
import { CreateFood } from '../../../models/create-food.model';

@Component({
  selector: 'app-create-food-page',
  imports: [FormsModule],
  templateUrl: './create-food-page.component.html',
  styleUrl: './create-food-page.component.scss',
})
export class CreateFoodPageComponent {
  constructor(private foodService: FoodService, private router: Router) {}

  formData: CreateFood = {
    name: 'Menu ...',
    week: 1,
    price: 4,
    description: '',
    image: '',
  };

  create() {
    this.foodService.create(this.formData).subscribe({
      next: (val) => {
        this.router.navigate(['/admin/foods']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
