import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  NgFor,
  NgIf,
} from '@angular/common';
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
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { NotificationComponent } from '../../ui/notification/notification.component';
import { TitleComponent } from '../../ui/title/title.component';

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
    TitleComponent,
    CommonModule,
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
    this.cartService.removeFromCart(cartItem.order);
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
      foodId: item.order.foodId,
      foodName: item.order.foodName,
      foodPrice: Number(item.order.foodPrice),
      date: String(
        DateTime.fromFormat(item.order.date, 'dd.MM.yyyy').toISODate()
      ),
      day: item.order.day,
      dayName: item.order.dayName,
      week: item.order.week,
      month: item.order.month,
      year: item.order.year,
      ordered: item.order.checked,
    }));

    console.log({ orderItems });

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
