import { Component } from '@angular/core';

@Component({
  selector: 'app-burger',
  imports: [],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss',
})
export class BurgerComponent {
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
