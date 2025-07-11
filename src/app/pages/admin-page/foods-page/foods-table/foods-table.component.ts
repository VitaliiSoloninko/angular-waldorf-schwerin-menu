import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../../../models/food.model';
import { FoodService } from '../../../../services/food.service';

@Component({
  selector: 'app-foods-table',
  imports: [],
  templateUrl: './foods-table.component.html',
  styleUrl: './foods-table.component.scss',
})
export class FoodsTableComponent implements OnInit {
  @Input() foods: Food[] = [];
  @Output() edit = new EventEmitter<number>();
  private foodService = inject(FoodService);
  private router = inject(Router);

  editFood(id: number) {
    this.edit.emit(id);
  }

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
}
