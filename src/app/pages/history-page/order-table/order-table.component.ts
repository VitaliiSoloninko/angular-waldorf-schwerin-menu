import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;

  constructor(
    private loginService: LoginService,
    private userOrderService: UserOrderService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.getUserId();
    if (userId === null) {
      return;
    }
    const currentDate = DateTime.now();
    const month = currentDate.month;
    const year = currentDate.year;
    this.userOrderService
      .getOrdersByUserIdAndCurrentMonth(userId)
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
      });
    console.log(userId);
  }

  calculateTotalPrice(): number {
    return this.orders.reduce((total, order) => total + order.foodPrice, 0);
  }
}
