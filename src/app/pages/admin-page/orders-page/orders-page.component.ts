import { NgFor } from '@angular/common';
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

@Component({
  selector: 'app-orders-page',
  imports: [TitleComponent, NgFor, RouterLink, LucideAngularModule],
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

  ngOnInit(): void {
    const today = DateTime.now().toISODate();
    const tomorrow = DateTime.now().plus({ days: 1 }).toISODate();

    this.orderService.getOrdersByDate(tomorrow).subscribe((orders) => {
      this.orders = orders;

      const userIds = [...new Set(orders.map((order) => order.userId))];

      forkJoin(userIds.map((id) => this.userService.getUserById(id))).subscribe(
        (users) => {
          this.users = users;
          this.sortOrders();
        }
      );
    });
  }

  getUser(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  sortOrders(): void {
    this.orders.sort((a, b) => {
      const userA = this.getUser(a.userId);
      const userB = this.getUser(b.userId);

      // Handle cases where class or letter is missing
      if (!userA?.class && !userB?.class) return 0;
      if (!userA?.class) return -1;
      if (!userB?.class) return 1;

      // Compare class numerically
      const classComparison =
        parseInt(userA.class, 10) - parseInt(userB.class, 10);
      if (classComparison !== 0) return classComparison;

      // Compare letter alphabetically
      if (!userA.letter && !userB.letter) return 0;
      if (!userA.letter) return -1;
      if (!userB.letter) return 1;

      return userA.letter.localeCompare(userB.letter);
    });
  }
}
