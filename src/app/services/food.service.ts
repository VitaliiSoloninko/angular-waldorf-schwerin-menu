import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateFood } from '../models/create-food.model';
import { Food } from '../models/food.model';
import { USERS_FOODS } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  getAllFoods() {
    return this.httpClient.get<Food[]>(USERS_FOODS);
  }

  getFoodById(id: number) {
    return this.httpClient.get<Food>(USERS_FOODS + `/${id}`);
  }

  createFood(val: CreateFood) {
    return this.httpClient.post(USERS_FOODS, val);
  }

  removeFood(id: number) {
    return this.httpClient.delete<Food>(USERS_FOODS + `/${id}`);
  }
}
