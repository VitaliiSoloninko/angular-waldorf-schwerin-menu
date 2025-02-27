import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputValidationComponent } from '../input-validation/input-validation.component';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, InputValidationComponent],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
}
