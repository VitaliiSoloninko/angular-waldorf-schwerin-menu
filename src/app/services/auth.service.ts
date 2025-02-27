import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../models/IUserLogin';
import { User } from '../models/user.model';
import { USERS_LOGIN_URL } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastService.success(
            `Willkommen bei Waldorf Menu ${user.name}.`,
            'Erfolgreich angemeldet'
          );
        },
        error: (errorResponce) => {
          this.toastService.error(errorResponce.error, 'Fehler beim Anmelden');
        },
      })
    );
  }
}
