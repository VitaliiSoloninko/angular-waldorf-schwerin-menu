import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    RouterLink,
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
        }
      );
    });
  }

  // sortOrders(): void {
  //   this.orders.sort((a, b) => {
  //     const userA = this.getUser(a.userId);
  //     const userB = this.getUser(b.userId);

  //     // Handle cases where class or letter is missing
  //     if (!userA?.class && !userB?.class) return 0;
  //     if (!userA?.class) return -1;
  //     if (!userB?.class) return 1;

  //     // Compare class numerically
  //     const classComparison =
  //       parseInt(userA.class, 10) - parseInt(userB.class, 10);
  //     if (classComparison !== 0) return classComparison;

  //     // Compare letter alphabetically
  //     if (!userA.letter && !userB.letter) return 0;
  //     if (!userA.letter) return -1;
  //     if (!userB.letter) return 1;

  //     return userA.letter.localeCompare(userB.letter);
  //   });
  // }
}
