import { Component } from '@angular/core';
import { OrderTableComponent } from './order-table/order-table.component';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';

@Component({
  selector: 'app-history',
  imports: [OrderTableComponent, BgLogoComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {}
