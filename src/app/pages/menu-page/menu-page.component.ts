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
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { ColorPaletteComponent } from '../../ui/color-palette/color-palette.component';
import { FoodItemComponent } from '../../ui/food-item/food-item.component';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';
import { TitleComponent } from '../../ui/title/title.component';
import { WeekCalendarComponent } from '../../ui/week-calendar/week-calendar.component';

@Component({
  selector: 'app-menu-page',
  imports: [
    WeekCalendarComponent,
    FoodItemComponent,
    NgFor,
    SvgIconComponent,
    ColorPaletteComponent,
    BgLogoComponent,
    TitleComponent,
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
      this.loadOrdersByWeek(userId, this.currentWeekNumber);
    }

    this.loginService.logout$.subscribe(() => {
      userId = null;
      this.loadFoodItemsWithoutChecked();
    });
  }

  loadOrdersByWeek(userId: number, week: number): void {
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
        const foodDate = DateTime.fromFormat(
          food.date,
          'dd.MM.yyyy'
        ).toISODate();
        const orderDate = this.orders.find((order) => {
          const orderDate = DateTime.fromISO(order.date).toISODate();
          return orderDate === foodDate;
        });
        if (orderDate) {
          food.checked = true;
        } else {
          food.checked = false;
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
    if (userId !== null) {
      this.loadOrdersByWeek(userId, weekNumber);
    } else {
      this.loadFoodItemsWithoutChecked();
    }
  }

  sendOrderToCart(order: Order): void {
    if (order.checked) {
      this.cartService.addToCart(order);
    } else {
      this.cartService.removeFromCart(order);
      this.sendEmptyOrderToCart(order);
    }
  }

  sendEmptyOrderToCart(order: Order): void {
    const emptyOrder: Order = {
      ...order,
      checked: false,
      foodPrice: -order.foodPrice,
    };
    this.cartService.addToCart(emptyOrder);
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  getColor(index: number): string {
    return this.currentColorScheme[index % this.currentColorScheme.length];
  }

  onColorSchemeChanged(newColorScheme: string[]): void {
    this.currentColorScheme = newColorScheme;
  }
}
