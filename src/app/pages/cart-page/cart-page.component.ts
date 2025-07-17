import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ShoppingBasket, Trash2 } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cartItem.model';
import { CartService } from '../../services/cart.service';
import { LastOrderService } from '../../services/last-order.service';
import { LoginService } from '../../services/login.service';
import { ModalService } from '../../services/modal.service';
import { OrderService } from '../../services/order.service';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { TitleComponent } from '../../ui/title/title.component';

@Component({
  selector: 'app-cart-page',
  imports: [
    LucideAngularModule,
    CurrencyPipe,
    BgLogoComponent,
    TitleComponent,
    RouterLink,
    NgClass,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  trash2: any = Trash2;
  shoppingBasket: any = ShoppingBasket;

  cart!: Cart;
  userId: number | null = null;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private orderService: OrderService,
    public modalService: ModalService,
    private router: Router,
    private lastOrderService: LastOrderService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cart = newCart;
      this.removeExpiredOrders();
    });
    this.userId = this.loginService.getUserId();
  }

  removeExpiredOrders(): void {
    const now = DateTime.now();
    const today = now.startOf('day');
    const eightAM = today.plus({ hours: 8 });

    this.cart.items = this.cart.items.filter((item) => {
      const orderDate = DateTime.fromFormat(item.order.date, 'dd.MM.yyyy');
      const isBeforeToday = orderDate < today;
      const isTodayAndAfterEightAM = orderDate.equals(today) && now >= eightAM;

      if (isBeforeToday || isTodayAndAfterEightAM) {
        return false;
      }

      return true;
    });
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

    this.orderService.createOrders(orderItems).subscribe(
      (response: any) => {
        this.lastOrderService.setLastOrders(response);
        this.clearCart();
        this.router.navigate(['/last-orders']);
      },
      (error) => {
        console.error('Failed to place order:', error);
        this.modalService.open();
        setTimeout(() => {
          this.router.navigate(['/last-orders']);
        }, 2000);
      }
    );
  }
}
