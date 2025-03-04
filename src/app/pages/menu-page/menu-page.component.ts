import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Food } from '../../models/food.model';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
import { LuxonDateService } from '../../services/luxon-date.service';
import { FoodItemComponent } from '../../ui/food-item/food-item.component';
import { WeekCalendarComponent } from '../../ui/week-calendar/week-calendar.component';

@Component({
  selector: 'app-menu-page',
  imports: [WeekCalendarComponent, FoodItemComponent, NgFor],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  foodItems: Food[] = [];

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private luxonDateService: LuxonDateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods.map((food) => {
        // Create a new instance of FoodItemComponent to set the date
        const foodItemComponent = new FoodItemComponent(
          this.foodService,
          this.luxonDateService
        );
        foodItemComponent.food = food;
        foodItemComponent.ngOnInit();
        return foodItemComponent.food;
      });
    });
  }

  onFoodChecked(food: Food): void {
    if (food.checked) {
      this.cartService.addToCart(food);
    } else {
      this.cartService.removeFromCart(food);
    }
  }

  goToCart() {
    this.router.navigateByUrl('/cart-page');
  }
}
