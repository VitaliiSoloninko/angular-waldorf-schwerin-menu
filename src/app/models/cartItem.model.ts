import { Order } from './order.model';

export class CartItem {
  quantity: number = 1;
  price: number = 0;

  constructor(public order: Order) {
    this.price = order.foodPrice;
  }
}
