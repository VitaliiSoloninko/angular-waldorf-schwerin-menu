import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Food } from '../../models/food.model';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
import { LuxonDateService } from '../../services/luxon-date.service';
import { FoodItemComponent } from '../../ui/food-item/food-item.component';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';
import { WeekCalendarComponent } from '../../ui/week-calendar/week-calendar.component';

@Component({
  selector: 'app-menu-page',
  imports: [WeekCalendarComponent, FoodItemComponent, NgFor, SvgIconComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  foodItems: Food[] = [];
  currentWeekFoodItems: Food[] = [];
  currentWeekNumber: number = 1;

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
      this.foodItems = foods;
      this.updateCurrentWeekFoodItems();
    });
  }

  updateCurrentWeekFoodItems(): void {
    const firstWeekOfYear = DateTime.local().startOf('year').startOf('week');
    const weekStartDate = firstWeekOfYear.plus({
      weeks: this.currentWeekNumber - 1,
    });

    this.currentWeekFoodItems = this.foodItems
      .filter((food, index) => {
        const weekNumber = Math.floor(index / 5) + 1;
        return (
          (weekNumber % 2 === 0 && this.currentWeekNumber % 2 === 0) ||
          (weekNumber % 2 !== 0 && this.currentWeekNumber % 2 !== 0)
        );
      })
      .map((food, index) => {
        food.date = weekStartDate
          .plus({ days: index % 5 })
          .toFormat('dd.MM.yyyy');
        return food;
      });
  }

  onWeekChanged(weekNumber: number): void {
    this.currentWeekNumber = weekNumber;
    this.updateCurrentWeekFoodItems();
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
