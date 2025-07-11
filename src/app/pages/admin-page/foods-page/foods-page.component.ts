import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';

import { Food } from '../../../models/food.model';
import { FoodService } from '../../../services/food.service';
import { IconButtonComponent } from '../../../ui/icon-button/icon-button.component';

@Component({
  selector: 'app-foods-page',
  imports: [NgFor, RouterLink, LucideAngularModule, IconButtonComponent],
  templateUrl: './foods-page.component.html',
  styleUrl: './foods-page.component.scss',
})
export class FoodsPageComponent implements OnInit {
  pencil: any = Pencil;
  trash2: any = Trash2;
  fileText: any = FileText;
  foods: Food[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((val) => {
      this.foods = val.sort((a, b) => {
        if (a.week === b.week) {
          return a.day - b.day;
        }
        return a.week - b.week;
      });
    });
  }

  editFood(id: number) {
    this.router.navigate(['/admin/food', id]);
  }

  removeFood(id: number) {
    this.foodService.removeFood(id).subscribe({
      next: (val) => {
        this.foods = this.foods.filter((_) => _.id != id);
      },
    });
  }
}
