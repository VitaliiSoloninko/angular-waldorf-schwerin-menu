import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Food } from '../../../models/food.model';
import { FoodService } from '../../../services/food.service';
import { IconButtonComponent } from '../../../ui/icon-button/icon-button.component';
import { FoodsTableComponent } from './foods-table/foods-table.component';

@Component({
  selector: 'app-foods-page',
  imports: [RouterLink, IconButtonComponent, FoodsTableComponent],
  templateUrl: './foods-page.component.html',
  styleUrl: './foods-page.component.scss',
})
export class FoodsPageComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  editFood(id: number) {
    this.router.navigate(['/admin/food', id]);
  }

  removeFood(id: number) {
    this.foodService.removeFood(id).subscribe({
      next: (val) => {
        this.foods = this.foods.filter((_) => _.id != id);
      },
    });
  }
}
