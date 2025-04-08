import { CommonModule, NgFor } from '@angular/common';
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
  imports: [
    TitleComponent,
    NgFor,
    RouterLink,
    LucideAngularModule,
    CommonModule,
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

  ngOnInit(): void {
    const today = DateTime.now().toISODate();
    const tomorrow = DateTime.now().plus({ days: 1 }).toISODate();

    this.orderService.getOrdersByDate(tomorrow).subscribe((orders) => {
      this.orders = orders;

      const userIds = [...new Set(orders.map((order) => order.userId))];

      forkJoin(userIds.map((id) => this.userService.getUserById(id))).subscribe(
        (users) => {
          this.users = users;
        }
      );
    });
  }

  getUser(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  getGroupedOrders(): { [key: string]: Order[] } {
    const groupedOrders: { [key: string]: Order[] } = {
      Teachers: [], // Separate group for teachers
    };

    this.orders.forEach((order) => {
      const user = this.getUser(order.userId);

      if (!user?.firstNameChild || !user?.lastNameChild) {
        // If no child's name, add to the "Teachers" group
        groupedOrders.Teachers.push(order);
      } else {
        // Otherwise, group by class and letter
        const groupKey =
          user?.class && user?.letter
            ? `${user.class}${user.letter}`
            : 'No Class';

        if (!groupedOrders[groupKey]) {
          groupedOrders[groupKey] = [];
        }

        groupedOrders[groupKey].push(order);
      }
    });

    return groupedOrders;
  }

  getOrderCounts(): { today: number; tomorrow: number } {
    const today = DateTime.now().toISODate();
    const tomorrow = DateTime.now().plus({ days: 1 }).toISODate();

    const todayCount = this.orders.filter(
      (order) => order.date === today
    ).length;
    const tomorrowCount = this.orders.filter(
      (order) => order.date === tomorrow
    ).length;

    return {
      today: todayCount,
      tomorrow: tomorrowCount,
    };
  }
}
