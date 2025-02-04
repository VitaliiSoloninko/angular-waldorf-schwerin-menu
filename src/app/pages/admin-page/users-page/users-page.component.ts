import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileText, LucideAngularModule } from 'lucide-angular';
import { User } from '../../../user.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-users-page',
  imports: [NgFor, RouterLink, LucideAngularModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  fileText: any = FileText;

  constructor(private userService: UserService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }
}
