import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cartItem.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  addToCart(order: Order): void {
    let cartItem = this.cart.items.find(
      (item) => item.order.date === order.date
    );
    if (cartItem) return;

    this.cart.items.push(new CartItem(order));
    this.setCartToLocalStorage();
  }

  removeFromCart(order: Order): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.order.date !== order.date
    );

    this.setCartToLocalStorage();
  }

  changeQuantity(orderId: Order, quantity: number): void {
    let cartItem = this.cart.items.find((item) => item.order.id === orderId.id);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = cartItem.order.foodPrice * quantity;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (acc, item) => acc + Number(item.price),
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
