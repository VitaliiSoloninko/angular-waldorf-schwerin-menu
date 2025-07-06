import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, first, map, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, RouterLink, SvgIconComponent, CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  isPasswordVisible = signal<boolean>(false);
  emailExists = false;
  @Input() isTeacher = false;

  emailAsyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
    return of(control.value).pipe(
      debounceTime(500),
      switchMap((email) =>
        email
          ? this.userService.checkEmailExists(email).pipe(
              map((res) => (res.exists ? { emailExists: true } : null)),
              first()
            )
          : of(null)
      )
    );
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isTeacher = params['teacher'] === 'true';
      this.createForm();
    });
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
        asyncValidators: [this.emailAsyncValidator],
        updateOn: 'change',
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
      ...(this.isTeacher
        ? {}
        : {
            firstNameChild: new FormControl('', {
              validators: [Validators.required],
            }),
            lastNameChild: new FormControl('', {
              validators: [Validators.required],
            }),
            class: new FormControl<'1' | '2' | '3' | '4'>('1', {
              validators: [Validators.required],
            }),
          }),
    });
  }

  get emailIsInvalid() {
    const email = this.form.controls.email;
    return email.touched && email.dirty && email.invalid && email.value;
  }

  createNewUser() {
    this.emailExists = false;

    if (this.form.invalid) {
      return;
    }
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
