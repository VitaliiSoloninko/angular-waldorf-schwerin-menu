import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';

@Component({
  selector: 'app-reset-password-page',
  imports: [BgLogoComponent, RouterLink, ResetPasswordFormComponent],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent {}
