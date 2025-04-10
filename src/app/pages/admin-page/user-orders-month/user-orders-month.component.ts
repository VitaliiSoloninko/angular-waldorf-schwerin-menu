import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { UserOrderService } from '../../../services/user-order.service';

@Component({
  selector: 'app-user-orders-month',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './user-orders-month.component.html',
  styleUrl: './user-orders-month.component.scss',
})
export class UserOrdersMonthComponent implements OnInit {
  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userOrderService: UserOrderService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    if (!this.userId) {
      return;
    }

    const currentDate = DateTime.now();
    const month = currentDate.month;
    const year = currentDate.year;

    this.userOrderService
      .getOrdersByUserIdAndMonth(this.userId, month)
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
}
