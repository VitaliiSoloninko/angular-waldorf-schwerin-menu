import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { USERS_URL } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class UserFilterService {
  constructor(private http: HttpClient) {}

  searchUsers(filters: {
    id?: number;
    firstName?: string;
    lastName?: string;
    firstNameChild?: string;
    lastNameChild?: string;
    email?: string;
  }): Observable<User[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value as string);
      }
    });
    return this.http.get<User[]>(USERS_URL + '/filter/find', { params });
  }
}
