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
import { TextInputComponent } from '../../../ui/text-input/text-input.component';

@Component({
  selector: 'app-forgot-password-form',
  imports: [ReactiveFormsModule, TextInputComponent, NgIf],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss',
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  message = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.forgotForm.invalid) return;
    this.authService.forgotPassword({ email: this.fc.email.value }).subscribe({
      next: () => {
        this.message =
          'Eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts wurde an Ihre E-Mail-Adresse gesendet.';
      },
      error: (err) => {
        this.errorMessage = 'Benutzer mit dieser E-Mail nicht gefunden.';
      },
    });
  }
}
