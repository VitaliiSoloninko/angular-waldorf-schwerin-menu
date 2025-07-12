import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ConfirmDialogComponent } from '../../../ui/confirm-dialog/confirm-dialog.component';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-users-page',
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogComponent,
    UsersTableComponent,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;
  users: User[] = [];
  showConfirm = false;
  userToRemove: number | null = null;

  private userService = inject(UserService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }
  editUser(id: number) {
    this.router.navigate(['/profile', id]);
  }

  removeUser(id: number) {
    this.userToRemove = id;
    this.showConfirm = true;
  }

  goToUserMonthOrders(userId: number): void {
    this.router.navigate([`/admin/user/${userId}`]);
  }

  onConfirmRemove() {
    if (this.userToRemove !== null) {
      this.userService.remove(this.userToRemove).subscribe({
        next: () => {
          this.users = this.users.filter(
            (user) => user.id !== this.userToRemove
          );
          this.userToRemove = null;
          this.showConfirm = false;
        },
      });
    } else {
      this.showConfirm = false;
    }
  }

  onCancelRemove() {
    this.userToRemove = null;
    this.showConfirm = false;
  }
}
