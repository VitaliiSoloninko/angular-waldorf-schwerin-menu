import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  x: any = X;

  isSidebarSmall = input.required<boolean>();
  changeSidebarState = output<boolean>();

  menuItems = [
    {
      routerLink: 'orders',
      icon: 'assets/svg/calendar.svg',
      linkText: 'Bestellungen',
    },
    {
      routerLink: 'orders-per-month',
      icon: 'assets/svg/banknote-arrow-up.svg',
      linkText: 'Rechnungen',
    },
    {
      routerLink: 'users',
      icon: 'assets/svg/users.svg',
      linkText: 'Kunden',
    },
    {
      routerLink: 'foods',
      icon: 'assets/svg/food.svg',
      linkText: 'Menu',
    },
    {
      routerLink: 'statistics',
      icon: 'assets/svg/statistic.svg',
      linkText: 'Statistiken',
    },
    // {
    //   routerLink: 'settings',
    //   icon: 'svg/settings.svg',
    //   linkText: 'Einstellungen',
    // },
  ];

  toggleSidebarLogo(): void {
    this.changeSidebarState.emit(!this.isSidebarSmall());
  }

  closeSidebar(): void {
    this.changeSidebarState.emit(true);
  }
}
