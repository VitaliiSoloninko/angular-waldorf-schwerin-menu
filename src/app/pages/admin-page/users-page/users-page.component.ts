import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';

import { DateTime } from 'luxon';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserFiltersComponent } from './user-filters/user-filters.component';

@Component({
  selector: 'app-users-page',
  imports: [NgFor, RouterLink, LucideAngularModule, UserFiltersComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  fileText: any = FileText;
  trash2: any = Trash2;
  pencil: any = Pencil;

  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;

  constructor(private userService: UserService, private router: Router) {}

  users: User[] = [];

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
}
