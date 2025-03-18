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
  colorPalette: string[] = [
    '#16869554',
    '#23b12344',
    '#a1ba0246',
    '#f296013e',
    '#e751113c',
  ];

  colorGreen: string[] = [
    '#23b12321',
    '#23b12321',
    '#23b12321',
    '#23b12321',
    '#23b12321',
  ];
  currentColorScheme: string[] = this.colorPalette;

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private luxonDateService: LuxonDateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
      this.currentColorScheme = JSON.parse(savedColorScheme);
    }

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

  getColor(index: number): string {
    return this.currentColorScheme[index % this.currentColorScheme.length];
  }

  toggleColorScheme(): void {
    if (this.currentColorScheme === this.colorPalette) {
      this.currentColorScheme = this.colorGreen;
    } else {
      this.currentColorScheme = this.colorPalette;
    }
    localStorage.setItem(
      'colorScheme',
      JSON.stringify(this.currentColorScheme)
    );
  }
}
