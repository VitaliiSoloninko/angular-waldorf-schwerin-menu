import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HistoryComponent } from './pages/history/history.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginPageComponent },
];
