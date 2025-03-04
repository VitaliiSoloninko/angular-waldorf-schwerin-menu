import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  totalCount: number = 0;
  openMenu = false;
  user: User;

  menuItems = [
    {
      name: 'Spreiseplan',
      link: 'menu',
    },
    {
      name: 'Warenkorb',
      link: 'cart-page',
    },
    {
      name: 'History',
      link: 'history',
    },
    {
      name: 'Admin',
      link: 'admin',
    },
  ];

  constructor(
    private loginService: LoginService,
    private cartService: CartService
  ) {
    loginService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      console.log(newUser);
    });
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.totalCount = cart.totalCount;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
