import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateFoodPageComponent } from './pages/admin-page/create-food-page/create-food-page.component';
import { EditFoodPageComponent } from './pages/admin-page/edit-food-page/edit-food-page.component';
import { FoodsPageComponent } from './pages/admin-page/foods-page/foods-page.component';
import { OrdersPageComponent } from './pages/admin-page/orders-page/orders-page.component';
import { OrdersPerMonthPageComponent } from './pages/admin-page/orders-per-month-page/orders-per-month-page.component';
import { StatisticsPageComponent } from './pages/admin-page/statistics-page/statistics-page.component';
import { UserMonthOrdersComponent } from './pages/admin-page/user-month-orders/user-month-orders.component';
import { UserSearchPageComponent } from './pages/admin-page/user-search-page/user-search-page.component';
import { UsersPageComponent } from './pages/admin-page/users-page/users-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileTeacherPageComponent } from './pages/profile-teacher-page/profile-teacher-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

import { adminGuard } from './guards/admin.guard';
import { AboutProjectComponent } from './pages/about-project/about-project.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { StyleGuideComponent } from './pages/style-guide/style-guide.component';

export const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'menu', component: MenuPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'history', component: HistoryPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'profile-teacher/:id', component: ProfileTeacherPageComponent },
  { path: 'style-guide', component: StyleGuideComponent },
  { path: 'about-project', component: AboutProjectComponent },

  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'orders' },
      { path: 'orders', component: OrdersPageComponent },
      { path: 'orders-per-month', component: OrdersPerMonthPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'users-search', component: UserSearchPageComponent },
      { path: 'foods', component: FoodsPageComponent },
      { path: 'food/:id', component: EditFoodPageComponent },
      { path: 'create', component: CreateFoodPageComponent },
      { path: 'statistics', component: StatisticsPageComponent },
      {
        path: 'user/:userId',
        component: UserMonthOrdersComponent,
      },
    ],
  },
];
