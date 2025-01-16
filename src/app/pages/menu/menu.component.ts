import { Component } from '@angular/core';
import { ItemsComponent } from '../../ui/items/items.component';

@Component({
  selector: 'app-menu',
  imports: [ItemsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {}
