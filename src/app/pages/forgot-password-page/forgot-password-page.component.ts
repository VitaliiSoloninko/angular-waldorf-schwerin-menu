import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { TitleComponent } from '../../ui/title/title.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    BgLogoComponent,
    RouterLink,
    ForgotPasswordFormComponent,
    TitleComponent,
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {}
