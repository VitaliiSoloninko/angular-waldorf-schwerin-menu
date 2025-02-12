import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateFoodPageComponent } from './pages/admin-page/create-food-page/create-food-page.component';
import { FoodsPageComponent } from './pages/admin-page/foods-page/foods-page.component';
import { OrdersPageComponent } from './pages/admin-page/orders-page/orders-page.component';
import { SettingsPageComponent } from './pages/admin-page/settings-page/settings-page.component';
import { UsersPageComponent } from './pages/admin-page/users-page/users-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HistoryComponent } from './pages/history/history.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

export const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'menu', component: MenuPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      { path: 'orders', component: OrdersPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'foods', component: FoodsPageComponent },
      { path: 'create', component: CreateFoodPageComponent },
      { path: 'settings', component: SettingsPageComponent },
    ],
  },
];
