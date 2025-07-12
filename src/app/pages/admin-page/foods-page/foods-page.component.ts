import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Food } from '../../../models/food.model';
import { FoodService } from '../../../services/food.service';
import { ConfirmDialogComponent } from '../../../ui/confirm-dialog/confirm-dialog.component';
import { FoodsTableComponent } from './foods-table/foods-table.component';
import { TitleComponent } from '../../../ui/title/title.component';

@Component({
  selector: 'app-foods-page',
  imports: [
    RouterLink,
    FoodsTableComponent,
    ConfirmDialogComponent,
    TitleComponent,
  ],
  templateUrl: './foods-page.component.html',
  styleUrl: './foods-page.component.scss',
})
export class FoodsPageComponent {
  foods: Food[] = [];
  showConfirm = false;
  foodToRemove: number | null = null;

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((val) => {
      this.foods = val.sort((a, b) => {
        if (a.week === b.week) {
          return a.day - b.day;
        }
        return a.week - b.week;
      });
    });
  }

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

  onRemoveFood(id: number) {
    this.foodToRemove = id;
    this.showConfirm = true;
  }

  onConfirmRemove() {
    if (this.foodToRemove !== null) {
      this.removeFood(this.foodToRemove);
    }
    this.showConfirm = false;
    this.foodToRemove = null;
  }

  onCancelRemove() {
    this.showConfirm = false;
    this.foodToRemove = null;
  }
}
