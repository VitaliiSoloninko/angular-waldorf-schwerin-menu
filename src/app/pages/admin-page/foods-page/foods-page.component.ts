import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';

import { Food } from '../../../models/food.model';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-foods-page',
  imports: [NgFor, RouterLink, LucideAngularModule],
  templateUrl: './foods-page.component.html',
  styleUrl: './foods-page.component.scss',
})
export class FoodsPageComponent implements OnInit {
  pencil: any = Pencil;
  trash2: any = Trash2;
  fileText: any = FileText;

  constructor(private foodService: FoodService, private router: Router) {}

  foods: Food[] = [];

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((data) => {
      this.foods = data;
    });
  }

  editFood(id: number) {
    // this.foodService.getFoodById(id).subscribe({
    //   next: (val) => {
    //     this.foods = this.foods.filter((_) => _.id != id);
    //   },
    // });
    this.router.navigate(['/admin/edit', id]);
  }

  removeFood(id: number) {
    this.foodService.removeFood(id).subscribe({
      next: (val) => {
        this.foods = this.foods.filter((_) => _.id != id);
      },
    });
  }
}
