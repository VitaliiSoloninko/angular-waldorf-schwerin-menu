import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-search-form.component.html',
  styleUrl: './user-search-form.component.scss',
})
export class UserSearchFormComponent {
  @Input() searchForm!: FormGroup;
  @Output() search = new EventEmitter<void>();

  onSearch() {
    this.search.emit();
  }
}
