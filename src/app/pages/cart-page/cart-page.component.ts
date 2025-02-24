import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cartItem.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [NgFor, LucideAngularModule, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  trash2: any = Trash2;
  cart!: Cart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cart = newCart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food);
  }
}
