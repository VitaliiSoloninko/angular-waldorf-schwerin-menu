import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, MonthSwitcherComponent, OrderTableComponent],
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

  // Calculate the first day of the next month

  exportToPDF(): void {
    const leftMargin = 25; // 3 cm in points
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    if (this.user) {
      doc.setFontSize(16);
      doc.text('Waldorf-menu', leftMargin, 15);
      doc.setFontSize(10);
      doc.text('Max-Suhrbier-Straße 61, 19059, Schwerin', leftMargin, 22);

      doc.text(`Rechnung Nr.: ${this.currentMonthYear}`, 150, 15);
      doc.text(
        `Datum: 01.${this.currentMonth + 1}.${this.currentYear}`,
        150,
        22
      );

      doc.text(`${this.user.firstName} ${this.user.lastName}`, leftMargin, 35);
      doc.text(
        `${this.user.street || '-'} ${this.user.number || '-'}`,
        leftMargin,
        40
      );
      doc.text(
        `${this.user.postalCode || '-'} ${this.user.city || '-'}`,
        leftMargin,
        45
      );

      doc.text('Kind:', leftMargin, 55);
      doc.text(
        `${this.user.firstNameChild} ${this.user.lastNameChild}`,
        leftMargin,
        60
      );

      if (this.orders.length > 0) {
        autoTable(doc, {
          startY: 70,
          margin: { left: leftMargin },
          head: [['Datum', 'Wochentag', 'Menu', 'Preis']],
          body: this.orders.map((order) => [
            order.date,
            order.dayName,
            order.foodName,
            `${order.foodPrice.toFixed(2)} €`,
          ]),
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185] },
        });

        // Total price
        const finalY = (doc as any).lastAutoTable.finalY;

        doc.text(
          `Gesamtbetrag ${this.currentMonthYear}: ${this.totalPrice.toFixed(
            2
          )} €`,
          leftMargin,
          finalY + 10
        );

        doc.text(
          `Die Auszahlung erfolgt bis zum 3 Tag dieses Monats automaticsh,`,
          leftMargin,
          finalY + 20
        );
        doc.text(
          `andereseits überweisen Sie bitte den Betrag auf folgendes Konto:`,
          leftMargin,
          finalY + 25
        );
        doc.text('IBAN: DE00 0000 0000 0000 0000 00', leftMargin, finalY + 35);
        doc.text('BIC: GENODEF1S01', leftMargin, finalY + 40);
      }

      // Save the PDF
      const month = `${this.currentMonth.toString().padStart(2, '0')}.${
        this.currentYear
      }`;
      const userName = `${this.user?.lastName}_${this.user?.firstName}`;
      const fileName = `Rechnung_Waldorf-menu_${month}_${userName}.pdf`;
      doc.save(fileName);
    }
  }
}
