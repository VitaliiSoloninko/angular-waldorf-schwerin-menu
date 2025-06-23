import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-page',
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  fileText: any = FileText;
  trash2: any = Trash2;
  pencil: any = Pencil;
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;
  users: User[] = [];

  searchId: number | null = null;
  foundUser: User | null = null;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
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

  searchUserById() {
    if (!this.searchId) {
      this.foundUser = null;
      this.error = null;
      return;
    }
    this.userService.getUserById(this.searchId).subscribe({
      next: (user) => {
        this.foundUser = user;
        this.error = null;
      },
      error: () => {
        this.foundUser = null;
        this.error = 'Benutzer nicht gefunden.';
      },
    });
  }
}
