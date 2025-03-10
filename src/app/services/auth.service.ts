import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  constructor() {}
}
