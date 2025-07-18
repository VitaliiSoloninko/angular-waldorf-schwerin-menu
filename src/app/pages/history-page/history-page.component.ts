import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactRound, LucideAngularModule } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Order } from '../../models/order.model';
import { LoginService } from '../../services/login.service';
import { UserOrderService } from '../../services/user-order.service';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { MonthSwitcherComponent } from '../../ui/month-switcher/month-switcher.component';
import { TitleComponent } from '../../ui/title/title.component';
import { UserMonthOrdersTableComponent } from '../../widgets/user-month-orders-table/user-month-orders-table.component';

@Component({
  selector: 'app-history-page',
  imports: [
    BgLogoComponent,
    TitleComponent,
    MonthSwitcherComponent,
    UserMonthOrdersTableComponent,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
})
export class HistoryPageComponent {
  contactRound: any = ContactRound;

  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;

  orders: Order[] = [];
  totalPrice: number = 0;
  userId: number = 0;

  constructor(
    private loginService: LoginService,
    private userOrderService: UserOrderService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId() ?? 0;
    if (this.userId === null) {
      return;
    }
    this.fetchOrders();
  }

  onMonthChanged(event: { month: number; year: number }): void {
    this.currentMonth = event.month;
    this.currentYear = event.year;
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

  getCurrentMonthName(): string {
    return DateTime.fromObject({
      month: this.currentMonth,
      year: this.currentYear,
    })
      .setLocale('de')
      .toFormat('LLLL');
  }
}
