import { Component } from '@angular/core';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { RouterLink } from '@angular/router';
import { ResetPasswordFormComponent } from '../reset-password-page/reset-password-form/reset-password-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    BgLogoComponent,
    RouterLink,
    ResetPasswordFormComponent,
    ForgotPasswordFormComponent,
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {}
