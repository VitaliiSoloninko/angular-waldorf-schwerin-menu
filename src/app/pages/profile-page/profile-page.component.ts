import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateUser } from '../../models/create-user.model';
import { UserService } from '../../services/user.service';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-profile-page',
  imports: [FormsModule, RouterLink, SvgIconComponent, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  formData: CreateUser = {
    email: '',
    passwords: '',
    firstName: '',
    lastName: '',
    firstNameChild: '',
    lastNameChild: '',
    street: '',
    number: '',
    postalCode: '',
    city: '',
    school: '',
    class: '',
    letter: '',
  };

  userId: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  schools: string[] = ['Waldorf'];
  classes: number[] = [1, 2, 3, 4];

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.formData = { ...user, passwords: user.password };

        if (this.formData.class === '') {
          this.router.navigate(['/profile-teacher/' + this.userId]);
        }
      });
    }
  }

  save() {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.formData).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: (er: any) => {
          console.log(er);
        },
      });
    }
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
