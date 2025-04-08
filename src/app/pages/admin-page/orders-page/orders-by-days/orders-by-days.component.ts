import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { Order } from '../../../../models/order.model';
import { OrderService } from '../../../../services/order.service';
import { TitleComponent } from '../../../../ui/title/title.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders-by-days',
  imports: [TitleComponent],
  templateUrl: './orders-by-days.component.html',
  styleUrl: './orders-by-days.component.scss',
})
export class OrdersByDaysComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const today = DateTime.now().toISODate();
    const tomorrow = DateTime.now().plus({ days: 1 }).toISODate();

    // Fetch orders for both today and tomorrow
    forkJoin([
      this.orderService.getOrdersByDate(today),
      this.orderService.getOrdersByDate(tomorrow),
    ]).subscribe(([todayOrders, tomorrowOrders]) => {
      this.orders = [...todayOrders, ...tomorrowOrders]; // Combine orders
    });
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
