import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { CurrencyPipe } from '@angular/common';
import { LayoutList, ListTodo, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-user-month-orders-table',
  imports: [CurrencyPipe, LucideAngularModule],
  templateUrl: './user-month-orders-table.component.html',
  styleUrl: './user-month-orders-table.component.scss',
})
export class UserMonthOrdersTableComponent {
  @Input() orders: Order[] = [];
  @Input() totalPrice: number = 0;
  @Input() currentMonthName: string = '';
  layoutList: any = LayoutList;
}
