import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { LoginService } from '../../../services/login.service';
import { UserOrderService } from '../../../services/user-order.service';

@Component({
  selector: 'app-order-table',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;

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

  goToNextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.fetchOrders();
  }

  goToPreviousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.fetchOrders();
  }
}
