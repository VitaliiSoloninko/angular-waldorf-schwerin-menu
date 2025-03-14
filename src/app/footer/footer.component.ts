import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Calendar,
  LucideAngularModule,
  ShoppingCart,
  User,
  Utensils,
} from 'lucide-angular';
import { CartService } from '../services/cart.service';
import { SvgIconComponent } from '../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterLink, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  utensils: any = Utensils;
  shoppingCart: any = ShoppingCart;
  calendar = Calendar;
  user: any = User;
  totalCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.totalCount = cart.totalCount;
    });
  }
}
