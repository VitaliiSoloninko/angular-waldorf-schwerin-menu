import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { LoginService } from '../../../services/login.service';
import { UserOrderService } from '../../../services/user-order.service';
import { MonthSwitcherComponent } from '../../../ui/month-switcher/month-switcher.component';

@Component({
  selector: 'app-order-table',
  imports: [CurrencyPipe, CommonModule, MonthSwitcherComponent],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;
  months: string[] = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];

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

  onMonthChanged(event: { month: number; year: number }): void {
    this.currentMonth = event.month;
    this.currentYear = event.year;
    this.fetchOrders();
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
