import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cartItem.model';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';
import { ModalService } from '../../services/modal.service';
import { OrderService } from '../../services/order.service';
import { ModalComponent } from '../../ui/modal/modal.component';
import { NotificationComponent } from '../../ui/notification/notification.component';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';

@Component({
  selector: 'app-cart-page',
  imports: [
    NgIf,
    NgFor,
    LucideAngularModule,
    CurrencyPipe,
    ModalComponent,
    AsyncPipe,
    NotificationComponent,
    BgLogoComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  trash2: any = Trash2;
  cart!: Cart;
  userId: number | null = null;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private orderService: OrderService,
    public modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cart = newCart;
    });
    this.userId = this.loginService.getUserId();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  placeOrder(): void {
    if (this.userId === null || this.userId === 0) {
      this.router.navigate(['/login']);
      return;
    }

    const orderItems = this.cart.items.map((item) => ({
      userId: this.userId ?? 0,
      foodId: item.food.id,
      name: item.food.name,
      price: Number(item.food.price),
      date: String(DateTime.fromFormat(item.food.date, 'dd.MM.yyyy')),
      day: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').day,
      week: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').weekNumber,
      month: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').month,
      year: DateTime.fromFormat(item.food.date, 'dd.MM.yyyy').year,
      ordered: item.food.checked,
    }));

    console.log(JSON.stringify(orderItems));

    this.orderService.createOrders(orderItems).subscribe(
      (response) => {
        this.clearCart();
        this.modalService.open();
      },
      (error) => {
        console.error('Failed to place order:', error);
        this.modalService.open();
      }
    );
  }
}
