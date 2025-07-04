import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CreateUser } from '../models/create-user.model';
import { User } from '../models/user.model';
import { USERS_CHECK_EMAIL_URL, USERS_REGISTER_URL, USERS_URL } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getAllUsers(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<User[]>(USERS_URL);
  }

  getUserById(id: number) {
    return this.httpClient.get<User>(USERS_URL + `/${id}`);
  }

  createUser(val: CreateUser) {
    return this.httpClient.post(USERS_REGISTER_URL, val);
  }

  updateUser(id: number, user: CreateUser): Observable<void> {
    return this.httpClient.patch<void>(USERS_URL + `/${id}`, user);
  }

  remove(id: number) {
    return this.httpClient.delete<User>(USERS_URL + `/${id}`);
  }

  checkEmailExists(email: string) {
    return this.httpClient.get<{ exists: boolean }>(
      USERS_CHECK_EMAIL_URL + `?email=${encodeURIComponent(email)}`
    );
  }
}
