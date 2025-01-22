import { Component } from '@angular/core';
import { OrderTableComponent } from './order-table/order-table.component';

@Component({
  selector: 'app-history',
  imports: [OrderTableComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {}
