import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DateTime } from 'luxon';
import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';
import { UserOrderService } from '../../../services/user-order.service';
import { UserService } from '../../../services/user.service';
import { MonthSwitcherComponent } from '../../../ui/month-switcher/month-switcher.component';
import { OrderTableComponent } from '../../history-page/order-table/order-table.component';

@Component({
  selector: 'app-user-month-orders',
  imports: [
    CurrencyPipe,
    CommonModule,
    MonthSwitcherComponent,
    OrderTableComponent,
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

  exportToPDF(): void {
    const doc = new jsPDF();

    // Add title
    doc.text(`Bestellungen für ${this.currentMonthYear}`, 14, 10);

    // Add user details
    if (this.user) {
      doc.text(
        `Bestellungen von: ${this.user.firstNameChild || '-'} ${
          this.user.lastNameChild || '-'
        }`,
        14,
        50
      );

      doc.text(`${this.user.firstName}`, 14, 30);
      doc.text(`${this.user.lastName}`, 14, 40);

      doc.text(
        `${this.user.street || '-'} ${this.user.number || '-'}, ${
          this.user.postalCode || '-'
        } ${this.user.city || '-'}`,
        14,
        70
      );
    }
    // Add orders table
    if (this.orders.length > 0) {
      autoTable(doc, {
        head: [['Datum', 'Menu', 'Menu']],
        body: this.orders.map((order) => [
          order.date,
          order.foodName,
          `${order.foodPrice.toFixed(2)} €`,
        ]),
        startY: 80,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
      });

      // Add total price
      const finalY = (doc as any).lastAutoTable.finalY || 80;
      doc.text(
        `Bestellungen: ${this.totalPrice.toFixed(2)} €`,
        14,
        finalY + 10
      );
    } else {
      doc.text('No orders found for this month.', 14, 80);
    }

    //
    // Save the PDF
    const month = `${this.currentMonth.toString().padStart(2, '0')}.${
      this.currentYear
    }`;
    const userName = `${this.user?.lastName}_${this.user?.firstName}`;
    const fileName = `${month}_${userName}_Waldorf-menu_Rechnung.pdf`;
    doc.save(fileName);
  }
}
