import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { Food } from '../../../food.model';
import { FoodService } from '../../../food.service';

@Component({
  selector: 'app-foods-page',
  imports: [NgFor, RouterLink, LucideAngularModule],
  templateUrl: './foods-page.component.html',
  styleUrl: './foods-page.component.scss',
})
export class FoodsPageComponent implements OnInit {
  trash2: any = Trash2;

  constructor(private foodService: FoodService) {}

  foods: Food[] = [];

  ngOnInit(): void {
    this.foodService.getAll().subscribe((data) => {
      this.foods = data;
    });
  }

  removeFood(id: number) {
    this.foodService.remove(id).subscribe({
      next: (val) => {
        this.foods = this.foods.filter((_) => _.id != id);
      },
    });
  }
}
