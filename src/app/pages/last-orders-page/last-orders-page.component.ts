import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../../models/order.model';
import { LastOrderService } from '../../services/last-order.service';
import { TitleComponent } from '../../ui/title/title.component';

@Component({
  selector: 'app-last-orders-page',
  imports: [NgFor, NgIf, NgClass, RouterLink, CommonModule, TitleComponent],
  templateUrl: './last-orders-page.component.html',
  styleUrl: './last-orders-page.component.scss',
})
export class LastOrdersPageComponent implements OnInit {
  lastOrders: Order[] = [];

  constructor(private lastOrderService: LastOrderService) {}

  ngOnInit() {
    this.lastOrders = this.lastOrderService.getLastOrders();
  }
}
