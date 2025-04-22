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
    const pageWidth = doc.internal.pageSize.getWidth();

    if (this.user) {
      // Title
      const title = `Bestellung für ${this.user.firstNameChild || '-'} ${
        this.user.lastNameChild || '-'
      } für ${this.currentMonthYear}`;

      const textWidth = doc.getTextWidth(title);
      const xPosition = (pageWidth - textWidth) / 2;

      doc.text(title, xPosition, 30);

      // Address
      doc.setFontSize(10);
      doc.text(`${this.user.firstName} ${this.user.lastName}`, 16, 50);
      doc.text(`${this.user.street || '-'} ${this.user.number || '-'}`, 16, 55);
      doc.text(
        `${this.user.postalCode || '-'} ${this.user.city || '-'}`,
        16,
        60
      );
    }
    // Table
    if (this.orders.length > 0) {
      autoTable(doc, {
        head: [['Datum', 'Wochentag', 'Menu', 'Preis']],
        body: this.orders.map((order) => [
          order.date,
          order.dayName,
          order.foodName,
          `${order.foodPrice.toFixed(2)} €`,
        ]),
        startY: 80,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
      });

      // Add total price
      const finalY = (doc as any).lastAutoTable.finalY || 80;

      const price = `Bestellungen für ${
        this.currentMonthYear
      }: ${this.totalPrice.toFixed(2)} €`;

      const textWidth = doc.getTextWidth(price);
      const xPosition = (pageWidth - textWidth) / 2;

      doc.text(price, xPosition, finalY + 10);
    } else {
      doc.text('No orders found for this month.', 16, 80);
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
