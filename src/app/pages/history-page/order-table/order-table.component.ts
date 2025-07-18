import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-table',
  imports: [CurrencyPipe],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent {
  @Input() orders: Order[] = [];
  @Input() totalPrice: number = 0;
  @Input() currentMonthName: string = '';
}
