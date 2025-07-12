import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  showConfirm = false;
  userToRemove: number | null = null;

  editUser(id: number) {
    this.edit.emit(id);
  }

  removeUser(id: number) {
    this.userToRemove = id;
    this.showConfirm = true;
  }

  onConfirmRemove() {
    if (this.userToRemove !== null) {
      this.remove.emit(this.userToRemove);
      this.userToRemove = null;
    }
    this.showConfirm = false;
  }

  onCancelRemove() {
    this.userToRemove = null;
    this.showConfirm = false;
  }
}
