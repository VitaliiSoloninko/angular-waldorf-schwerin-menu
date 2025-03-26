import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateFood } from '../../../models/create-food.model';

@Component({
  selector: 'app-edit-food-page',
  imports: [FormsModule],
  templateUrl: './edit-food-page.component.html',
  styleUrl: './edit-food-page.component.scss',
})
export class EditFoodPageComponent implements OnInit {
  formData: CreateFood = {
    name: '',
    day: 1,
    week: 1,
    price: 0,
    description: '',
    image: '',
    isChecked: false,
  };

  foodId: number | null = null;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.foodId) {
      this.foodService.getFoodById(this.foodId).subscribe((food) => {
        this.formData = {
          ...food,
          isChecked: food.checked,
        };
      });
    }
  }

  save() {
    if (this.foodId) {
      this.foodService.updateFood(this.foodId, this.formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/foods']);
        },
        error: (er: any) => {
          console.log(er);
        },
      });
    }
  }
}
