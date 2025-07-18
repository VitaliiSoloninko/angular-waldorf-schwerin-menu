import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';
import { UserOrderService } from '../../../services/user-order.service';
import { UserService } from '../../../services/user.service';
import { MonthSwitcherComponent } from '../../../ui/month-switcher/month-switcher.component';
import { PdfUserMonthOrdersComponent } from '../../../ui/pdf-user-month-orders/pdf-user-month-orders.component';
import { OrderTableComponent } from '../../history-page/order-table/order-table.component';

@Component({
  selector: 'app-user-month-orders',
  imports: [
    CommonModule,
    MonthSwitcherComponent,
    OrderTableComponent,
    PdfUserMonthOrdersComponent,
  ],
  templateUrl: './user-month-orders.component.html',
  styleUrl: './user-month-orders.component.scss',
})
export class UserMonthOrdersComponent implements OnInit {
  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;
  user: User | null = null;
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;

  get currentMonthYear(): string {
    return `${this.currentMonth}.${this.currentYear}`;
  }

  constructor(
    private route: ActivatedRoute,
    private userOrderService: UserOrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    if (!this.userId) {
      return;
    }

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
    });
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
