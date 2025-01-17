import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Calendar,
  LucideAngularModule,
  ShoppingCart,
  User,
  Utensils,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  utensils: any = Utensils;
  shoppingCart: any = ShoppingCart;
  calendar = Calendar;
  user: any = User;
}
