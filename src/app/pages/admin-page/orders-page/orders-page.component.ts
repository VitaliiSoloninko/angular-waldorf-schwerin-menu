import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LucideAngularModule } from 'lucide-angular';
import { DateTime } from 'luxon';
import { forkJoin } from 'rxjs';
import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from '../../../ui/title/title.component';
import { OrdersByDaysComponent } from './orders-by-days/orders-by-days.component';

@Component({
  selector: 'app-orders-page',
  imports: [
    TitleComponent,
    LucideAngularModule,
    CommonModule,
    OrdersByDaysComponent,
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  orders: Order[] = [];
  users: User[] = [];
  mergedOrders: { order: Order; user: User }[] = [];
  groupedData: {
    teachers: { order: Order; user: User }[];
    classes: { [key: string]: { order: Order; user: User }[] };
  } = {
    teachers: [],
    classes: {},
  };

  ngOnInit(): void {
    const today = DateTime.now().toISODate();
    const tomorrow = DateTime.now().plus({ days: 1 }).toISODate();

    this.orderService.getOrdersByDate(tomorrow).subscribe((orders) => {
      this.orders = orders;
      // console.log('Orders:', this.orders);

      // Extract unique user IDs from orders
      const userIds = [...new Set(orders.map((order) => order.userId))];
      // console.log('User IDs:', userIds);

      // Fetch user data for each userId
      forkJoin(userIds.map((id) => this.userService.getUserById(id))).subscribe(
        (users) => {
          this.users = users;

          this.mergedOrders = this.orders.map((order) => {
            const user = this.users.find((u) => u.id === order.userId);
            if (!user) {
              throw new Error(`User with ID ${order.userId} not found`);
            }
            return { order, user };
          });

          // Group the data into teachers and classes
          this.groupedData = this.groupOrders(this.mergedOrders);
        }
      );
    });
  }

  groupOrders(mergedOrders: { order: Order; user: User }[]): {
    teachers: { order: Order; user: User }[];
    classes: { [key: string]: { order: Order; user: User }[] };
  } {
    const teachers: { order: Order; user: User }[] = [];
    const classes: { [key: string]: { order: Order; user: User }[] } = {};

    mergedOrders.forEach((merged) => {
      const { user } = merged;

      if (!user.firstNameChild) {
        // If no child's name, add to teachers
        teachers.push(merged);
      } else {
        // Group by class and letter
        const groupKey = `${user.class}${user.letter}`;
        if (!classes[groupKey]) {
          classes[groupKey] = [];
        }
        classes[groupKey].push(merged);
      }
    });
    return { teachers, classes };
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const today = DateTime.now().toFormat('d.MM.yyyy');
    const todayISO = DateTime.now().toISODate();

    console.log(todayISO);

    // Add title
    doc.text(`Bestellung ${today}`, 14, 10);

    // Teachers Table
    if (this.groupedData.teachers.length > 0) {
      autoTable(doc, {
        head: [['First Name', 'Last Name', 'Menu Name']],
        body: this.groupedData.teachers.map((teacher) => [
          teacher.user.firstName,
          teacher.user.lastName,
          teacher.order.foodName,
        ]),
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
      });
    }
    // Class-Based Tables
    Object.keys(this.groupedData.classes).forEach((classKey, index) => {
      const startY = (doc as any).lastAutoTable
        ? (doc as any).lastAutoTable.finalY + 10
        : 20;

      doc.text(`Class ${classKey}`, 14, startY);

      autoTable(doc, {
        head: [['First Name', 'Last Name', 'Menu Name', 'Class', 'Letter']],
        body: this.groupedData.classes[classKey].map((student) => [
          student.user.firstNameChild,
          student.user.lastNameChild,
          student.order.foodName,
          student.user.class,
          student.user.letter,
        ]),
        startY: startY + 5,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
      });
    });

    // Save the PDF
    doc.save(`${todayISO} Bestellung.pdf`);
  }
}
