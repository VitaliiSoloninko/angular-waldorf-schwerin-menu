import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../models/IUserLogin';
import { User } from '../models/user.model';
import { USERS_LOGIN_URL } from '../urls';
import { TokenResponse } from '../models/auth.interface';

const USER_KEY = 'User';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  private userId: number | null = null;

  constructor(private http: HttpClient, private toastService: ToastrService) {
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
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastService.success(
            `Willkommen ${user.firstName}.`,
            'Erfolgreich angemeldet'
          );
        },
        error: (errorResponse) => {
          this.toastService.error(errorResponse.error, 'Fehler beim Anmelden');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
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
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
