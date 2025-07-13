import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-table',
  imports: [NgIf],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() userMonthOrders = new EventEmitter<number>();

  editUser(id: number) {
    this.edit.emit(id);
  }

  removeUser(id: number) {
    this.remove.emit(id);
  }

  goToUserMonthOrders(id: number) {
    this.userMonthOrders.emit(id);
  }
}
