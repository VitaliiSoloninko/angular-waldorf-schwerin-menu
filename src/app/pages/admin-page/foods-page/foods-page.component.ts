import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Food } from '../../../food.model';
import { FoodService } from '../../../food.service';

@Component({
  selector: 'app-foods-page',
  imports: [NgFor, RouterLink],
  templateUrl: './foods-page.component.html',
  styleUrl: './foods-page.component.scss',
})
export class FoodsPageComponent implements OnInit {
  constructor(private foodService: FoodService) {}

  foods: Food[] = [];

  ngOnInit(): void {
    this.foodService.getAll().subscribe((data) => {
      this.foods = data;
    });
  }
}
