import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateFoodPageComponent } from './pages/admin-page/create-food-page/create-food-page.component';
import { EditFoodPageComponent } from './pages/admin-page/edit-food-page/edit-food-page.component';
import { FoodsPageComponent } from './pages/admin-page/foods-page/foods-page.component';
import { MonthBillsComponent } from './pages/admin-page/month-bills/month-bills.component';
import { OrdersPageComponent } from './pages/admin-page/orders-page/orders-page.component';
import { SettingsPageComponent } from './pages/admin-page/settings-page/settings-page.component';
import { StatisticsPageComponent } from './pages/admin-page/statistics-page/statistics-page.component';
import { UserMonthOrdersComponent } from './pages/admin-page/user-month-orders/user-month-orders.component';
import { UsersPageComponent } from './pages/admin-page/users-page/users-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileTeacherPageComponent } from './pages/profile-teacher-page/profile-teacher-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationTeacherPageComponent } from './pages/registration-teacher-page/registration-teacher-page.component';

export const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'menu', component: MenuPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'history', component: HistoryPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'registration-teacher', component: RegistrationTeacherPageComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'profile-teacher/:id', component: ProfileTeacherPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      { path: 'orders', component: OrdersPageComponent },
      { path: 'month-bills', component: MonthBillsComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'foods', component: FoodsPageComponent },
      { path: 'food/:id', component: EditFoodPageComponent },
      { path: 'create', component: CreateFoodPageComponent },
      { path: 'statistics', component: StatisticsPageComponent },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'user/:userId',
        component: UserMonthOrdersComponent,
      },
    ],
  },
];
