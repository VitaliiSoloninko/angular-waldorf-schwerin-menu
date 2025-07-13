import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-reset-password-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.scss',
})
export class ResetPasswordFormComponent implements OnInit {
  resetForm!: FormGroup;
  token = '';
  isSubmitted = false;
  successMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.token = this.activatedRoute.snapshot.queryParams['token'] || '';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.resetForm.invalid || !this.token) return;

    this.authService
      .resetPassword({
        token: this.token,
        newPassword: this.resetForm.value.newPassword,
      })
      .subscribe(() => {
        this.successMessage = 'Пароль успешно изменён!';
      });
  }
}
