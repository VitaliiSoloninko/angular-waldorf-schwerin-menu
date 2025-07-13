import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ConfirmDialogComponent } from '../../../ui/confirm-dialog/confirm-dialog.component';
import { TitleComponent } from '../../../ui/title/title.component';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-users-page',
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogComponent,
    UsersTableComponent,
    TitleComponent,
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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((val) => {
      this.users = val;
    });
  }

  editUser(id: number) {
    this.router.navigate(['/profile', id]);
  }

  goToUserMonthOrders(userId: number): void {
    this.router.navigate([`/admin/user/${userId}`]);
  }

  removeUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
      },
    });
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
    } else {
      this.showConfirm = false;
      this.userToRemove = null;
    }
  }

  onCancelRemove() {
    this.userToRemove = null;
    this.showConfirm = false;
  }
}
