import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { forkJoin } from 'rxjs';
import { Food } from '../../models/food.model';
import { Order } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
import { LoginService } from '../../services/login.service';
import { LuxonDateService } from '../../services/luxon-date.service';
import { UserOrderService } from '../../services/user-order.service';
import { ColorPaletteComponent } from '../../ui/color-palette/color-palette.component';
import { FoodItemComponent } from '../../ui/food-item/food-item.component';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';
import { WeekCalendarComponent } from '../../ui/week-calendar/week-calendar.component';

@Component({
  selector: 'app-menu-page',
  imports: [
    WeekCalendarComponent,
    FoodItemComponent,
    NgFor,
    SvgIconComponent,
    ColorPaletteComponent,
  ],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  orders: Order[] = [];
  userId: number = 0;
  foodItems: Food[] = [];
  currentWeekFoodItems: Food[] = [];
  currentWeekNumber: number = DateTime.now().weekNumber;
  currentColorScheme: string[] = [
    '#16869554',
    '#23b12344',
    '#a1ba0246',
    '#f296013e',
    '#e751113c',
  ];

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private loginService: LoginService,
    private luxonDateService: LuxonDateService,
    private router: Router,
    private userOrderService: UserOrderService
  ) {}

  ngOnInit(): void {
    let userId = this.loginService.getUserId();
    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
      this.currentColorScheme = JSON.parse(savedColorScheme);
    }

    if (userId === null) {
      this.loadFoodItemsWithoutChecked();
    } else {
      this.loadFoodItemsAndOrders(userId, this.currentWeekNumber);
    }

    this.loginService.logout$.subscribe(() => {
      userId = null;
      this.loadFoodItemsWithoutChecked();
    });
  }

  loadFoodItemsAndOrders(userId: number, week: number): void {
    forkJoin({
      foods: this.foodService.getAllFoods(),
      orders: this.userOrderService.getOrdersByUserIdAndWeek(userId, week),
    }).subscribe(({ foods, orders }) => {
      this.foodItems = foods.map((food) => {
        const foodItemComponent = new FoodItemComponent(
          this.foodService,
          this.luxonDateService
        );
        foodItemComponent.food = food;
        foodItemComponent.ngOnInit();
        return foodItemComponent.food;
      });
      this.foodItems = foods;
      this.orders = orders;

      this.foodItems.forEach((food) => {
        const foodDate = DateTime.fromFormat(food.date, 'dd.MM.yyyy');
        const matchingOrder = this.orders.find((order) =>
          DateTime.fromISO(order.date).hasSame(foodDate, 'day')
        );
        if (matchingOrder) {
          food.checked = true;
        }
      });

      this.updateCurrentWeekFoodItems();
    });
  }

  loadFoodItemsWithoutChecked(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods.map((food) => {
        food.checked = false;
        return food;
      });
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
    const userId = this.loginService.getUserId();
    if (this.userId !== null) {
      this.loadFoodItemsAndOrders(this.userId, weekNumber);
    } else {
      this.loadFoodItemsWithoutChecked();
    }
  }

  onFoodChecked(food: Food): void {
    if (food.checked) {
      this.cartService.addToCart(food);
    } else {
      this.cartService.removeFromCart(food);
      this.sendEmptyFoodToCart(food);
    }
  }

  sendEmptyFoodToCart(food: Food): void {
    const emptyFood: Food = { ...food, checked: false, price: -food.price };
    this.cartService.addToCart(emptyFood);
  }

  goToCart() {
    this.router.navigateByUrl('/cart-page');
  }

  getColor(index: number): string {
    return this.currentColorScheme[index % this.currentColorScheme.length];
  }

  onColorSchemeChanged(newColorScheme: string[]): void {
    this.currentColorScheme = newColorScheme;
  }
}
