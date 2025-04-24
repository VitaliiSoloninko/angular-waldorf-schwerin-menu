import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-month-bills',
  imports: [CommonModule, FormsModule],
  templateUrl: './month-bills.component.html',
  styleUrl: './month-bills.component.scss',
})
export class MonthBillsComponent {
  bills: any[] = []; // Store the fetched data
  currentMonth: number = new Date().getMonth() + 1; // Current month (1-based)
  currentYear: number = new Date().getFullYear(); // Current year
  totalOrders: number = 0;
  uniqueUsers: number = 0;

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

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    for (let year = 2025; year <= currentYear + 5; year++) {
      this.years.push(year);
    }
  }

  fetchBills(month: number, year: number): void {
    const apiUrl = `https://nestjs-postgresql-waldorf-menu-production.up.railway.app/api/orders/filter-by-month?month=${month}&year=${year}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.bills = data;
        this.calculateStatistics();
        console.log('Fetched bills:', this.bills);
      },
      (error) => {
        console.error('Error fetching bills:', error);
      }
    );
  }

  calculateStatistics(): void {
    this.totalOrders = this.bills.length; // Total number of orders
    const userIds = this.bills.map((bill) => bill.userId); // Extract user IDs
    this.uniqueUsers = new Set(userIds).size; // Count unique user IDs
  }

  onMonthOrYearChange(): void {
    this.fetchBills(this.currentMonth, this.currentYear);
  }

  ngOnInit(): void {
    // Fetch bills for the current month and year on component initialization
    this.fetchBills(this.currentMonth, this.currentYear);
  }
}
