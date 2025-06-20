import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders-per-month-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-per-month-page.component.html',
  styleUrl: './orders-per-month-page.component.scss',
})
export class OrdersPerMonthPageComponent implements OnInit {
  orders: Order[] = [];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  years: number[] = [];
  totalOrders: number = 0;
  uniqueUsers: number = 0;
  userOrderStats: { userId: number; orderCount: number }[] = [];

  months = [
    { value: 1, name: 'Januar' },
    { value: 2, name: 'Februar' },
    { value: 3, name: 'März' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Juni' },
    { value: 7, name: 'Juli' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'Oktober' },
    { value: 11, name: 'November' },
    { value: 12, name: 'Dezember' },
  ];

  constructor(private http: HttpClient, private orderService: OrderService) {
    const currentYear = new Date().getFullYear();
    for (let year = 2025; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.fetchOrders(this.currentMonth, this.currentYear);
  }

  onMonthOrYearChange(): void {
    this.fetchOrders(this.currentMonth, this.currentYear);
  }

  fetchOrders(month: number, year: number): void {
    this.orderService.getOrdersByMonth(month, year).subscribe(
      (orders) => {
        this.orders = orders;
        this.calculateStatistics();

        const userOrderMap = new Map<number, number>();
        orders.forEach((order) => {
          if (order.userId) {
            userOrderMap.set(
              order.userId,
              (userOrderMap.get(order.userId) || 0) + 1
            );
          }
        });
        this.userOrderStats = Array.from(userOrderMap.entries()).map(
          ([userId, orderCount]) => ({
            userId,
            orderCount,
          })
        );
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  calculateStatistics(): void {
    this.totalOrders = this.orders.length;
    const userIds = this.orders
      .filter((order) => order.userId)
      .map((order) => order.userId);
    this.uniqueUsers = new Set(userIds).size;
  }
}
