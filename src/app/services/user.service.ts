import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateUser } from '../models/create-user.model';
import { User } from '../models/user.model';
import { USERS_REGISTER_URL, USERS_URL } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<User[]>(USERS_URL);
  }

  createUser(val: CreateUser) {
    return this.httpClient.post(USERS_REGISTER_URL, val);
  }

  remove(id: number) {
    return this.httpClient.delete<User>(USERS_URL + `/${id}`);
  }
}
