import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

const LAST_ORDERS_KEY = 'lastOrders';

@Injectable({
  providedIn: 'root',
})
export class LastOrderService {
  private lastOrders: Order[] = [];

  setLastOrders(orders: Order[]): void {
    this.lastOrders = orders;
    localStorage.setItem(LAST_ORDERS_KEY, JSON.stringify(orders));
  }

  getLastOrders(): Order[] {
    if (this.lastOrders.length) return this.lastOrders;
    const fromStorage = localStorage.getItem(LAST_ORDERS_KEY);
    if (fromStorage) {
      this.lastOrders = JSON.parse(fromStorage);
      return this.lastOrders;
    }
    return [];
  }

  clearLastOrders(): void {
    this.lastOrders = [];
    localStorage.removeItem(LAST_ORDERS_KEY);
  }
}
