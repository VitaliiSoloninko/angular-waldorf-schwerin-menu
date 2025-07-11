import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { TokenResponse } from '../models/auth.interface';
import { IUserLogin } from '../models/IUserLogin';
import { User } from '../models/user.model';
import { USERS_LOGIN_URL } from '../urls';

const USER_KEY = 'User';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  forgotPassword(arg0: { email: any }) {
    throw new Error('Method not implemented.');
  }
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  private userId: number | null = null;
  private logoutSubject = new Subject<void>();

  logout$ = this.logoutSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastService: ToastrService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  token: string | null = null;

  login(userLogin: IUserLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(USERS_LOGIN_URL, userLogin).pipe(
      tap({
        next: (response) => {
          const token = response.token;
          this.saveToken(token);
          const decodedToken = this.decodeToken(token);
          const user = new User();
          user.firstName = decodedToken.firstName || 'User';
          user.id = decodedToken.id;
          user.roles = decodedToken.roles;
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastService.success(
            `Willkommen ${user.firstName}.`,
            'Erfolgreich angemeldet'
          );
        },
        error: (errorResponse) => {
          let message =
            errorResponse.error?.message ||
            errorResponse.error?.error ||
            errorResponse.error ||
            'Fehler beim Anmelden. Bitte überprüfen Sie Ihre Daten.';

          if (
            message === 'Incorrect email or password' ||
            message === 'Internal server error'
          ) {
            message = 'Falsche E-Mail oder Passwort';
          }

          this.toastService.error(message, 'Fehler beim Anmelden');
        },
      })
    );
  }

  logout() {
    this.userId = null;
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    this.logoutSubject.next();
    window.location.reload();
  }

  getUserId(): number | null {
    if (!this.userId) {
      const token = this.getToken();
      if (token) {
        const decodedToken = this.decodeToken(token);
        this.userId = decodedToken?.id || null;
      }
    }
    return this.userId;
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  }

  private setUserToLocalStorage(user: User) {
    console.log('Сохраняю в localStorage:', user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
