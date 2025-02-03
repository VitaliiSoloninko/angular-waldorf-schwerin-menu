import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  baseApiUrl = 'http://localhost:3000/foods';

  getAll() {
    return this.httpClient.get<Food[]>(this.baseApiUrl);
  }
}
