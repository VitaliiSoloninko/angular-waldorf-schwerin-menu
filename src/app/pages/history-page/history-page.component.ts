import { Component } from '@angular/core';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { TitleComponent } from '../../ui/title/title.component';

@Component({
  selector: 'app-history-page',
  imports: [OrderTableComponent, BgLogoComponent, TitleComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
})
export class HistoryPageComponent {}
