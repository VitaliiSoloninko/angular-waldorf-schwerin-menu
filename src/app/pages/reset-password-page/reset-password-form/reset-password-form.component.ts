import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.scss',
})
export class ResetPasswordFormComponent implements OnInit {
  @Output() success = new EventEmitter<boolean>();
  resetForm!: FormGroup;
  token = '';
  isSubmitted = false;
  successMessage: string;
  isSuccess = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService
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
      .subscribe({
        next: () => {
          this.successMessage = 'Passwort erfolgreich geändert!';
          this.toastService.success(this.successMessage, 'Erfolg');
          this.isSuccess = true;
          this.success.emit(true);
        },
        error: () => {
          this.errorMessage = 'Fehler beim Ändern des Passworts!';
          this.toastService.error(this.errorMessage, 'Fehler');
          this.isSuccess = false;
          this.success.emit(false);
        },
      });
  }
}
