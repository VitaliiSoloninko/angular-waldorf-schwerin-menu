import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { FoodService } from '../../../../services/food.service';
import { Food } from '../../../models/food.model';

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
