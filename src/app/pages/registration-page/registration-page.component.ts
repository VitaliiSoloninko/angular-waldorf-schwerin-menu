import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@Component({
  selector: 'app-registration-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    RegistrationFormComponent,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent implements OnInit {
  form!: FormGroup;
  constructor(private route: ActivatedRoute) {}
  isPasswordVisible = signal<boolean>(false);
  emailExists = false;
  @Input() isTeacher = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isTeacher = params['teacher'] === 'true';
    });
  }
}
