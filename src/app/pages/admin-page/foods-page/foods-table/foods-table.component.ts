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
import { ConfirmDialogComponent } from '../../../../ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-foods-table',
  imports: [ConfirmDialogComponent],
  templateUrl: './foods-table.component.html',
  styleUrl: './foods-table.component.scss',
})
export class FoodsTableComponent implements OnInit {
  @Input() foods: Food[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  showConfirm = false;
  foodToRemove: number | null = null;

  private foodService = inject(FoodService);
  private router = inject(Router);

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
    this.edit.emit(id);
  }

  removeFood(id: number) {
    this.foodToRemove = id;
    this.showConfirm = true;
  }

  onConfirmRemove() {
    if (this.foodToRemove !== null) {
      this.remove.emit(this.foodToRemove);
      this.foodToRemove = null;
    }
    this.showConfirm = false;
  }

  onCancelRemove() {
    this.foodToRemove = null;
    this.showConfirm = false;
  }
}
