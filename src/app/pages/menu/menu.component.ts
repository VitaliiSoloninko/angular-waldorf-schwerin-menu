import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {}
