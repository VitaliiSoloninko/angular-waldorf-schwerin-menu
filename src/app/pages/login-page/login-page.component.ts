import { Component } from '@angular/core';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [BgLogoComponent, LoginFormComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
