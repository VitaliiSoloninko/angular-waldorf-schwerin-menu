import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { DateTime } from 'luxon';
import { debounceTime, filter, switchMap } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserFilterService } from '../../../services/user-filter.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-search-page',
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-search-page.component.html',
  styleUrl: './user-search-page.component.scss',
})
export class UserSearchPageComponent {
  fileText: any = FileText;
  trash2: any = Trash2;
  pencil: any = Pencil;
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;
  users: User[] = [];
  error: string | null = null;

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
      .subscribe((users) => {
        this.users = users;
        this.error = users.length === 0 ? 'Keine Kunden gefunden.' : null;
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
}
