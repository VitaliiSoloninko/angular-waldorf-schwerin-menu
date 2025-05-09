import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { USERS_ORDERS } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  constructor(private http: HttpClient) {}

  getOrdersByUserIdAndCurrentYear(id: number) {
    return this.http.get<Order[]>(
      USERS_ORDERS + `/user-orders/${id}/year/current`
    );
  }

  getOrdersByUserIdAndMonth(id: number, month: number, year: number) {
    return this.http.get<Order[]>(
      USERS_ORDERS + `/user-orders/${id}/month/${month}/year/${year}`
    );
  }

  getOrdersByUserIdAndWeek(id: number, week: number) {
    return this.http.get<Order[]>(
      USERS_ORDERS + `/user-orders/${id}/week/${week}`
    );
  }
}
