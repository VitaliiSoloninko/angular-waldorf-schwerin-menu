import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateUser } from '../models/create-user.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  // baseApiUrl = 'http://localhost:3000/api/users';

  baseApiUrl =
    'https://nestjs-postgresql-waldorf-menu-production.up.railway.app/api/users';

  getAll() {
    return this.httpClient.get<User[]>(this.baseApiUrl);
  }

  createUser(val: CreateUser) {
    return this.httpClient.post(this.baseApiUrl, val);
  }

  remove(id: number) {
    return this.httpClient.delete<User>(this.baseApiUrl + `/${id}`);
  }
}
