import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { BurgerComponent } from './burger/burger.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgFor, BurgerComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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

  constructor(private authService: AuthService) {
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      console.log(newUser);
    });
  }

  logout() {
    this.authService.logout();
  }
}
