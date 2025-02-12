import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronDown, LucideAngularModule, Vegan } from 'lucide-angular';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../models/food.model';
import { CheckBoxComponent } from '../../ui/check-box/check-box.component';

@Component({
  selector: 'app-menu-page',
  imports: [RouterLink, NgFor, LucideAngularModule, CheckBoxComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  chevronDown: any = ChevronDown;
  vegan: any = Vegan;
  foodItems: Food[] = [];

  constructor(private foodService: FoodService) {}
  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods;
    });
  }
}
