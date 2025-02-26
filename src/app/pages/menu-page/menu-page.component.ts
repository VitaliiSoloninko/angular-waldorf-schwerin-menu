import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Food } from '../../models/food.model';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods;
    });
  }

  addToCart() {
    for (let i = 0; i < this.foodItems.length; i++) {
      if (this.foodItems[i].isChecked === true) {
        this.cartService.addToCart(this.foodItems[i]);
      }
    }
    console.log(this.foodItems[0]);
    this.router.navigateByUrl('/cart-page');
  }
}
