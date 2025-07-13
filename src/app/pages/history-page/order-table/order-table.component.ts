import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { LoginService } from '../../../services/login.service';
import { UserOrderService } from '../../../services/user-order.service';

@Component({
  selector: 'app-order-table',
  imports: [CurrencyPipe],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent implements OnInit {
  @Input() currentMonth!: number;
  @Input() currentYear!: number;

  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;

  constructor(
    private loginService: LoginService,
    private userOrderService: UserOrderService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId() ?? 0;
    if (this.userId === null) {
      return;
    }
    this.fetchOrders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentMonth'] || changes['currentYear']) {
      this.fetchOrders();
    }
  }

  fetchOrders(): void {
    this.userOrderService
      .getOrdersByUserIdAndMonth(
        this.userId,
        this.currentMonth,
        this.currentYear
      )
      .subscribe((orders) => {
        this.orders = orders
          .map((order) => ({
            ...order,
            date: DateTime.fromISO(order.date).toFormat('dd.MM.yyyy'),
          }))
          .sort(
            (a, b) =>
              DateTime.fromFormat(a.date, 'dd.MM.yyyy').toMillis() -
              DateTime.fromFormat(b.date, 'dd.MM.yyyy').toMillis()
          );
        this.totalPrice = this.calculateTotalPrice();
        console.log(this.orders);
      });
  }

  calculateTotalPrice(): number {
    return this.orders.reduce((total, order) => total + order.foodPrice, 0);
  }

  getCurrentMonthName(): string {
    return DateTime.fromObject({
      month: this.currentMonth,
      year: this.currentYear,
    })
      .setLocale('de')
      .toFormat('LLLL');
  }
}
