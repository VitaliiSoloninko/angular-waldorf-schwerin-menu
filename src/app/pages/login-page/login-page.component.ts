import { Component } from '@angular/core';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../../ui/title/title.component';

@Component({
  selector: 'app-login-page',
  imports: [BgLogoComponent, LoginFormComponent, RouterLink, TitleComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
