import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { debounceTime, filter, switchMap } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserFilterService } from '../../../services/user-filter.service';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from '../../../ui/title/title.component';
import { ConfirmDialogComponent } from '../../../widgets/confirm-dialog/confirm-dialog.component';
import { UserSearchFormComponent } from '../../../widgets/user-search-form/user-search-form.component';
import { UsersTableComponent } from '../../../widgets/users-table/users-table.component';

@Component({
  selector: 'app-user-search-page',
  imports: [
    NgIf,
    TitleComponent,
    UsersTableComponent,
    ConfirmDialogComponent,
    UserSearchFormComponent,
  ],
  templateUrl: './user-search-page.component.html',
  styleUrl: './user-search-page.component.scss',
})
export class UserSearchPageComponent {
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;
  users: User[] = [];
  error: string | null = null;
  showConfirm = false;
  userToRemove: number | null = null;

  fb = inject(FormBuilder);
  userService = inject(UserService);
  userFilterService = inject(UserFilterService);
  router = inject(Router);

  searchForm = this.fb.group({
    lastName: [''],
    firstName: [''],
    lastNameChild: [''],
    firstNameChild: [''],
    email: [''],
  });

  constructor() {
    this.searchUsers();
  }

  searchUsers() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => this.searchForm.valid),
        filter(
          (formValue) =>
            (!!formValue.firstName && formValue.firstName.length >= 3) ||
            (!!formValue.lastName && formValue.lastName.length >= 3) ||
            (!!formValue.firstNameChild &&
              formValue.firstNameChild.length >= 3) ||
            (!!formValue.lastNameChild &&
              formValue.lastNameChild.length >= 3) ||
            (!!formValue.email && formValue.email.length >= 3)
        ),
        switchMap((formValue) => {
          const safeFormValue = {
            ...formValue,
            firstName: formValue.firstName ?? undefined,
            lastName: formValue.lastName ?? undefined,
            firstNameChild: formValue.firstNameChild ?? undefined,
            lastNameChild: formValue.lastNameChild ?? undefined,
            email: formValue.email ?? undefined,
          };
          return this.userFilterService.searchUsers(safeFormValue);
        })
      )
      .subscribe((data) => {
        this.users = data;
        this.error = data.length === 0 ? 'Keine Kunden gefunden.' : null;
      });
  }

  editUser(id: number) {
    this.router.navigate(['/profile', id]);
  }

  removeUser(id: number) {
    this.userService.remove(id).subscribe({
      next: (val) => {
        this.users = this.users.filter((_) => id != id);
      },
    });
  }

  goToUserMonthOrders(userId: number): void {
    this.router.navigate([`/admin/user/${userId}`]);
  }

  onRemoveUser(id: number) {
    this.userToRemove = id;
    this.showConfirm = true;
  }

  onConfirmRemove() {
    if (this.userToRemove !== null) {
      this.removeUser(this.userToRemove);
      this.showConfirm = false;
      this.userToRemove = null;
    }
  }

  onCancelRemove() {
    this.userToRemove = null;
    this.showConfirm = false;
  }
}
