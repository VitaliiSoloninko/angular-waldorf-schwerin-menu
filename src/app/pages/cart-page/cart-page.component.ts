import { CurrencyPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cartItem.model';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [NgFor, LucideAngularModule, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  today: Signal<DateTime> = signal(
    DateTime.local({
      zone: 'Europe/Berlin',
      locale: 'de',
    })
  );
  firstDayOfActiveWeek: WritableSignal<DateTime> = signal(
    this.today().startOf('week')
  );

  trash2: any = Trash2;
  cart!: Cart;
  userId: string | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cart = newCart;
    });

    // Extract user ID from the token
    const token = this.authService.getToken(); // Assuming getToken() returns the token
    console.log('Token:', token); // Debugging statement to verify the token
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Debugging statement to verify the decoded token
      this.userId = decodedToken?.userId || null;
      console.log('User ID:', this.userId); // Debugging statement to verify the extracted user ID
    }
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  placeOrder(): void {
    const orderItems = this.cart.items.map((item) => ({
      foodId: item.food.id,
      name: item.food.name,
      price: Number(item.food.price),
      date: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy'),
      userId: this.userId,
      day: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').day,
      month: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').month,
      year: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').year,
    }));

    const order = {
      items: orderItems,
    };

    console.log(order); // Debugging statement to verify the order

    // Send the order to the server
    this.http.post('/api/orders', order).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.clearCart(); // Clear the cart after placing the order
      },
      (error) => {
        console.error('Failed to place order:', error);
      }
    );
  }

  // Helper method to decode the token
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Failed to decode token:', e); // Debugging statement to verify decoding errors
      return null;
    }
  }
}
