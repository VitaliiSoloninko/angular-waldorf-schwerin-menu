import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateFood } from './create-food.model';
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

  create(val: CreateFood) {
    return this.httpClient.post(this.baseApiUrl, val);
  }

  remove(id: number) {
    return this.httpClient.delete<Food>(`http://localhost:3000/foods/${id}`);
  }
}
