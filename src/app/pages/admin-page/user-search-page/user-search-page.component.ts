import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileText, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { DateTime } from 'luxon';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserFilterService } from '../../../services/user-filter.service';

@Component({
  selector: 'app-user-search-page',
  imports: [CommonModule, FormsModule, LucideAngularModule],
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

  searchId: number | null = null;
  foundUsers: User | null = null;
  error: string | null = null;

  constructor(
    private userFilterService: UserFilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFilterService
      .searchUsers({ firstName: 'Vitalii' })
      .subscribe((users) => {
        console.log('Found users:', users);
      });
  }

  // editUser(id: number) {
  //   this.router.navigate(['/profile', id]);
  // }

  // removeUser(id: number) {
  //   this.userService.remove(id).subscribe({
  //     next: (val) => {
  //       this.users = this.users.filter((_) => id != id);
  //     },
  //   });
  // }

  // goToUserMonthOrders(userId: number): void {
  //   this.router.navigate([`/admin/user/${userId}`]);
  // }
}
