import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),

    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [equalValues('password', 'confirmPassword')] }
    ),
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

    address: new FormGroup({
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
    }),

    school: new FormControl<'waldorf'>('waldorf', {
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

  get passwordsAreNotSame() {
    return (
      this.form.controls.passwords.controls.confirmPassword.invalid &&
      this.form.value.passwords?.password !==
        this.form.value.passwords?.confirmPassword
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM');
    }
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
