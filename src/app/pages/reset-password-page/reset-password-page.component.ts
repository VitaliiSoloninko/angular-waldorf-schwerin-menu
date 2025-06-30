import { Component, OnInit } from '@angular/core';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { LoginFormComponent } from '../login-page/login-form/login-form.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';

@Component({
  selector: 'app-reset-password-page',
  imports: [
    BgLogoComponent,
    LoginFormComponent,
    RouterLink,
    ResetPasswordFormComponent,
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent {}
