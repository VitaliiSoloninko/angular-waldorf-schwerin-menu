import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder } from '../models/create-order.model';
import { Order } from '../models/order.model';
import { USERS_ORDERS } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  createOrders(orders: CreateOrder[]) {
    return this.httpClient.post(USERS_ORDERS, orders);
  }

  getAllOrders() {
    return this.httpClient.get<Order[]>(USERS_ORDERS);
  }

  getOrdersByMonth(month: number, year: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(
      USERS_ORDERS + `/filter-by-month?month=${month}&year=${year}`
    );
  }

  getOrdersByUserId(id: number) {
    return this.httpClient.get<Order[]>(USERS_ORDERS + `/user/${id}`);
  }

  getOrdersByDate(date: string) {
    return this.httpClient.get<Order[]>(USERS_ORDERS + `/date/${date}`);
  }

  removeOrder(id: number) {
    return this.httpClient.delete<Order>(USERS_ORDERS + `/${id}`);
  }
}
