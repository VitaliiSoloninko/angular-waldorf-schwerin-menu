import { Component } from '@angular/core';
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
export class HistoryPageComponent {}
