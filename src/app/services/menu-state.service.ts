import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class MenuStateService {
  private foodItems: Food[] = [];

  setFoodItems(items: Food[]): void {
    this.foodItems = items;
  }

  getFoodItems(): Food[] {
    return this.foodItems;
  }

  clearState(): void {
    this.foodItems = [];
  }
}
