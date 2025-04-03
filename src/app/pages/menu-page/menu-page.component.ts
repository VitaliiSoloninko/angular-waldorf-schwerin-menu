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
import { MenuStateService } from '../../services/menu-state.service';
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
  userId: number | null = 0;
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
    private userOrderService: UserOrderService,
    private menuStateService: MenuStateService
  ) {}

  ngOnInit(): void {
    const savedFoodItems = this.menuStateService.getFoodItems();

    if (savedFoodItems.length > 0) {
      // Restore the state if it exists
      this.foodItems = savedFoodItems;
      this.updateCurrentWeekFoodItems();
    } else {
      // Load data from the server if no saved state exists
      this.userId = this.loginService.getUserId() ?? 0;
      const savedColorScheme = localStorage.getItem('colorScheme');
      if (savedColorScheme) {
        this.currentColorScheme = JSON.parse(savedColorScheme);
      }

      if (this.userId === null) {
        this.loadFoodItemsWithoutChecked();
      } else {
        this.loadOrdersByWeek(this.userId, this.currentWeekNumber);
      }

      this.loginService.logout$.subscribe(() => {
        this.userId = null;
        this.loadFoodItemsWithoutChecked();
      });
    }
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
          food.initialChecked = food.checked;
        } else {
          food.checked = false;
          food.initialChecked = food.checked;
        }
      });

      // Save the state to the service
      this.menuStateService.setFoodItems(this.foodItems);

      this.updateCurrentWeekFoodItems();
    });
  }

  loadFoodItemsWithoutChecked(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods.map((food) => {
        food.checked = false;
        return food;
      });

      // Save the state to the service
      this.menuStateService.setFoodItems(this.foodItems);

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

  sendOrderToCart(food: Food): void {
    const order: Order = {
      id: undefined,
      userId: this.userId ?? 0,
      day: DateTime.fromFormat(food.date, 'dd.MM.yyyy').day,
      dayName: DateTime.fromFormat(food.date, 'dd.MM.yyyy').toFormat('cccc'),
      week: DateTime.fromFormat(food.date, 'dd.MM.yyyy').weekNumber,
      month: DateTime.fromFormat(food.date, 'dd.MM.yyyy').month,
      year: DateTime.fromFormat(food.date, 'dd.MM.yyyy').year,
      foodId: food.id,
      foodName: food.name,
      foodPrice: food.checked
        ? food.price
        : food.initialChecked
        ? -food.price
        : 0,
      date: food.date,
      checked: food.checked,
    };

    if (food.checked) {
      this.cartService.addToCart(order);
      // console.log('Order added:', order);
    } else {
      if (food.initialChecked) {
        this.cartService.addToCart(order);
        // console.log('Order updated with -4 €:', order);
      } else {
        this.cartService.removeFromCart(order);
        // console.log('Order removed:', order);
      }
    }
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
