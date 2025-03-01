import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BurgerComponent } from './burger/burger.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgFor, BurgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  openMenu = false;

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
}
