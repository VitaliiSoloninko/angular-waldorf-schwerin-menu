import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { MonthSwitcherComponent } from '../../ui/month-switcher/month-switcher.component';
import { TitleComponent } from '../../ui/title/title.component';
import { OrderTableComponent } from './order-table/order-table.component';

@Component({
  selector: 'app-history-page',
  imports: [
    OrderTableComponent,
    BgLogoComponent,
    TitleComponent,
    MonthSwitcherComponent,
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
})
export class HistoryPageComponent {
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;

  onMonthChanged(event: { month: number; year: number }): void {
    this.currentMonth = event.month;
    this.currentYear = event.year;
  }
}
