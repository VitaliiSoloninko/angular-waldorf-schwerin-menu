import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { TextInputComponent } from '../../../ui/text-input/text-input.component';

@Component({
  selector: 'app-forgot-password-form',
  imports: [ReactiveFormsModule, TextInputComponent, RouterLink],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss',
})
export class ForgotPasswordFormComponent implements OnInit {
  @Output() success = new EventEmitter<boolean>();
  forgotForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  message = '';
  errorMessage = '';
  isSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
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
        this.message = 'E-Mail zum Zurücksetzen des Passworts wurde gesendet.';
        this.toastService.success(this.message, 'Erfolg');
        this.isSuccess = true;
        this.success.emit(true);
      },
      error: (err) => {
        this.errorMessage = 'Benutzer mit dieser E-Mail nicht gefunden.';
        this.toastService.error(this.errorMessage, 'Fehler');
        this.isSuccess = false;
        this.success.emit(false);
      },
    });
  }
}
