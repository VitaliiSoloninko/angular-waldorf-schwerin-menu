import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from '../../../../models/food.model';

@Component({
  selector: 'app-foods-table',
  imports: [],
  templateUrl: './foods-table.component.html',
  styleUrl: './foods-table.component.scss',
})
export class FoodsTableComponent {
  @Input() foods: Food[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  editFood(id: number) {
    this.edit.emit(id);
  }

  removeFood(id: number) {
    this.remove.emit(id);
  }
}
