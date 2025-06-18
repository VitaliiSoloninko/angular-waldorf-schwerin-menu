import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, RouterLink, SvgIconComponent, CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  constructor(private router: Router, private userService: UserService) {}
  isPasswordVisible = signal<boolean>(false);
  emailExists = false;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    firstNameChild: new FormControl('', {
      validators: [Validators.required],
    }),
    lastNameChild: new FormControl('', {
      validators: [Validators.required],
    }),
    street: new FormControl('', {
      validators: [Validators.required],
    }),
    number: new FormControl('', {
      validators: [Validators.required],
    }),
    postalCode: new FormControl('', {
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      validators: [Validators.required],
    }),
    school: new FormControl<'Waldorf'>('Waldorf', {
      validators: [Validators.required],
    }),
    class: new FormControl<'1' | '2' | '3' | '4'>('1', {
      validators: [Validators.required],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  createNewUser() {
    this.emailExists = false;

    if (this.form.invalid) {
      return;
    }
    //@ts-ignore
    this.userService.createUser(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message?.includes('email')) {
          this.emailExists = true;
        }
      },
    });
  }

  onReset() {
    this.form.reset();
  }
}
