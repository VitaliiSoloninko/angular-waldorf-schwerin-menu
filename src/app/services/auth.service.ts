import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USERS_FORGOT_PASSWORD_URL, USERS_RESET_PASSWORD_URL } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  forgotPassword(data: { email: string }): Observable<any> {
    const url = USERS_FORGOT_PASSWORD_URL;
    return this.http.post(url, data);
  }

  resetPassword(data: { token: string; newPassword: string }) {
    return this.http.post(USERS_RESET_PASSWORD_URL, data);
  }
}
