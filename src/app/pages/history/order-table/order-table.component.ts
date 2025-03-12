import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { LoginService } from '../../../services/login.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-table',
  imports: [CurrencyPipe],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  totalPrice: number = 0;

  constructor(
    private loginService: LoginService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders) => {
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
  }

  calculateTotalPrice(): number {
    return this.orders.reduce((total, order) => total + order.price, 0);
  }
}
