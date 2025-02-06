import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateFood } from '../app/models/create-food.model';
import { Food } from '../app/models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  baseApiUrl = 'http://localhost:3000/api/foods';

  getAll() {
    return this.httpClient.get<Food[]>(this.baseApiUrl);
  }

  create(val: CreateFood) {
    return this.httpClient.post(this.baseApiUrl, val);
  }

  remove(id: number) {
    return this.httpClient.delete<Food>(this.baseApiUrl + `/${id}`);
  }
}
