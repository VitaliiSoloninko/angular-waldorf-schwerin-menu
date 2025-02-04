import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Calendar,
  Lock,
  LucideAngularModule,
  ShoppingCart,
  User,
  Utensils,
  X,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  utensils: any = Utensils;
  shoppingCart: any = ShoppingCart;
  calendar = Calendar;
  user: any = User;
  lock: any = Lock;
  x: any = X;

  isSidebarSmall = input.required<boolean>();
  changeSidebarState = output<boolean>();

  menuItems = [
    {
      routerLink: 'orders',
      icon: 'svg/calendar.svg',
      linkText: 'Bestellungen',
    },
    {
      routerLink: 'users',
      icon: 'svg/user.svg',
      linkText: 'Kunden',
    },
    {
      routerLink: 'foods',
      icon: 'svg/utensils.svg',
      linkText: 'Menu',
    },
    {
      routerLink: 'create',
      icon: 'svg/square-plus.svg',
      linkText: 'Neu Essen',
    },
    {
      routerLink: 'settings',
      icon: 'svg/settings.svg',
      linkText: 'Einstellungen',
    },
  ];

  toggleSidebarLogo(): void {
    this.changeSidebarState.emit(!this.isSidebarSmall());
  }

  closeSidebar(): void {
    this.changeSidebarState.emit(true);
  }
}
