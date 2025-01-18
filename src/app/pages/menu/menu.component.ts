import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemsComponent } from '../../ui/items/items.component';

@Component({
  selector: 'app-menu',
  imports: [ItemsComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {}
