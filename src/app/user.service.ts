import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from './create-user.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  baseApiUrl = 'http://localhost:3000/users';

  getAll() {
    return this.httpClient.get<User[]>(this.baseApiUrl);
  }

  create(val: CreateUser) {
    return this.httpClient.post(this.baseApiUrl, val);
  }

  remove(id: number) {
    return this.httpClient.delete<User>(`http://localhost:3000/users/${id}`);
  }
}
