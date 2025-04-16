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

@Component({
  selector: 'app-user-month-orders',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './user-month-orders.component.html',
  styleUrl: './user-month-orders.component.scss',
})
export class UserMonthOrdersComponent implements OnInit {
  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;
  userData: User | null = null;
  currentMonthYear: string = '';

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

    // Fetch user details
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userData = user;
      console.log('User Data:', this.userData);
    });

    // Set the current month and year
    this.currentMonthYear = DateTime.now().toFormat('MMMM yyyy');

    // Fetch orders for the current month
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

  exportToPDF(): void {
    const doc = new jsPDF();
    const today = DateTime.now().toFormat('d.MM.yyyy');
    const todayISO = DateTime.now().toISODate();

    // Add title
    doc.text(`Bestellungen für ${this.currentMonthYear}`, 14, 10);

    // Add user details
    if (this.userData) {
      doc.text(
        `Bestellungen von: ${this.userData.firstNameChild || '-'} ${
          this.userData.lastNameChild || '-'
        }`,
        14,
        50
      );

      doc.text(`${this.userData.firstName}`, 14, 30);
      doc.text(`${this.userData.lastName}`, 14, 40);

      doc.text(
        `${this.userData.street || '-'} ${this.userData.number || '-'}, ${
          this.userData.postalCode || '-'
        } ${this.userData.city || '-'}`,
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

    // Save the PDF
    doc.save(`${todayISO}_Orders.pdf`);
  }
}
