import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }
    return { passwordNotEqual: true };
  };
}

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, RouterLink, BgLogoComponent, SvgIconComponent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  constructor(private router: Router, private userService: UserService) {}

  isPasswordVisible = signal<boolean>(false);

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
    letter: new FormControl<'A' | 'B' | 'C'>('A', {
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
    if (this.form.invalid) {
      console.log('INVALID FORM');
    }
    console.log(this.form.value);
    //@ts-ignore
    this.userService.createUser(this.form.value).subscribe({
      next: (val) => {
        this.router.navigate(['/login']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  onReset() {
    this.form.reset();
  }
}
