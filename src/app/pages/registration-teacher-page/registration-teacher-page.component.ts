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
  selector: 'app-registration-teacher-page',
  imports: [ReactiveFormsModule, RouterLink, SvgIconComponent],
  templateUrl: './registration-teacher-page.component.html',
  styleUrl: './registration-teacher-page.component.scss',
})
export class RegistrationTeacherPageComponent {
  constructor(private router: Router, private userService: UserService) {}

  isPasswordVisible = signal<boolean>(false);
  emailExists = false;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
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
    firstNameChild: new FormControl('', {}),
    lastNameChild: new FormControl('', {}),
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
    class: new FormControl('', {}),
    letter: new FormControl('', {}),
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
