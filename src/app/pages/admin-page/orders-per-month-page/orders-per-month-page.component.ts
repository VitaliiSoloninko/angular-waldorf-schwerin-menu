import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { USERS_ORDERS } from '../../../urls';

@Component({
  selector: 'app-orders-per-month-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-per-month-page.component.html',
  styleUrl: './orders-per-month-page.component.scss',
})
export class OrdersPerMonthPageComponent {
  orders: any[] = []; // Store the fetched data
  currentMonth: number = new Date().getMonth() + 1; // Current month (1-based)
  currentYear: number = new Date().getFullYear(); // Current year
  totalOrders: number = 0;
  uniqueUsers: number = 0;
  usersWhoOrdered: any[] = [];

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

  years: number[] = [];

  constructor(private http: HttpClient, private orderService: OrderService) {
    const currentYear = new Date().getFullYear();
    for (let year = 2025; year <= currentYear + 5; year++) {
      this.years.push(year);
    }
  }

  fetchBills(month: number, year: number): void {
    const apiUrl =
      USERS_ORDERS + `/filter-by-month?month=${month}&year=${year}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.orders = data;
        this.calculateStatistics();
        console.log('Fetched bills:', this.orders);
      },
      (error) => {
        console.error('Error fetching bills:', error);
      }
    );
  }

  calculateStatistics(): void {
    this.totalOrders = this.orders.length;
    const userIds = this.orders.map((order) => order.userId);
    this.uniqueUsers = new Set(userIds).size;
  }

  onMonthOrYearChange(): void {
    this.fetchBills(this.currentMonth, this.currentYear);
  }

  ngOnInit(): void {
    this.fetchBills(this.currentMonth, this.currentYear);
  }
}
