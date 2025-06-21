import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { PdfUserMonthOrdersComponent } from '../../../ui/pdf-user-month-orders/pdf-user-month-orders.component';

@Component({
  selector: 'app-orders-per-month-page',
  imports: [CommonModule, FormsModule, RouterLink, PdfUserMonthOrdersComponent],
  templateUrl: './orders-per-month-page.component.html',
  styleUrl: './orders-per-month-page.component.scss',
})
export class OrdersPerMonthPageComponent implements OnInit {
  @ViewChildren(PdfUserMonthOrdersComponent)
  pdfComponents!: QueryList<PdfUserMonthOrdersComponent>;

  orders: Order[] = [];
  allUsers: User[] = [];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  totalOrders: number = 0;
  uniqueUsers: number = 0;
  userOrderStats: { user: User; orderCount: number }[] = [];
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

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private userService: UserService
  ) {
    const currentYear = new Date().getFullYear();
    for (let year = 2025; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.fetchOrdersPerMonth(this.currentMonth, this.currentYear);

    this.userService.getAll().subscribe((users) => {
      this.allUsers = users;
    });
  }

  onMonthOrYearChange(): void {
    this.fetchOrdersPerMonth(this.currentMonth, this.currentYear);
  }

  fetchOrdersPerMonth(month: number, year: number): void {
    this.orderService.getOrdersPerMonth(month, year).subscribe(
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
        // console.log('User Order Map:', userOrderMap); {4 => 21, 17 => 6}

        this.userOrderStats = Array.from(userOrderMap.entries())
          .map(([userId, orderCount]) => {
            const user = this.allUsers.find((u) => u.id === userId);
            if (user) {
              return { user, orderCount };
            }
            return undefined;
          })
          .filter(
            (entry): entry is { user: User; orderCount: number } =>
              entry !== undefined
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

  getOrdersForUser(userId: number | undefined): any[] {
    if (!userId) {
      return [];
    }
    return this.orders?.filter((order) => order.userId === userId) || [];
  }

  getTotalPriceForUser(userId: number): number {
    return this.orders
      .filter((order) => order.userId === userId)
      .reduce((sum, order) => sum + (order.foodPrice || 0), 0);
  }

  saveAllPDFs() {
    this.pdfComponents.forEach((pdfComp) => pdfComp.exportToPDF());
  }
}
