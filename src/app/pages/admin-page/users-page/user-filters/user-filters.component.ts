import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, filter, of, switchMap } from 'rxjs';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './user-filters.component.html',
  styleUrl: './user-filters.component.scss',
})
export class UserFiltersComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);

  searchForm = this.fb.group({
    lastName: [''],
    firstName: [''],
    id: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        filter(() => this.searchForm.valid),
        switchMap((formValue) =>
          this.userService.filterUsers(formValue).pipe(
            catchError((error) => {
              console.error('Error filtering users:', error);
              return of([]); // Return an empty array on error
            })
          )
        )
      )
      .subscribe((users) => {
        console.log('Filtered users:', users);
      });
  }
}
