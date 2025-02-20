import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateFood } from '../models/create-food.model';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}
  baseApiUrl =
    'https://nestjs-postgresql-waldorf-menu-production.up.railway.app/api/foods';

  getAllFoods() {
    return this.httpClient.get<Food[]>(this.baseApiUrl);
  }

  getFoodById(id: number) {
    return this.httpClient.get<Food>(this.baseApiUrl + `/${id}`);
  }

  createFood(val: CreateFood) {
    return this.httpClient.post(this.baseApiUrl, val);
  }

  removeFood(id: number) {
    return this.httpClient.delete<Food>(this.baseApiUrl + `/${id}`);
  }
}
