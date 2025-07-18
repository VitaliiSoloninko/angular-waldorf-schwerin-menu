import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-user-month-orders-table',
  imports: [CurrencyPipe],
  templateUrl: './user-month-orders-table.component.html',
  styleUrl: './user-month-orders-table.component.scss',
})
export class UserMonthOrdersTableComponent {
  @Input() orders: Order[] = [];
  @Input() totalPrice: number = 0;
  @Input() currentMonthName: string = '';
}
